import Page          from '../page';
import Subcontroller from './subcontroller';

class SaveCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('SaveCalibrationPage')) {
      return;
    }

    console.log('SaveCalibration.onNextClicked');
    const calGroup = this.view.saveAsCalGroup;
    if (!calGroup) {
      this.view.alert.show('danger', '*Cal group name not entered!');
      return;
    }
    const success = await this.model.applyCalibration(calGroup);
    if (!success) {
      this.view.alert.show('danger', `*Error saving calibration.`);
      return;
    }

    this.view.alert.show('success', '*Calibration saved.');
    this.controller.calGroup = calGroup;
    this.currentPage         = new Page("StartMeasurementPage");
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('SaveCalibrationPage')) {
      return;
    }
    this.view.setPage('SaveCalibrationPage');
  }
}

export default SaveCalibrationSubcontroller;
