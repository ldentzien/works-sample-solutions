import React, { Component } from "react";
import { useTable } from "react-table";
import { fetchDailyEventsTable, fetchDailyStatsTable, fetchHourlyEventsTable, fetchHourlyStatsTable, fetchPoiTable } from '../dataFetch'
  
function formatHour(hours) {
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  return hours + ' ' + ampm;
}

const columns = [
  {
    Header: "Events/Stats Table:",
    columns: [
      {
        Header: "Date",
        accessor: row => new Date(row.date).toDateString(),
      },
      {
        Header: "Hourly",
        accessor: row => formatHour(row.hour)
      },
      {
        Header: "Events",
        accessor: "events"
      },
      {
        Header: "Impressions",
        accessor: "impressions"
      },
      {
        Header: "Clicks",
        accessor: "clicks"
      },
      {
        Header: "Revenue",
        accessor: "revenue",
        // provide custom function to format props 
        Cell: props => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'CAD' }).format(props.value)
      },
    ]
  }
];

const poiColumns = [
  {
    Header: "POI Table:",
    columns: [
      {
        Header: "POI ID",
        accessor: "poi_id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Latitude",
        accessor: "lat"
      },
      {
        Header: "Longitude",
        accessor: "lon"
      },
    ]
  }
]


const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()} className='dataTable'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        tableData: [],
    }
}

componentDidMount(){
  var firstTable = document.getElementById('firstTable');
  var secondTable = document.getElementById('secondTable');

  firstTable.style.display = 'none';
  secondTable.style.display = 'none';
}

updateFirstTable = () => {
  var firstTable = document.getElementById('firstTable');
  var secondTable = document.getElementById('secondTable');

  firstTable.style.display = 'block';
  secondTable.style.display = 'none';
}

updateSecondTable = () => {
  var firstTable = document.getElementById('firstTable');
  var secondTable = document.getElementById('secondTable');

  firstTable.style.display = 'none';
  secondTable.style.display = 'block';
}

fetchDailyEventsTable = () => {
  fetchDailyEventsTable()
  .then ((data) => {
    this.updateFirstTable();
    this.setState({ tableData: data}) 
  })
}

fetchHourlyEventsTable = () => {
  fetchHourlyEventsTable()
  .then ((data) => {
    this.updateFirstTable();
    this.setState({ tableData: data}) 
  })
}

fetchDailyStatsTable = () => {
  fetchDailyStatsTable()
  .then ((data) => {
    this.updateFirstTable();
    this.setState({ tableData: data}) 
  })
}

fetchHourlyStatsTable = () => {
  fetchHourlyStatsTable()
  .then ((data) => {
    this.updateFirstTable();
    this.setState({ tableData: data}) 
  })
}

fetchPoiTable = () => {
  fetchPoiTable()
  .then ((data) => {
    this.updateSecondTable();
    this.setState({ tableData: data}) 
  })
}

  render () {
    return (
      <div className="dataTable-container">
        <div>
          <button onClick={this.fetchDailyEventsTable} className='button'>Daily Events</button>
          <button onClick={this.fetchHourlyEventsTable} className='button'>Hourly Events</button>
          <button onClick={this.fetchDailyStatsTable} className='button'>Daily Stats</button>
          <button onClick={this.fetchHourlyStatsTable} className='button'>Hourly Stats</button>
        </div>
          <div id="firstTable">
            <Table columns={columns} data={this.state.tableData}/>
          </div>
        <div>
          <button onClick={this.fetchPoiTable} className='button'>POI</button>
        </div>
          <div id="secondTable">
            <Table columns={poiColumns} data={this.state.tableData}/>
          </div>
      </div>
    );
  }
}



