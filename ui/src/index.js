import React        from 'react';
import ReactDOM     from 'react-dom';
import 'bootstrap';
import './scss/styles.scss';
import App          from './components/App';
import sidebarItems from './sidebar-items';

// App:
// - sidebar.onHomeClick=        (index)=>{}
// - sidebar.onCalibrateClicked= (index)=>{}
// - sidebar.onMeasureClicked=   (index)=>{}
// - onBack=                     (index)=>{}
// - onNext=                     (index)=>{}

const backClicked = (event=null) => {
  if (event) {
    event.preventDefault();
  }
  console.log('back clicked');
};
const nextClicked = (event=null) => {
  if (event) {
    event.preventDefault();
  }
  console.log('next clicked');
};
ReactDOM.render(<App sidebarItems={sidebarItems} onBackClicked={backClicked} onNextClicked={nextClicked}/>, document.getElementById('root'));
