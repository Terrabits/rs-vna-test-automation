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
      return;
    }

    // set cal group
    if (calibration === 'None') {
      this.calGroup = null;
    }
    else {
      this.calGroup = calibration;
    }
    this.page.name = 'StartMeasurementPage'
    this.page.step = -1;
  }

  async updateSubview() {
    if (!this.currentPage.is('ChooseCalibrationPage')) {
      return;
    }

    console.log('ChooseCalibrationPage.updateSubview');
    const calGroups = await this.model.calGroups();
    console.log(`cal groups: ${calGroups}`);
    console.assert(calGroups !== undefined, 'No cal groups found!');
    this.view.setPage('ChooseCalibrationPage', {options: calGroups});
  }
}

export default ChooseCalibrationSubcontroller;
