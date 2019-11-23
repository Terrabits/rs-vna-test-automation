import React from 'react';

// props.context: primary, secondary, danger, ...
// props.small: bool
//
function Spinner(props) {
  const classes   = ['spinner-border', 'spinner-border-sm'];
  if (props.context) {
    classes.push(`text-{props.context}`);
  }
  const className = classes.join(' ');
  return (
    <span>
      <span className={className} role="status" aria-hidden="true"></span>
      <span className="sr-only">Loading...</span>
    </span>
  );
}

export default Spinner;
