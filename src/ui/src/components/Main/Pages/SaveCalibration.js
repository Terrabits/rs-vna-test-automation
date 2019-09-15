import React     from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function SaveCalibrationPage(props) {
  return (
    <div>
      <Title display="Save Calibration"/>
      <Paragraph>
        Calibration was successful! Please provide a name to save it.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>Cal Group Name</label>
              <input id="save-as-cal-group" type="text" className="form-control"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveCalibrationPage;
