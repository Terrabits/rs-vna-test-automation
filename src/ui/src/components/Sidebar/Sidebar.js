import React from 'react';
import './Sidebar.scss';
import Item from './Item';

function Sidebar(props) {
  const disableInputs = props.disableInputs || false;
  let items = [];
  if (props.items) {
    items = props.items.map((item, index) => {
      return (
        <Item key={index} icon={item.icon} text={item.text} active={item.active} callback={item.callback} subitems={item.subitems} disableInputs={disableInputs}/>
      );
    });
  }
  return (
    <nav id="sidebar" className="col-md-2 d-none d-md-block">
      <div className="sticky">
        <ul id="sidebar-items" className="nav d-flex flex-column">
          {items}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
