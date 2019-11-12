import React        from 'react';
import ReactDOM     from 'react-dom';
import 'bootstrap';
import './scss/styles.scss';
import Model        from './model';
import App          from './components/App';
import Controller   from './controller';

// MVC
window.view       = ReactDOM.render(<App/>, document.getElementById('root'));
window.model      = new Model();

// model console.logs
// TODO: Remove 💩
const isDevelopment = process.env.NODE_ENV === 'development';
const open = isDevelopment ?
  window.model.socket.open('ws://localhost:8080/socket') // hot
  : window.model.socket.open();                          // cold
open.then(() => {
  window.controller = new Controller(window.model, window.view);
  window.model.socket.closed().then((event) => {
    console.log('model closed!');
  }).catch((param) => {
    console.log(`window.model.socket.closed()..catch(param=${param})`);
  });
}, () => {
  console.log('model failed to open!');
});
