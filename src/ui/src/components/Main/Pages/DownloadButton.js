import React from 'react';

function DownloadButton(props) {
  const text = props.children || 'Download';
  return (
    <button id={props.id} type="button" className="btn btn-primary" onClick={props.onClick}>
      {text}
    </button>
  );
}

export default DownloadButton;
