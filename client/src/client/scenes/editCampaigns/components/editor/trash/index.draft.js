import React from 'react';
import Immutable from 'immutable';
import Draft, { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw, AtomicBlockUtils } from 'draft-js';

import { SubHeading, Paragraph } from './contentTypes';
import DropDown from './dropDown';
import ButtonControls from './buttonControls';
import Images from './images';

import './scss/style.scss';


const blockRenderMap = Immutable.Map({
  'header-two': {
    element: '',
    wrapper: <SubHeading />,
  },
  unstyled: {
    element: 'div',
    aliasedElements: ['p'],
    wrapper: <Paragraph />,
  },
});

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Images,
      editable: false,
    };
  }

  return null;
}

class CampaignEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      url: '',
      urlType: '',
      blockTypes: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading', style: 'header-two' },
      ],
      listTypes: [
        { label: '', style: 'unordered-list-item' },
        { label: '', style: 'ordered-list-item' },
      ],
      mediaTypes: [
        { label: '', style: 'link' },
        { label: '', style: 'photo' },
        { label: '', style: 'video' },
      ],
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.insertMedia = this.insertMedia.bind(this);
    this.onBlockStyleChange = this.onBlockStyleChange.bind(this);
  }

  componentDidMount() {
    const rawContent = this.props.content.reduce((cleanedContent, content) => {
      if ('textType' in content) {
        const individualContent = {
          text: content.text,
        };
        switch (content.textType) {
          case 'p':
            individualContent.type = 'unstyled';
            cleanedContent.blocks.push(individualContent);
            return cleanedContent;
          case 'h2':
            individualContent.type = 'header-two';
            cleanedContent.blocks.push(individualContent);
            return cleanedContent;
          default:
            return cleanedContent;
        }
      } else if ('imageType' in content) {
        const individualContent = {
          src: content.src,
          text: content.alt,
        };
        switch (content.imageType) {
          case 'main':
            individualContent.type = 'main';
            cleanedContent.blocks.push(individualContent);
            return cleanedContent;
          case 'left':
            individualContent.type = 'left';
            cleanedContent.blocks.push(individualContent);
            return cleanedContent;
          default:
            return cleanedContent;
        }
      }
      return cleanedContent;
    },
    {
      blocks: [],
    });

    const images = [
      {
        type: 'main',
        muttable: 'IMMUTABLE',
        data: {
          src: '/assets/img/veteran.jpg',
          alt: 'This is a test.',
        },
      },
      {
        type: 'left',
        muttable: 'IMMUTABLE',
        data: {
          src: '/assets/img/flag-home.jpg',
          alt: 'This is a test.',
        },
      },
    ];

    images.forEach((image) => {
      console.log(image);
      const editorState = this.state.editorState;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        image.type,
        image.muttable,
        image.data,
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      console.log(contentStateWithEntity);
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
      );

      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' ',
        ),
        showURLInput: false,
        urlValue: '',
      }, console.log('This ran'));
    });
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  insertMedia(mediaType) {
    this.onChange(
      console.log(mediaType),
    );
  }

  onBlockStyleChange(e) {
    const target = e.target;
    const value = target.value;

    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        value,
      ),
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div id="campaignEditor" className="RichEditor-root">
        <div className="RichEditor-controls row">
          <div className="columns expand">
            <DropDown
              editorState={editorState}
              className='block-types'
              blockTypes={this.state.blockTypes}
              onChange={this.onBlockStyleChange}
              icon='' />
          </div>
          <div className="columns shrink">
            <ButtonControls
              editorState={editorState}
              types={this.state.listTypes}
              onClick={type => this.toggleBlockType(type)}
              className="list-types" />
          </div>
          <div className="columns shrink">
            <ButtonControls
              editorState={editorState}
              types={this.state.mediaTypes}
              onClick={type => this.insertMedia(type)}
              className="list-types" />
          </div>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
          />
          {/*             blockRenderMap={extendedBlockRenderMap}
 */}
        </div>
      </div>
    );
  }
}

export default CampaignEditor;
