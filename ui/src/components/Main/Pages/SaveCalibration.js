import React     from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function SaveCalibrationPage(props) {
  return (
    <div>
      <Title display="Save Calibration"/>
      <Paragraph>
        Save calibration as...
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>Calibration</label>
              <input type="text" className="form-control"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveCalibrationPage;
