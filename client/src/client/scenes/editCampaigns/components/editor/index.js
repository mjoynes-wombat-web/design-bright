/* eslint-env browser */
import { Editor, Block, Raw } from 'slate';
import React from 'react';
import isUrl from 'is-url';
import ifIsImage from 'if-is-image';
import axios from 'axios';

import Images from './images';
import Toolbar from './toolbar';
import CreateLink from './createLink';
import CreateImage from './createImage';

import './scss/style.scss';

const defaultBlock = {
  type: 'paragraph',
  isVoid: false,
  data: {},
};

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
  nodes: {
    image: (props) => {
      const { node, state } = props;
      const active = state.isFocused && state.selection.hasEdgeIn(node);
      const src = node.data.get('src');
      const alt = node.data.get('alt');
      const imageType = node.data.get('imageType');
      const className = active ? 'active' : null;
      return (
        <Images
          src={src}
          className={className}
          imageType={imageType}
          attributes={props.attributes}
          alt={alt} />
      );
    },
    paragraph: props =>
      <p {...props.attributes}>
        {props.children}
      </p>,
    header: props =>
      <h2 {...props.attributes}>
        <span className="underlined">
          {props.children}
        </span>
      </h2>,
    link: (props) => {
      const url = props.node.data.get('url');
      return <a
        href={url} {...props.attributes}>
        {props.children}
      </a>;
    },
  },
  rules: [
    // Rule to insert a paragraph block if the document is empty.
    {
      match: node => node.kind === 'document',
      validate: document => (document.nodes.size ? null : true),
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock);
        transform.insertNodeByKey(document.key, 0, block);
      },
    },
    // Rule to insert a paragraph below a void node (the image) if that node is
    // the last one in the document.
    {
      match: node => node.kind === 'document',
      validate: (document) => {
        const lastNode = document.nodes.last();
        return lastNode && lastNode.isVoid ? true : null;
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock);
        transform.insertNodeByKey(document.key, document.nodes.size, block);
      },
    },
  ],
};

class CampaignEditor extends React.Component {
  constructor(props) {
    super(props);

    const initialState = props.content.reduce(
      (formattedContent, node) => {
        const content = formattedContent;

        if ('textType' in node) {
          const newNode = {
            kind: 'block',
            nodes: [
              {
                kind: 'text',
                text: node.text,
              },
            ],
          };

          switch (node.textType) {
            case 'p':
              newNode.type = 'paragraph';
              content.nodes.push(newNode);
              return content;
            case 'h2':
              newNode.type = 'header';
              content.nodes.push(newNode);
              return content;
            default:
              return content;
          }
        } else if ('imageType' in node) {
          const newNode = {
            kind: 'block',
            type: 'image',
            isVoid: true,
            data: {
              src: node.src,
              alt: node.alt,
              imageType: node.imageType,
            },
          };
          content.nodes.push(newNode);
          return content;
        }
        return content;
      },
      { nodes: [] },
    );

    this.state = {
      editorState: Raw.deserialize(initialState, { terse: true }),
      showCreateLink: false,
      newUrl: 'http://',
      newUrlText: '',
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
      heldEditorState: {},
    };

    this.onChangeEditor = this.onChangeEditor.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onCreateImage = this.onCreateImage.bind(this);
    this.cancelCreateImage = this.cancelCreateImage.bind(this);
    this.onChangeFormat = this.onChangeFormat.bind(this);
    this.onNewLink = this.onNewLink.bind(this);
    this.isBlock = this.isBlock.bind(this);
    this.isLink = this.isLink.bind(this);
    this.onCreateLink = this.onCreateLink.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.cancelCreateLink = this.cancelCreateLink.bind(this);
  }

  onChangeEditor(editorState) {
    this.setState({ editorState });
  }

  onChangeInput(e) {
    const target = e.target;
    const value = () => {
      if (target.type === 'checkbox') {
        return target.checked;
      } else if (target.type === 'file') {
        return target.files[0];
      }
      return target.value;
    };

    const name = target.name;

    this.setState({ [name]: value() });
  }

  onAddImage(e) {
    e.preventDefault();
    // const src = window.prompt('Enter the URL of the image:');
    // const alt = window.prompt('Please enter a description:');
    // const imageType = window.prompt('Please enter the image type:');

    const { editorState } = this.state;

    this.cancelCreateLink();
    this.setState({
      heldEditorState: editorState,
      showAddImage: true,
    });
  }

