import React     from 'react';
import Paragraph from './Paragraph';
import Table     from './Table';
import Title     from './Title';

function PerformCalibrationPage(props) {
  const step  = props.step  || 1;
  const steps = props.steps || 2;
  const headers     = props.headers     || ['VNA Port', 'Cal Unit Port'];
  const connections = props.connections ||
                      {'1': '1',
                       '3': '3',
                       '2': '2',
                       '4': '4'};
  return (
    <div>
      <Title display="Perform Calibration" step={step} steps={steps}/>
      <Paragraph>
        Make the following connections between the VNA and the Cal Unit, then click the <code>Next</code> button to continue.
      </Paragraph>
      <div className="row">
        <Table headers={headers} connections={connections}/>
      </div>
    </div>
  )
}

export default PerformCalibrationPage;
