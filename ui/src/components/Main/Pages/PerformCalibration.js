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
  // TODO: REMOVE 1337 LOREM IPSUM
  const step  = props.settings.step  || 1;
  const steps = props.settings.steps || 2;
  const headers     = props.settings.headers     || ['VNA Port', 'Cal Unit Port'];
  const connections = props.settings.connections ||
                      {'1': '1',
                       '3': '3',
                       '2': '2',
                       '4': '4'};
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
