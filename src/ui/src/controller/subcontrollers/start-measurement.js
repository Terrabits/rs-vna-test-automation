import Page          from '../page';
import Subcontroller from './subcontroller';

class StartMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('StartMeasurementPage')) {
      return;
    }
    console.log('StartMeasurement.onNextClicked');
    const serialNo = this.view.serialNo;
    console.assert(serialNo, `No serial number entered!`);
    this.controller.serialNo = serialNo
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
