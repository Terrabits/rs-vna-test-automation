import ChooseCalibrationSubcontroller  from './subcontroller';
import HomeSubcontroller               from './subcontroller';
import PerformCalibrationSubcontroller from './subcontroller';
import PerformMeasurementSubcontroller from './subcontroller';
import SaveCalibrationSubcontroller    from './subcontroller';
import SaveMeasurementSubcontroller    from './subcontroller';
import SidebarSubcontroller            from './subcontroller';
import StartMeasurementSubcontroller   from './subcontroller';

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
