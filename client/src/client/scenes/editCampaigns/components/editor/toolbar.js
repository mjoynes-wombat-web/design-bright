/* eslint-env browser */
import React from 'react';

const Toolbar = (props) => {
  let selectValue;
  if ('type' in props.selectValue) {
    selectValue = props.selectValue.type;
  }

  let inlineType;
  if (props.inlineType) {
    if ('type' in props.inlineType) {
      inlineType = props.inlineType.type;
    }
  }
  return (
    <div className="toolbar">
      <div className="row">
        <select className="expand columns" onChange={props.onChangeFormat} value={selectValue}>
          <option value="paragraph">Normal</option>
          <option value="header">Header</option>
        </select>
        <button className={`link shrink columns${inlineType === 'link' ? ' active' : ''}`} onMouseDown={props.onNewLink} type="button">
          <span className="icon"></span>
        </button>
        <button className="image shrink columns" onMouseDown={props.onAddImage} type="button">
          <span className="icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
