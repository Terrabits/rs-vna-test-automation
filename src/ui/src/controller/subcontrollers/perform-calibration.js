import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformCalibrationPage')) {
      return;
    }
    console.log('PerformCalibration.onNextClicked');
    const steps = await this.model.calibrationSteps();
    console.assert(this.currentPage.step >= 0,    "step must be >=0");
    console.assert(this.currentPage.step < steps, `step must be <${steps}`);
    const success = await this.model.performCalibrationStep(this.currentPage.step);
    console.assert(success, `Calibration step ${this.currentPage.step} failed`);
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
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
