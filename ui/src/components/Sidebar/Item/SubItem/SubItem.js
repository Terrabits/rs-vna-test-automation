import React from 'react';
import './SubItem.scss';

function SubItem(props) {
  const classes = ['nav-link'];
  if (props.active) {
    classes.push('active');
  }
  const className = classes.join(' ');
  const callback  = props.callback;
  const text      = props.text;
  // ignore href='#' warning
  /* eslint-disable */
  return (
    <li className="sidebar-subitem">
      <a className={className} onClick={callback} href="#">
        {text}
      </a>
    </li>
  );
  /* eslint-enable */
}

export default SubItem;
