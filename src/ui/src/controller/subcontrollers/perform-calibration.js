import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformCalibrationSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformCalibrationPage')) {
      return;
    }

    const steps = await this.model.calibrationSteps();
    const step  = this.currentPage.step;
    if (step < 0) {
      throw new Error('steps must be >= 0');
    }
    if (step >= steps) {
      throw new Error(`step must be < ${steps}`);
    }
    this.view.disableInputs();
    this.view.alert.show('primary', `Performing calibration step ${step + 1}`, true, false);
    const success = await this.model.performCalibrationStep(step);
    this.view.enableInputs();
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
    await this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('PerformCalibrationPage')) {
      return;
    }
    const step        =       this.currentPage.step + 1;
    const steps       = await this.model.calibrationSteps();
    const headers     = ['VNA Port', 'Cal Unit Port'];
    const connections = await this.model.calibrationStep(this.currentPage.step);
    const settings    = {step, steps, headers, connections};
    this.view.setPage('PerformCalibrationPage', settings);
  }
}

export default PerformCalibrationSubcontroller;
