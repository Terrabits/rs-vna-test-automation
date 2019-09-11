import React        from 'react';
import ReactDOM     from 'react-dom';
import 'bootstrap';
import './scss/styles.scss';
import Model        from './model';
import App          from './components/App';
import Controller   from './controller';
import sidebarItems from './sidebar-items';

// App:
// - sidebar.onHomeClick=        (index)=>{}
// - sidebar.onCalibrateClicked= (index)=>{}
// - sidebar.onMeasureClicked=   (index)=>{}
// - onBack=                     (index)=>{}
// - onNext=                     (index)=>{}

const controller = new Controller(null, null);
const backClicked = (event=null) => {
  if (event) {
    event.preventDefault();
  }
  controller.back();
};
const nextClicked = (event=null) => {
  if (event) {
    event.preventDefault();
  }
  controller.next();
};
window.view       = ReactDOM.render(<App sidebarItems={sidebarItems} onBackClicked={backClicked} onNextClicked={nextClicked}/>, document.getElementById('root'));
window.model      = new Model();
window.controller = controller;

// model console.logs
window.model.socket.open().then(() => {
  console.log('model is open!');
  window.model.socket.closed().then((event) => {
    console.log('model closed!');
  }).catch((param) => {
    console.log(`window.model.socket.closed()..catch(param=${param})`);
  });
}, () => {
  console.log('model failed to open!');
});
