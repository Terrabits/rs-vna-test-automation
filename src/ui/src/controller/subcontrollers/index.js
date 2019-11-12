import ChooseCalibrationSubcontroller  from './choose-calibration';
import HomeSubcontroller               from './home';
import PerformCalibrationSubcontroller from './perform-calibration';
import PerformMeasurementSubcontroller from './perform-measurement';
import SaveCalibrationSubcontroller    from './save-calibration';
import SaveMeasurementSubcontroller    from './save-measurement';
import SidebarSubcontroller            from './sidebar';
import StartMeasurementSubcontroller   from './start-measurement';

const subcontrollers = [
  HomeSubcontroller,
  ChooseCalibrationSubcontroller,
  PerformCalibrationSubcontroller,
  SaveCalibrationSubcontroller,
  StartMeasurementSubcontroller,
  PerformMeasurementSubcontroller,
  SaveMeasurementSubcontroller,
  SidebarSubcontroller
];

export default subcontrollers;
