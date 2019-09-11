import React from 'react';

function Title(props) {
  let text = "";
  if (props.hasOwnProperty('step') && props.hasOwnProperty('steps')) {
    text = `Step ${props.step}/${props.steps}`
  }
  return (
    <div className="row">
      <div className="col-sm-10">
        <h5>{props.display}</h5>
      </div>
      <div id="step" className="col-sm-2 float-right">
        {text}
      </div>
    </div>
  )
}

export default Title;