  onCreateImage(e) {
    e.preventDefault();

    this.setState({ heldState: this.state.editorState });

    const formData = new FormData();
    formData.append('file', this.state.newSrc);
    formData.append('campaignId', this.props.campaignInfo.campaignId);
    formData.append('campaignName', this.props.campaignInfo.name);
    formData.append('nonprofitId', this.props.nonprofitInfo.nonprofitId);
    formData.append('imageType', this.state.newImageType);
    formData.append('imageAlt', this.state.newAlt);

    axios.post(
      `https://${window.location.hostname}:3000/api/campaigns/${this.props.campaignInfo.campaignId}/upload/photo`,
      formData,
      { headers:
        { 'Content-Type': 'multipart/form-data' },
      },
    )
      .then(({ data }) => {
        const newImage = data.data;
        console.log(newImage);
        const { newAlt, newImageType, heldState } = this.state;
        this.insertImage(newImage.secure_url, newAlt, newImageType, heldState);
      })
      .catch(error => console.log(error));
  }

  cancelCreateImage(e) {
    if (e) {
      e.preventDefault();
    }

    return this.setState({
      heldEditorState: {},
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
    });
  }

  insertImage(src, alt, imageType, heldState) {
    const transform = heldState.transform();

    const newEditorState = transform
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: {
          src,
          alt,
          imageType,
        },
      })
      .apply();

    this.setState({
      heldEditorState: {},
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
      editorState: newEditorState,
    });
  }

  onChangeFormat(e) {
    const type = e.target.value;
    const editorState = this.state.editorState;
    const transform = editorState.transform();

    if (this.state.editorState.focusBlock.type !== 'image') {
      const isBlock = this.isBlock(type);
      transform.setBlock(isBlock ? 'paragraph' : type);
      const newEditorState = transform.apply();
      this.setState({ editorState: newEditorState });
    }
  }

  isBlock(type) {
    const { editorState } = this.state;
    let nodeType;
    const test = editorState.blocks.some((node) => {
      if (node.type === 'image') {
        nodeType = node.type;
      }
      return node.type === type;
    });
    if (nodeType) {
      return nodeType;
    }
    return test;
  }

  isLink() {
    const { editorState } = this.state;
    return editorState.inlines.some(inline => inline.type === 'link');
  }

  onNewLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const isLink = this.isLink();
    let newEditorState = editorState;

    this.cancelCreateImage();

    if (this.state.showCreateLink) {
      return this.cancelCreateLink(e);
    }

    if (isLink) {
      newEditorState = editorState
        .transform()
        .unwrapInline('link')
        .apply();

      return this.setState({
        editorState: newEditorState,
      });
    }
    return this.setState({
      editorState: newEditorState,
      heldEditorState: newEditorState,
      showCreateLink: true,
    });
  }

  onCreateLink(e) {
    e.preventDefault();
    const editorState = this.state.heldEditorState;

    let newEditorState;
    if (editorState.isExpanded) {
      const url = this.state.newUrl;

      newEditorState = editorState
        .transform()
        .wrapInline({
          type: 'link',
          data: { url },
        })
        .collapseToEnd()
        .apply();
    } else {
      const url = this.state.newUrl;
      const text = this.state.newUrlText;

      newEditorState = editorState
        .transform()
        .insertText(text)
        .extend(0 - text.length)
        .wrapInline({
          type: 'link',
          data: { url },
        })
        .collapseToEnd()
        .apply();
    }

    this.setState({
      editorState: newEditorState,
      showCreateLink: false,
      newUrl: 'http://',
      newUrlText: '',
      heldEditorState: {},
    });
  }

  cancelCreateLink(e) {
    if (e) {
      e.preventDefault();
    }

    return this.setState({
      heldEditorState: {},
      showCreateLink: false,
      newUrl: 'http://',
      newUrlText: '',
    });
  }

  render() {
    return (
      <div id="campaignEditor">
        <Toolbar
          onAddImage={this.onAddImage}
          onNewLink={this.onNewLink}
          onChangeFormat={this.onChangeFormat}
          selectValue={this.state.editorState.focusBlock}
          inlineType={this.state.editorState.focusInline} />
        {this.state.showCreateLink
          ? <CreateLink
            editorState={this.state.heldEditorState}
            onCreateLink={this.onCreateLink}
            cancelCreateLink={this.cancelCreateLink}
            newUrl={this.state.newUrl}
            newUrlText={this.state.newUrlText}
            onChange={this.onChangeInput}
            validate={url => isUrl(url)} />
          : null}
        {this.state.showAddImage
          ? <CreateImage
            editorState={this.state.heldEditorState}
            onCreateImage={this.onCreateImage}
            cancelCreateImage={this.cancelCreateImage}
            onChange={this.onChangeInput}
            newSrc={this.state.newSrc}
            newAlt={this.state.newAlt}
            newImageType={this.state.newImageType}
            validate={src => ifIsImage(src)} />
          : null}
        <div className="grey-line"></div>
        <div className="editor">
          <Editor
            schema={schema}
            state={this.state.editorState}
            onChange={this.onChangeEditor} />
        </div>
      </div >
    );
  }
}

export default CampaignEditor;
