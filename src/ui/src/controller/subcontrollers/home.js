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
    if (!ipAddress) {
      this.view.alert.show('danger', '*IP Address not entered!');
      return;
    }

    // project
    // TODO: replace 💩
    const isPermanentProject = await this.model.isProjectOpenPermanently();
    let filename = null;
    if (!isPermanentProject) {
      filename = this.view.projectFilename;
    }
    // TODO: fix broken feature 💩
    filename = '~/Documents/Node/test-automation/src/projects/cable-example/procedure.yaml';
    if (!isPermanentProject && !filename) {
      this.view.alert.show('danger', '*Project filename not entered!')
      return;
    }

    // connect to vna
    this.model.connectToVna(ipAddress);
    const isVnaConnected = await this.model.isVnaConnected();
    if (!isVnaConnected) {
      this.view.alert.show('danger', `Could not connect to VNA at ${ipAddress}`);
      return;
    }

    // open project
    if (!isPermanentProject) {
      this.model.openProject(filename);
      const isOpen = await this.model.isProjectOpen();
      if (!isOpen) {
        this.view.alert.show('danger', `Could not open project ${filename}`);
        return;
      }
    }

    // move to calibration
    this.view.alert.show('success', '*VNA is connected')
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
