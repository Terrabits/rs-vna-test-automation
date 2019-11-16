import Page          from '../page';
import Subcontroller from './subcontroller';

class HomeSubcontroller extends Subcontroller {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.controller.ipAddress = 'localhost';
    this.controller.filename  = '';
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

    // close any previously opened projects
    this.model.closeProject();
    this.model.disconnectFromVna();

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

    // save address, project
    this.controller.ipAddress = ipAddress;
    this.controller.filename  = filename;

    // move to calibration
    this.view.alert.show('success', '*VNA is connected')
    this.currentPage = new Page("ChooseCalibrationPage");
    await this.updateView();
  }

  preventSidebarNavigation(originalPage, destinationPage) {
    if (originalPage.is('HomePage')) {
      // can't navigate away from homepage.
      return true;
    }
  }

  async updateSubview() {
    if (!this.currentPage.is('HomePage')) {
      return;
    }
    const hideProject   = await this.model.isProjectOpenPermanently();
    this.view.setPage('HomePage', {hideProject});
    this.view.ipAddress = this.controller.ipAddress;
    // TODO: display current project filename?
  }
}

export default HomeSubcontroller;
