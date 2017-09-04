import StyleButton from './styleButtons';

const ButtonControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={`button-controls ${props.className}`}>
      {props.types.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onClick={props.onClick}
          style={type.style}
          className={props.className} />,
      )}
    </div>
  );
};

export default ButtonControls;