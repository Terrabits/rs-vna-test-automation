import React from 'react';

function Paragraph(props) {
  const id        = props.id?        props.id        : '';
  const className = props.className? props.className : '';
  return (
    <div className="row">
      <div className="col-sm-12">
      <p id={id} className={className}>
        {props.children}
      </p>
      </div>
    </div>
  );
}

export default Paragraph;
