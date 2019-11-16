import Page          from '../page';
import Subcontroller from './subcontroller';

class BackSubcontroller extends Subcontroller {
  async onBackClicked(originalPage) {
    console.log('Back.onBackClicked');
    let destinationPage = null;
    const step          = originalPage.step;
    switch(originalPage.name) {
      case 'HomePage':
      case 'ChooseCalibrationPage':
        destinationPage = new Page('HomePage');
        break;
      case 'PerformCalibrationPage':
        if (step === 0) {
          destinationPage = new Page('ChooseCalibrationPage');
        }
        else {
          destinationPage = new Page('PerformCalibrationPage', step-1);
        }
        break;
      case 'SaveCalibrationPage':
        destinationPage = new Page('PerformCalibrationPage', (await this.model.calibrationSteps()) - 1);
        break;
      case 'StartMeasurementPage':
        destinationPage = new Page('ChooseCalibrationPage');
        break;
      case 'PerformMeasurementPage':
        if (step === 0) {
          destinationPage = new Page('StartMeasurementPage');
        }
        else {
          destinationPage = new Page('PerformMeasurementPage', step - 1);
        }
        break;
      case 'SaveMeasurementPage':
        destinationPage = new Page('PerformMeasurementPage', (await this.model.measurementSteps()) - 1);
        break;
      default:
        throw new Error(`Error processing onBackClicked with originalPage: (${originalPage.name}, ${originalPage.step})`);
    }
    console.log(`  changing from ${originalPage.name} to ${destinationPage.name}`);
    this.controller.changePage(destinationPage);
  }

  async updateSubview() {
    if (this.currentPage.is('HomePage')) {
      // TODO: disable back button
    }
  }
}

export default BackSubcontroller;
