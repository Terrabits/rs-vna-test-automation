import React from 'react';
import './Main.scss';
import Alert from './Alert';
import Pages from './Pages';

function Main(props) {
  if (!props.pageName) {
    throw new Error('Missing props.pageName');
  }
  if (!Pages.hasOwnProperty(props.pageName)) {
    throw new Error(`Page name '${props.pageName}' not found in Pages`);
  }
  const Page          = Pages[props.pageName]
  const disableInputs = props.disableInputs || false;
  return(
    <main role="main" className="col-md-10 ml-sm-auto p-4">
      <div id="main">
        <Alert ref={props.alertRef}/>
        <Page settings={props.settings} disableInputs={disableInputs}/>
      </div>
    </main>
  );
}

export default Main;
