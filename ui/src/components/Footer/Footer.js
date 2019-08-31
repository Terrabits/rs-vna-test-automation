import React from 'react';
import './Footer.scss';

function Footer(props) {
  return(
    <footer className="footer mt-auto py-2">
      <button id="footer-back" className="btn btn-sm btn-light btn-secondary" onClick={props.onBackClicked}>Back</button>
      <button id="footer-next" className="btn btn-sm btn-primary float-right" onClick={props.onNextClicked}>Next</button>
    </footer>
  )
}

export default Footer;
