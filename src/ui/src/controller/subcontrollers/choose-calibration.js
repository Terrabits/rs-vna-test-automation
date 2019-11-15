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
      console.assert(calUnits.length !== 0, 'No cal unit!');
      console.assert(calUnits.length   < 2, 'Too many cal unit!');
      // start new calibration
      this.model.startCalibration();
      this.currentPage = new Page('PerformCalibrationPage', 0);
      this.updateView();
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
    this.updateView();
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
