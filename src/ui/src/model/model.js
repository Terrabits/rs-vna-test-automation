import SerialSocket from './serial-socket';

// type conversions
async function toString(blob) {
  return await new Response(blob).text();
}
async function toBool(blob) {
  const string = await toString(blob);
  return string.trim().toLowerCase() === 'true';
}
async function toJson(blob) {
  // TODO:
  // Do I need to convert from blob to string? 💩
  const string = await toString(blob);
  return JSON.parse(string);
}
async function toNumber(blob) {
  const string = await toString(blob);
  return Number(string.trim());
}
async function blockDataFormat(blob) {
  const hash      = await new Response(blob.slice(0,1)).text();
  console.assert(hash === '#', 'this does not seem to be block data format...');
  const sizeLen   = Number(await new Response(blob.slice(1, 2        )).text());
  const sizeStart = 2;
  const sizeStop  = 2 + sizeLen;
  const size      = Number(await new Response(blob.slice(sizeStart, sizeStop)).text());
  const dataStart = sizeStop;
  const dataStop  = dataStart + size;
  return blob.slice(dataStart, dataStop);
}

// promises abound.
class Model {
  constructor() {
    this.socket = new SerialSocket();
  }

  // errors
  async errors() {
    return await this.socket.query('errors?\n', toJson);
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
    const response      = await this.socket.query('cal_groups?\n', toString);
    const booleanFilter = (i) => { return Boolean(i); };
    return response.trim().split(',').filter(booleanFilter);
  }
  async calUnits() {
    const response      = await this.socket.query('cal_units?\n', toString);
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
  async measurementStepImage(i) {
    if (i < 0) {
      throw new Error(`Measurement step must be >= 0. Received: ${i}`);
    }
    const steps = await this.measurementSteps();
    if (i >= steps) {
      throw new Error(`Measurement step must be < ${steps}. Received: ${i}`);
    }
    return await this.socket.query(`measurement_step_image? ${i}\n`, blockDataFormat);
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
    this.socket.send(`save_measurements\n`);
  }
  async downloadMeasurementResults() {
    return await this.socket.query('download_measurement_results?\n', blockDataFormat)
  }
};

export default Model;
