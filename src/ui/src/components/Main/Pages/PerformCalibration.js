import React     from 'react';
import Paragraph from './Paragraph';
import Table     from './Table';
import Title     from './Title';

// props.settings:
// - step
// - steps
// - headers
// - connections
function PerformCalibrationPage(props) {
  const step        = props.settings.step        || 0;
  const steps       = props.settings.steps       || 0;
  const headers     = props.settings.headers     || [];
  const connections = props.settings.connections || {};
  return (
    <div>
      <Title display="Perform Calibration" step={step} steps={steps}/>
      <Paragraph>
        Make the following connections between the VNA and the Cal Unit, then click the <code>Next</code> button to start.
      </Paragraph>
      <div className="row">
        <Table headers={headers} connections={connections}/>
      </div>
    </div>
  )
}

export default PerformCalibrationPage;
