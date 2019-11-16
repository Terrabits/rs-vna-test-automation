import Page          from '../page';
import Subcontroller from './subcontroller';

class ChooseCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('ChooseCalibrationPage')) {
      return;
    }

    console.log('ChooseCalibrationPage.onNextClicked');
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
      this.view.alert.show('light', 'Starting new calibration...');
      this.model.startCalibration();
      this.currentPage = new Page('PerformCalibrationPage', 0);
      await this.updateView();
      return;
    }

    // set cal group
    if (calibration === '*None') {
      this.view.alert.show('danger', 'Starting measurements without calibration!', false);
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

    console.log('ChooseCalibrationPage.updateSubview');
    const calGroups = await this.model.calGroups();
    console.assert(calGroups !== undefined, 'No cal groups found!');
    this.view.setPage('ChooseCalibrationPage', {options: calGroups});
  }
}

export default ChooseCalibrationSubcontroller;
