import React from 'react';
import './App.scss';
import Header  from '../Header';
import Footer  from '../Footer';
import Main    from '../Main';
import Sidebar from '../Sidebar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar items={this.state.sidebarItems}/>
            <Main pageName="SetupPage" settings=""/>
          </div>
        </div>
        <Footer onBackClicked={this.state.onBackClicked} onNextClicked={this.state.onNextClicked}/>
      </div>
    );
  }
}

export default App;
