import Page          from '../page';
import Subcontroller from './subcontroller';

class HomeSubcontroller extends Subcontroller {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.view.ipAddress = 'localhost';
  }

  async onNextClicked(originalPage) {
    if (!originalPage.is('HomePage')) {
      return;
    }
    console.log('Home.onNextClicked');

    // ip address
    const ipAddress = this.view.ipAddress;
    console.assert(ipAddress, 'No IP address entered!');

    // project
    // TODO: replace 💩
    const projectFilename = '~/Documents/Node/test-automation/src/projects/cable-example/procedure.yaml';
    console.assert(projectFilename, 'No project filename entered!');

    // connect to vna
    this.model.connectToVna(ipAddress);
    const isVnaConnected = await this.model.isVnaConnected();
    console.assert(isVnaConnected, `Could not connect to VNA at ${ipAddress}`);

    // open project
    this.model.openProject(projectFilename);
    const isProjectOpen = await this.model.isProjectOpen();
    console.assert(isProjectOpen, `Could not open project ${projectFilename}`);

    // move to calibration
    this.currentPage = new Page("ChooseCalibrationPage");
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('HomePage')) {
      return;
    }

    let settings = {};
    if (await this.model.isProjectOpenPermanently()) {
      settings = {hideProject: true};
    }
    this.view.setPage('HomePage', settings);
  }
}

export default HomeSubcontroller;
