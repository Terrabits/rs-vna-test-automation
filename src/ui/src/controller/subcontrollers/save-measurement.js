import Page          from '../page';
import Subcontroller from './subcontroller';

class SaveMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('SaveMeasurementPage')) {
      return;
    }
    console.log('SaveMeasurement.onNextClicked');
    this.model.saveMeasurements(`~/Documents/TestAutomation/${this.serialNo}`);
    this.currentPage = new Page('StartMeasurementPage');
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('SaveMeasurementPage')) {
      return;
    }
    const settings = {
      serialNo: this.controller.serialNo,
      passed:   await this.model.measurementPassed(),
      onClick:  () => console.log('Controller: SaveMeasurementPage.Download clicked!')
    };
    this.view.setPage('SaveMeasurementPage', settings);
  }
}

export default SaveMeasurementSubcontroller;
