import React from 'react';
import Octicon, {getIconByName} from '@primer/octicons-react';
import './Item.scss';
import SubItem from './SubItem';

function Item(props) {
  const classes = ['nav-link'];
  if (props.active) {
    classes.push('active');
  }

  const disableInputs = props.disableInputs || false;
  if (disableInputs) {
    classes.push('disabled');
  }
  const className = classes.join(' ');
  const icon      = getIconByName(props.icon);
  const callback  = props.callback;
  const text      = props.text;

  let subitems = [];
  if (props.subitems) {
    subitems = props.subitems.map((item, index) => {
      return (
        <SubItem key={index} text={item.text} active={item.active} callback={item.callback} disableInputs={disableInputs}/>
      );
    });
  }

  // ignore href='#' warning
  /* eslint-disable */
  return (
    <li className="sidebar-item">
      <a className={className} onClick={callback} href="#">
        <Octicon icon={icon} /> {text}
      </a>
      <ul className="sidebar-subitems">
        {subitems}
      </ul>
    </li>
  );
  /* eslint-enable */
}

export default Item;
