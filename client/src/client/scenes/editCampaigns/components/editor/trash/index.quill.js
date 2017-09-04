import React from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';

import './scss/style.scss';


class CampaignEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockTypes: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading', style: 'header-two' },
      ],
      mediaTypes: [
        { label: '', style: 'link' },
        { label: '', style: 'photo' },
      ],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    const options = {
      placeholder: 'Compose an epic...',
      modules: {
        toolbar: [
          [{ header: [2, false] }],
          ['link', 'image', 'clean'],
        ],
      },
      theme: 'snow',
    };
    const editor = new Quill('#editorWindow', options);
  }

  render() {
    return (
      <div id="campaignEditor">
        <div id="editorWindow">
        </div>
      </div>
    );
  }
}

export default CampaignEditor;
