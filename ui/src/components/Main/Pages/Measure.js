import React     from 'react';
import Paragraph from './Paragraph';
import Table     from './Table';
import Title     from './Title';

function MeasurePage(props) {
  const step    = props.step    || 1;
  const steps   = props.steps   || 2;
  const headers = props.headers || ['VNA Port', 'Connect to'];
  const connections = props.connections ||
                      {'1': 'USB-A D+',
                       '3': 'USB-A D-',
                       '2': 'USB-C D+',
                       '4': 'USB-C D-'};
  return (
    <div>
      <Title display="Perform Measurement" step={step} steps={steps}/>
      <Paragraph>
        Make the following connections, then click the <code>Next</code> button to continue.
      </Paragraph>
      <div className="row">
        <Table headers={headers} connections={connections}/>
      </div>
    </div>
  )
}

export default MeasurePage;
