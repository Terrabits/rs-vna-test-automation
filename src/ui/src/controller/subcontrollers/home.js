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

    // ip address
    const ipAddress = this.view.ipAddress;
    if (!ipAddress) {
      this.view.alert.show('danger', 'IP Address not entered!');
      return;
    }

    // project
    const isProjectOpen            = await this.model.isProjectOpen();
    const isProjectOpenPermanently = await this.model.isProjectOpenPermanently();
    if (isProjectOpenPermanently) {
      const project = await this.model.readProject();
      this.view.title = `${project['name']} v${project['version']}`
    }

    let filename = null;
    if (!isProjectOpenPermanently) {
      filename = this.view.projectFilename;
    }
    // TODO: fix broken feature 💩
    filename = '~/Documents/Node/test-automation/src/projects/examples/cable/procedure.yaml';
    if (!isProjectOpenPermanently && !filename) {
      this.view.alert.show('danger', 'Project filename not entered!')
      return;
    }

    // close previous vna connection
    if (await this.model.isVnaConnected()) {
      this.model.disconnectFromVna();
    }

    // close previous project
    if (isProjectOpen && !isProjectOpenPermanently) {
      this.model.closeProject();
    }

    // connect to vna
    this.model.connectToVna(ipAddress);
    const isVnaConnected = await this.model.isVnaConnected();
    if (!isVnaConnected) {
      this.showErrorOrMessage(`Could not connect to VNA at ${ipAddress}`);
      return;
    }

    // open project
    if (!isProjectOpenPermanently) {
      this.model.openProject(filename);
      const isOpen = await this.model.isProjectOpen();
      if (!isOpen) {
        this.showErrorOrMessage(`Could not open project ${filename}`);
        return;
      }
    }

    // save address, project
    this.controller.ipAddress = ipAddress;
    this.controller.filename  = filename;

    // move to calibration
    this.view.alert.show('success', 'VNA is connected')
    this.currentPage = new Page("ChooseCalibrationPage");
    await this.updateView();
  }

  preventSidebarNavigation(originalPage, destinationPage) {
    if (originalPage.is('HomePage')) {
      if (destinationPage.is('HomePage')) {
        // do nothing
        return;
      }
      // can't navigate away from homepage.
      this.view.alert.show('danger', 'Click Next to connect to VNA and continue.');
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
