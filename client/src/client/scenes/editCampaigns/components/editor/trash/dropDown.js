const DropDown = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={`drop-down row ${props.className}`}>
      <label htmlFor={props.className} className="icon shrink columns">{props.icon}</label>
      <select
        onChange={props.onChange}
        className="expand columns"
        id={props.className}
        value={blockType}>
        {props.blockTypes.map(type =>
          <option
            key={type.label}
            value={type.style}
            label={type.label}>
            {type.label}
          </option>,
        )}
      </select>
    </div>
  );
};

export default DropDown;
