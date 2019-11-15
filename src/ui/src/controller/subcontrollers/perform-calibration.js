import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformCalibrationPage')) {
      return;
    }
    console.log('PerformCalibration.onNextClicked');
    const steps = await this.model.calibrationSteps();
    if (this.currentPage.step < 0) {
      throw new Error('steps must be >= 0');
    }
    if (this.currentPage.step >= steps) {
      throw new Error(`step must be < ${steps}`);
    }
    const success = await this.model.performCalibrationStep(this.currentPage.step);
    if (!success) {
      this.view.alert.show('danger', '*The current calibration step failed!');
      return;
    }
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
      this.view.alert.show('info', 'Calibration steps are complete');
      this.currentPage = new Page("SaveCalibrationPage");
    }
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('PerformCalibrationPage')) {
      return;
    }

    const settings = {
      step:              this.currentPage.step + 1,
      steps:       await this.model.calibrationSteps(),
      headers:     ['VNA Port', 'Cal Unit Port'],
      connections: await this.model.calibrationStep(this.currentPage.step)
    };
    this.view.setPage('PerformCalibrationPage', settings);
  }
}

export default PerformCalibrationSubcontroller;
