import React from 'react';

export class MainHeading extends React.Component {
  render() {
    return (
      <h1>
        <span className='underlined'>
          {this.props.children}
        </span>
      </h1>
    );
  }
}

export class SubHeading extends React.Component {
  render() {
    return (
      <h2>
        <span className='underlined'>
          {this.props.children}
        </span>
      </h2>
    );
  }
}

export class Paragraph extends React.Component {
  render() {
    return (
      <div className="body">
        {this.props.children}
      </div>
    );
  }
}
