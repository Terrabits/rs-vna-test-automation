import Page          from '../page';
import Subcontroller from './subcontroller';

class StartMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('StartMeasurementPage')) {
      return;
    }
    console.log('StartMeasurement.onNextClicked');
    const serialNo = this.view.serialNo;
    if (!serialNo) {
      this.view.alert.show('danger', '*No serial number entered!');
      return;
    }
    this.controller.serialNo = serialNo
    this.view.alert.show('light', `Starting measurements for serial no '${serialNo}'`);
    this.model.startMeasurementFor(this.controller.serialNo, this.controller.calGroup);
    this.currentPage = new Page('PerformMeasurementPage', 0);
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('StartMeasurementPage')) {
      return;
    }
    this.view.setPage('StartMeasurementPage');
  }
}

export default StartMeasurementSubcontroller;
