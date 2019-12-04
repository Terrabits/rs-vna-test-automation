import FileSaver     from 'file-saver';
import Page          from '../page';
import Subcontroller from './subcontroller';

class SaveMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('SaveMeasurementPage')) {
      return;
    }

    this.model.saveMeasurements(`~/Documents/TestAutomation/${this.controller.serialNo}`);
    this.currentPage = new Page('StartMeasurementPage');
    await this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('SaveMeasurementPage')) {
      return;
    }
    const onDownloadClicked = () => {
      (async () => {
        const data = await this.model.downloadMeasurementResults();
        if (!data) {
          this.view.alert.show('danger', 'An error occurred while downloading measurement results!');
          return;
        }
        FileSaver.saveAs(data, `${this.controller.serialNo}.zip`);
      })();
    }
    const settings = {
      serialNo: this.controller.serialNo,
      passed:   await this.model.measurementPassed(),
      onClick:  onDownloadClicked
    };
    this.view.setPage('SaveMeasurementPage', settings);
  }
}

export default SaveMeasurementSubcontroller;
