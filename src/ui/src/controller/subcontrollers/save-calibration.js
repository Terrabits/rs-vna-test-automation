import Page          from '../page';
import Subcontroller from './subcontroller';

class SaveCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('SaveCalibrationPage')) {
      return;
    }

    console.log('SaveCalibration.onNextClicked');
    const calGroup = this.view.saveAsCalGroup;
    console.assert(calGroup, 'Cal group is empty!');
    const success = await this.model.applyCalibration(calGroup);
    console.assert(success, `Error apply cal and saving to cal group '${calGroup}'`);
    if (success) {
      this.controller.calGroup = calGroup;
      this.currentPage         = new Page("StartMeasurementPage");
    }
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
