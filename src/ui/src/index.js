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

// TODO: Remove 💩
const isDevelopment = process.env.NODE_ENV === 'development';
const url  = isDevelopment ?
  'ws://localhost:8080/socket' // hot
  : undefined;                 // cold
window.model.socket.open(url).then(() => {
  window.controller = new Controller(window.model, window.view);
});
