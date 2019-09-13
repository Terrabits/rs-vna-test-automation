import React     from 'react';
import './SaveMeasurement.scss';
import DownloadButton from './DownloadButton';
import Octicon, {getIconByName} from '@primer/octicons-react'
import Paragraph from './Paragraph';
import Title     from './Title';

function SaveMeasurementPage(props) {
  const serialNo = props.settings.serialNo || '{serialNo}';
  let onClick = () => {
    console.log('SaveMeasurementPage.Download clicked')
  };
  if (props.settings && props.settings.hasOwnProperty('onClick')) {
    onClick = props.settings.onClick;
  }
  const download = [];
  if (props.settings && !props.settings['hideDownload']) {
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
  return (
    <div>
      <Title display="Measurement Saved"/>
      <Paragraph>
        The results for <code>{serialNo}</code> have been saved on machine <code>{window.location.hostname}</code>.
      </Paragraph>
      {download}
    </div>
  )
}

export default SaveMeasurementPage;
