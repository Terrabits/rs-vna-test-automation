import React from 'react';

function DownloadButton(props) {
  const disableInputs = props.disableInputs || false;
  const text          = props.children      || 'Download';
  return (
    <button id={props.id} type="button" className="btn btn-primary" onClick={props.onClick} disabled={disableInputs}>
      {text}
    </button>
  );
}

export default DownloadButton;
