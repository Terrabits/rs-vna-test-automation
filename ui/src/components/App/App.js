import React from 'react';
import './App.scss';
import Footer  from '../Footer';
import Main    from '../Main';
import Sidebar from '../Sidebar';

function App(props) {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Sidebar items={props.sidebarItems}/>
          <Main />
        </div>
      </div>
      <Footer onBackClicked={props.onBackClicked} onNextClicked={props.onNextClicked}/>
    </div>
  );
}

export default App;
