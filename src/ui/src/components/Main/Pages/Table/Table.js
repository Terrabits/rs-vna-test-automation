import React from 'react';
import './Table.scss';

function Table(props) {
  const headers     = props.headers;
  const header_tags = headers.map((header) => {
    return (
      <th key={header} scope="col">{header}</th>
    )
  });
  const connections = props.connections;
  const connection_tags = Object.keys(connections).map((key) => {
    const value = connections[key];
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  });
  return (
    <div className="offset-md-3 col-md-6">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {header_tags}
          </tr>
        </thead>
        <tbody>
          {connection_tags}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
