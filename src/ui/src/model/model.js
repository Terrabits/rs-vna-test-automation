import SerialSocket from './serial-socket';

// type conversions
function toBool(result) {
  return result.trim().toLowerCase() === 'true';
}
function toJson(result) {
  return JSON.parse(result);
}
function toNumber(result) {
  return Number(result.trim());
}

// promises abound.
class Model {
  constructor() {
    this.socket = new SerialSocket();
  }

  // vna
  async isVnaConnected() {
    return await this.socket.query('is_vna_connected?\n', toBool);
  }
  connectToVna(address) {
    this.socket.send(`connect_to_vna ${address}\n`);
  }
  disconnectFromVna() {
    this.socket.send('disconnect_from_vna\n');
  }

  // project
  async isProjectOpenPermanently() {
    return await this.socket.query('is_project_open_permanently?\n', toBool)
  }
  async isProjectOpen() {
    return await this.socket.query('is_project_open?\n', toBool);
  }
  openProject(filename) {
    this.socket.send(`open_project ${filename}\n`)
  }
  async readProject() {
    return await this.socket.query('read_project?\n', toJson);
  }
  closeProject() {
    this.socket.send('close_project\n');
  }

  // calibration
  async calGroups() {
    const response      = await this.socket.query('cal_groups?\n');
    const booleanFilter = (i) => { return Boolean(i); };
    return response.trim().split(',').filter(booleanFilter);
  }
  async calUnits() {
    const response      = await this.socket.query('cal_units?\n');
    const booleanFilter = (i) => { return Boolean(i); };
    return response.trim().split(',').filter(booleanFilter);
  }
  async calibrationSteps() {
    return await this.socket.query('calibration_steps?\n', toNumber);
  }
  async calibrationStep(i) {
    if (i < 0) {
      throw new Error(`Calibration step must be >= 0. Received ${i}`);
    }
    const steps = await this.calibrationSteps();
    if (i >= steps) {
      throw new Error(`Calibration step must be < ${steps}. Received ${i}`);
    }
    return await this.socket.query(`calibration_step? ${i}\n`, toJson);
  }
  startCalibration() {
    this.socket.send('start_calibration\n');
  }
  async performCalibrationStep(i) {
    const SCPI      = `perform_calibration_step? ${i}\n`;
    return await this.socket.query(SCPI, toBool);
  }
  async applyCalibration(calGroup=null) {
    calGroup        = calGroup || '""';
    return await this.socket.query(`apply_calibration? ${calGroup}\n`, toBool);
  }

  // measurement
  async measurementSteps() {
    return await this.socket.query('measurement_steps?\n', toNumber);
  }
  async measurementStep(i) {
    if (i < 0) {
      throw new Error(`Measurement step must be >= 0. Received: ${i}`);
    }
    const steps = await this.measurementSteps();
    if (i >= steps) {
      throw new Error(`Measurement step must be < ${steps}. Received: ${i}`);
    }
    return await this.socket.query(`measurement_step? ${i}\n`, toJson);
  }
  startMeasurementFor(serialNo, calGroup=null) {
    serialNo = serialNo.trim();
    if (!serialNo) {
      throw new Error(`Serial number is required! Received: ${serialNo}`);
    }
    calGroup = calGroup || '""';
    const scpi = `start_measurements_for ${serialNo} ${calGroup}\n`;
    this.socket.send(scpi);
  }
  async performMeasurementStep(i) {
    if (i < 0) {
      throw new Error(`Measurement step must be >= 0. Received: ${i}`);
    }
    const steps = await this.measurementSteps();
    if (i >= steps) {
      throw new Error(`Measurement step must be <= ${steps}. Received: ${i}`);
    }

    const scpi = `perform_measurement_step? ${i}\n`
    return await this.socket.query(scpi, toBool);
  }
  async measurementPassed() {
    return await this.socket.query('measurements_passed?\n', toBool);
  }
  saveMeasurements(path=null) {
    path = path || '.';
    this.socket.send(`save_measurements ${path}\n`);
  }
};

export default Model;
