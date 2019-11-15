import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformCalibrationPage')) {
      return;
    }
    console.log('PerformCalibration.onNextClicked');
    const steps = await this.model.calibrationSteps();
    const step  = this.currentPage.step;
    if (step < 0) {
      throw new Error('steps must be >= 0');
    }
    if (step >= steps) {
      throw new Error(`step must be < ${steps}`);
    }
    this.view.alert.show('light', `Performing calibration step ${step + 1}...`, false);
    const success = await this.model.performCalibrationStep(step);
    if (!success) {
      this.view.alert.show('danger', `*Calibration step ${step} failed!`);
      return;
    }
    this.view.alert.show('success', `Calibration step ${step + 1} complete.`);
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
      this.view.alert.show('success', 'Calibration steps are complete!');
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
