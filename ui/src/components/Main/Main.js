import React from 'react';
import './Main.scss';
import Pages from './Pages';

function Main(props) {
  const pageName = props.pageName || 'SetupPage'
  const Page     = Pages[pageName]
  return(
    <main role="main" className="col-md-10 ml-sm-auto p-4">
      <div id="main">
      <Page settings={props.settings}/>
      </div>
    </main>
  );
}

export default Main;
