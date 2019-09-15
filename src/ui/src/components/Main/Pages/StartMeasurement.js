import React     from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function StartMeasurementPage(props) {
  return (
    <div>
      <Title display="Start Measurements"/>
      <Paragraph>
        Enter the serial number of the part, then click the <code>Next</code> button to continue.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>Serial No</label>
              <input id="serial-no" type="text" className="form-control"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StartMeasurementPage;
