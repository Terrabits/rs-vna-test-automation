import React from 'react';
import './Main.scss';
import Alert from './Alert';
import Pages from './Pages';

function Main(props) {
  console.assert(props.pageName,                       'Missing props.pageName');
  console.assert(Pages.hasOwnProperty(props.pageName), `Page name '${props.pageName}' not found in Pages`)
  const Page = Pages[props.pageName]
  return(
    <main role="main" className="col-md-10 ml-sm-auto p-4">
      <div id="main">
        <Alert ref={props.alertRef}/>
        <Page settings={props.settings}/>
      </div>
    </main>
  );
}

export default Main;
