import React from 'react';
import './App.scss';
import Header  from '../Header';
import Footer  from '../Footer';
import Main    from '../Main';
import Sidebar from '../Sidebar';

const defaultSidebar = [{
  text: "Home",
  icon: "home",
  active: true,
  callback: null
}, {
  text: "Calibrate",
  icon: "tools",
  active: false,
  callback: null
}, {
  text: "Measure",
  icon: "pulse",
  active: false,
  callback: null
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onBackClicked: null,
      onNextClicked: null,
      pageName:      "HomePage",
      sidebarItems: defaultSidebar
    };
  }

  // ip address input
  get ipAddress() {
    const input = document.getElementById('ip-address');
    console.assert(input, 'No input#ip-address found!');
    return input.value;
  }
  set ipAddress(ipAddress) {
    const input = document.getElementById('ip-address');
    console.assert(input, 'No input#ip-address found!');
    input.value = ipAddress;
  }

  // project filename input
  get projectFilename() {
    const input = document.getElementById('project-filename');
    console.assert(input, 'No input#project-filename found!');
    return input.value;
  }
  set projectFilename(filename) {
    const input = document.getElementById('project-filename');
    console.assert(input, 'No input#project-filename found!');
    input.value = filename;
  }

  // calibration (choose cal group) input
  get calibration() {
    const input = document.getElementById('calibration-select');
    console.assert(input, 'No input#calibration-select found!');
    console.assert(input.selectedOptions.length, 'No options selected!');
    return input.selectedOptions[0].text;
  }
  set calibration(text) {
    const input = document.getElementById('calibration-select');
    console.assert(input, 'No input#calibration-select found!');
    for (let i = 0; i < input.length; i++) {
      if (input.children[i].text === text) {
        input.selectedIndex = i;
        break;
      }
    }
  }

  // save as cal group input
  get saveAsCalGroup() {
    const input = document.getElementById('save-as-cal-group');
    console.assert(input, 'No input#save-as-cal-group found!');
    return input.value
  }
  set saveAsCalGroup(name) {
    const input = document.getElementById('save-as-cal-group');
    console.assert(input, 'No input#save-as-cal-group found!');
    input.value = name;
  }

  // serial no
  get serialNo() {
    const input = document.getElementById('serial-no');
    console.assert(input, 'No input#serial-no found!');
    return input.value
  }
  set serialNo(value) {
    const input = document.getElementById('serial-no');
    console.assert(input, 'No input#serial-no found!');
    input.value = value;
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
