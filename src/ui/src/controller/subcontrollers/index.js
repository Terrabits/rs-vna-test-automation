import BackSubcontroller               from './back';
import ChooseCalibrationSubcontroller  from './choose-calibration';
import HomeSubcontroller               from './home';
import PerformCalibrationSubcontroller from './perform-calibration';
import PerformMeasurementSubcontroller from './perform-measurement';
import SaveCalibrationSubcontroller    from './save-calibration';
import SaveMeasurementSubcontroller    from './save-measurement';
import SidebarSubcontroller            from './sidebar';
import StartMeasurementSubcontroller   from './start-measurement';
import TitleSubcontroller              from './title';

const subcontrollers = [
  TitleSubcontroller, // first: set title
  HomeSubcontroller,  // second: process vna, project
  ChooseCalibrationSubcontroller,
  PerformCalibrationSubcontroller,
  SaveCalibrationSubcontroller,
  StartMeasurementSubcontroller,
  PerformMeasurementSubcontroller,
  SaveMeasurementSubcontroller,
  BackSubcontroller,
  SidebarSubcontroller
];

export default subcontrollers;
