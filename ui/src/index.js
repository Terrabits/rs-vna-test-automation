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
window.controller = new Controller(window.model, window.view);

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
