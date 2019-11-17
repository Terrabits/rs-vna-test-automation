import React     from 'react';
import './SaveMeasurement.scss';
import DownloadButton from './DownloadButton';
import Octicon, {getIconByName} from '@primer/octicons-react'
import Paragraph from './Paragraph';
import Title     from './Title';

function SaveMeasurementPage(props) {
  const settings = props.settings    || {};
  const serialNo = settings.serialNo || '';
  const passed   = settings.passed   || false;
  const onClick  = settings.onClick  || null;
  const download = [];
  if (!settings.hideDownload) {
    const icon = getIconByName('cloud-download');
    download.push((
      <div key="download-button">
        <Paragraph>
          Results can be downloaded as a zip file as well.
        </Paragraph>
        <DownloadButton id="download-measurement" onClick={onClick}>
          <Octicon icon={icon}/> Download
        </DownloadButton>
      </div>
    ));
  }
  let status    = passed ? 'passed'       :  'failed';
  let className = passed ? 'text-success' :  'text-danger';
  return (
    <div>
      <Title display="Measurement Results"/>
      <Paragraph className={className}>
        Your part {status}.
      </Paragraph>
      <Paragraph>
        The results for <code>{serialNo}</code> have been saved on machine <code>{window.location.hostname}</code>.
      </Paragraph>
      {download}
    </div>
  )
}

export default SaveMeasurementPage;
