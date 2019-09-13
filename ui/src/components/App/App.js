import React from 'react';
import './App.scss';
import Header  from '../Header';
import Footer  from '../Footer';
import Main    from '../Main';
import Sidebar from '../Sidebar';
import sidebarItems from '../../sidebar-items';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onBackClicked: null,
      onNextClicked: null,
      pageName:      "HomePage",
      sidebarItems
    };
  }
  get sidebarItems() {
    return this.state['sidebarItems'];
  }
  set sidebarItems(sidebarItems) {
    this.setState({sidebarItems});
  }
  get onBackClicked() {
    return this.state['onBackClicked'];
  }
  set onBackClicked(onBackClicked) {
    this.setState({onBackClicked});
  }
  get onNextClicked() {
    return this.state['onNextClicked'];
  }
  set onNextClicked(onNextClicked) {
    this.setState({onNextClicked});
  }
  get pageName() {
    return this.state['pageName'];
  }

  // settings {
  //   imageType,
  //   imageData,
  //   step,
  //   steps,
  //   connections
  // };
  get settings() {
    return this.state['settings'];
  }
  setPage(pageName, settings={}) {
    this.setState({pageName, settings});
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar items={this.sidebarItems}/>
            <Main pageName={this.pageName} settings={this.settings}/>
          </div>
        </div>
        <Footer onBackClicked={this.onBackClicked} onNextClicked={this.onNextClicked}/>
      </div>
    );
  }
}

export default App;
