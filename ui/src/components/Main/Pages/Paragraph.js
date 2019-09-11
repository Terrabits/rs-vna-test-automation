import React from 'react';

function Paragraph(props) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <p>
          {props.children}
        </p>
      </div>
    </div>
  );
}

export default Paragraph;
