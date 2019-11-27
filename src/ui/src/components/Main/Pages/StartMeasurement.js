import React          from 'react';
import Paragraph      from './Paragraph';
import preventDefault from './prevent-default';
import Title          from './Title';

function StartMeasurementPage(props) {
  const disableInputs = props.disableInputs || false;
  return (
    <div>
      <Title display="Start Measurements"/>
      <Paragraph>
        Enter the serial number of the part, then click the <code>Next</code> button to continue.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form onSubmit={preventDefault}>
            <div className="form-group">
              <label>Serial No</label>
              <input id="serial-no" type="text" className="form-control" disabled={disableInputs}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StartMeasurementPage;
