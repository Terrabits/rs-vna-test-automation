import Page          from '../page';
import Subcontroller from './subcontroller';

class ChooseCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('ChooseCalibrationPage')) {
      return;
    }

    const calibration = this.view.calibration;
    if (calibration === '*New') {
      const calUnits = await this.model.calUnits();
      if (calUnits.length === 0) {
        this.view.alert.show('danger', '*No cal unit connected!');
        return;
      }
      if (calUnits.length >= 2) {
        this.view.alert.show('danger', '*Only one cal unit at a time is supported');
        return;
      }
      // start new calibration
      this.view.alert.show('primary', 'Starting new calibration...', true, false);
      this.model.startCalibration();
      this.currentPage = new Page('PerformCalibrationPage', 0);
      await this.updateView();
      return;
    }

    // set cal group
    if (calibration === '*None') {
      this.controller.calGroup = null;
    }
    else {
      this.controller.calGroup = calibration;
    }
    this.currentPage = new Page('StartMeasurementPage');
    await this.updateView();
  }

  preventSidebarNavigation(originalPage, destinationPage) {
    if (!originalPage.is('ChooseCalibrationPage')) {
      return false;
    }
    if (!destinationPage.is('StartMeasurementPage')) {
      return false;
    }
    if (this.controller.calGroup !== undefined) {
      return false;
    }
    // cal group is undefined
    this.view.alert.show('danger', '*Choose calibration to continue');
    return true;
  }

  async updateSubview() {
    if (!this.currentPage.is('ChooseCalibrationPage')) {
      return;
    }

    // update page, cal groups
    const calGroups = await this.model.calGroups();
    this.view.setPage('ChooseCalibrationPage', {options: calGroups});

    // update selected choice (default: *New)
    const choice          = this.controller.calGroup ? this.controller.calGroup : '*New';
    this.view.calibration = choice;
  }
}

export default ChooseCalibrationSubcontroller;
