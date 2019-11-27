import React from 'react';
import './Footer.scss';

const noop = () => {};

function Footer(props) {
  // inputs and their defaults
  const onBackClicked = props.onBackClicked || noop;
  const onNextClicked = props.onNextClicked || noop;
  const disableInputs = props.disableInputs || false;
  // HTML
  return(
    <footer className="footer mt-auto py-2">
      <button id="footer-back" className="btn btn-sm btn-light btn-secondary" disabled={disableInputs} onClick={onBackClicked}>Back</button>
      <button id="footer-next" className="btn btn-sm btn-primary float-right" disabled={disableInputs} onClick={onNextClicked}>Next</button>
    </footer>
  )
}

export default Footer;
