import React from 'react';
import './Title.scss';

// props:
// - display (main title)
// - step, steps
// - calGroup, calDate
// - serialNo
function Title(props) {
  // first row text
  const titleText = props.display || "Title";
  const stepsText =
    props.step && props.steps ?
      `Step ${props.step}/${props.steps}`
      : '';

  // assemble first row
  const row1Items = [];
  row1Items.push((
    <div id="title-display" key="title-display" className="col-sm-8">
      <h5>{titleText}</h5>
    </div>
  ));
  if (stepsText) {
    row1Items.push((
      <div id="title-step" key="title-step" className="col-sm-4 float-right">
        {stepsText}
      </div>
    ));
  }
  const row1 = [];
  row1.push((
    <div id="title-row1" key="title-row1" className="row">
      {row1Items}
    </div>
  ));

  // second row
  let serialNoText = '';
  if (props.serialNo) {
    serialNoText = `Serial No: ${props.serialNo}`;
  }
  let calGroupText   = '';
  if (props.calGroup) {
    calGroupText = props.calDate ?
      `${props.calGroup} (${props.calDate})`
      : `${props.calGroup}`
  }
  const row2Items = [];
  if (serialNoText) {
    row2Items.push((
      <div id="title-serial-no" key="title-serial-no" className="col-sm-8 text-truncate">
        {serialNoText}
      </div>
    ));
  }
  if (calGroupText) {
    const classes = ['col-sm-4', 'float-right', 'text-truncate'];
    if (!serialNoText) {
      classes.push('offset-sm-8');
    }
    const className = classes.join(' ');
      row2Items.push((
        <div id="title-cal-group" key="title-cal-group" className={className}>
          {calGroupText}
        </div>
      ));
  }
  let row2 = [];
  if (row2Items.length) {
    row2.push((
      <div id="title-row2" key="title-row2" className="row">
        {row2Items}
      </div>
    ));
  }
  const rows = row1.concat(row2);

  return (
    <div id="title">
      {rows}
    </div>
  );
}

export default Title;
