/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';

import './scss/style.scss';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    console.log('Remeber to set fetched to false.');
    this.state = {
      fetched: true,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    if (this.state.fetched) {
      return (
        <main id="campaign" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
          <section className="row">
            <div className="small-12 columns">
              <h1>
                <span className="underlined">
                  Homes for Veterans' Website
                </span>
              </h1>
            </div>
            <div className="small-12 columns">
              <div className="progress">
                <div className="line small-12 columns"></div>
                <div className="funded columns" style={{ width: 'calc(48% - 0.25rem)' }}></div>
              </div>
            </div>
            <div className="small-12 columns">
              <div className="row align-justify campaign-details">
                <div className="shrink columns">
                  <p className="details">48% Funded</p>
                </div>
                <div className="shrink columns">
                  <p className="details">25 Days Left</p>
                </div>
                <div className="shrink columns">
                  <p className="details">$8,500 Needed</p>
                </div>
              </div>
            </div>
            <div className="small-12 columns">
              <section className="campaign-content row">
                <div className="small-12 medium-6 columns">
                  <p>Fyodor Pavlovitch got excited and pathetic, though it was perfectly clear to every one by now that he was playing a part again. Yet Miüsov was stung by his words.</p>
                  <div className="main-image-wrapper">
                    <div className="overlay"></div>
                    <div className="main-image">
                      <img src="/assets/img/veteran.jpg" alt="Senior veteran at a march." className="main" />
                    </div>
                    <button
                      className="secondary"
                      type="submit">
                      Make a Donation
                    </button>
                  </div>
                  <button
                    className="primary mobile"
                    type="submit">
                    Make a Donation
                    </button>
                  <p>“Dear Father, God reward you, our benefactor, who prays for all of us and for our sins!”</p>
                  <p>But the elder had already noticed in the crowd two glowing eyes fixed upon him. An exhausted, consumptive‐looking, though young peasant woman was gazing at him in silence. Her eyes besought him, but she seemed afraid to approach.</p>
                  <p>“What is it, my child?”</p>
                </div>
                <div className="small-12 medium-6 columns">
                  <p>“Absolve my soul, Father,” she articulated softly, and slowly sank on her knees and bowed down at his feet. “I have sinned, Father. I am afraid of my sin.”</p>
                  <p>The elder sat down on the lower step. The woman crept closer to him, still on her knees.</p>
                  <h2><span className="underlined">Sub-Heading</span></h2>
                  <img src="/assets/img/flag-home.jpg" alt="A flag on a home." />
                  <p>“I am a widow these three years,” she began in a half‐whisper, with a sort of shudder. “I had a hard life with my husband. He was an old man. He used to beat me  cruelly. He lay ill; I thought looking at him, if he were to get well, if he were to get up again, what then? And then the thought came to me—”</p>
                  <p>“Stay!” said the elder, and he put his ear close to her lips.</p>
                  <p>The woman went on in a low whisper, so that it was almost impossible to catch anything. She had soon done.</p>
                </div>
                <div className="small-12 columns">
                  <div className="row align-center">
                    <button
                      className="primary small-11 medium-10 large-10 columns"
                      type="submit">
                      Make a Donation
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main >
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default Campaign;
