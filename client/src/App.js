import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import EventsChart from './components/EventsChart'
import CtrChart from './components/CtrChart'
import RevenueChart from './components/RevenueChart'
import { DataTable } from './components/DataTable'
import Map from './components/Map'
import { fetchDailyEventsTable, fetchDailyStatsTable, fetchHourlyEventsTable, fetchHourlyStatsTable, formatDate } from './dataFetch'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        dateArray: [],
        eventArray: [],
        impressionArray: [],
        clickArray: [],
        revenueArray: [],
        ctrArray: [],
        tableData: [],
    }
}

componentDidMount(){
  this.updateDailyData();
  document.getElementById('charts').style.display = 'none';
  document.getElementById('map').style.display = 'none';
}

updateDailyData = () => {
  var dateArray = [];
  var eventArray = [];
  var impressionArray = [];
  var clickArray = [];
  var revenueArray = [];
  var ctrArray = [];

  fetchDailyEventsTable()
  .then ((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].date != null) {
        dateArray.push(new Date(data[i].date).toDateString())
      }
      if (data[i].events != null) {
        eventArray.push(data[i].events)
      } 
    } 
    this.setState({ dateArray: dateArray, eventArray: eventArray}) 
  })
  fetchDailyStatsTable()
  .then ((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].impressions != null) {
        impressionArray.push(data[i].impressions)
      }
      if (data[i].clicks != null) {
        clickArray.push(data[i].clicks)
      }
      if (data[i].revenue != null) {
        revenueArray.push(parseFloat(data[i].revenue).toFixed(2));
      }
      if (data[i].impressions != null && data[i].clicks != null) {
        ctrArray[i] = ((data[i].clicks/data[i].impressions) * 100).toFixed(2) + '% CTR'
      }
    }
    this.setState({ impressionArray: impressionArray, clickArray: clickArray, revenueArray: revenueArray, ctrArray: ctrArray}) 
  })
}

fetchHourlyEventsTable = () => {
  var dateArray = [];
  var eventArray = [];
  var impressionArray = [];
  var clickArray = [];
  var revenueArray = [];
  var ctrArray = [];

  fetchHourlyEventsTable()
  .then ((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].date != null) {
        dateArray.push(formatDate(new Date (data[i].date), data[i].hour))
      } 
      if (data[i].events != null) {
        eventArray.push(data[i].events)
      } 
    } 
    this.setState({ dateArray: dateArray, eventArray: eventArray}) 
  })
  fetchHourlyStatsTable()
  .then ((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].impressions != null) {
        impressionArray.push(data[i].impressions)
      }
      if (data[i].clicks != null) {
        clickArray.push(data[i].clicks)
      }
      if (data[i].revenue != null) {
        revenueArray.push(parseFloat(data[i].revenue).toFixed(2));
      }
      if (data[i].impressions != null && data[i].clicks != null) {
        ctrArray[i] = ((data[i].clicks/data[i].impressions) * 100).toFixed(2) + '% CTR'
      }
    }
    this.setState({ impressionArray: impressionArray, clickArray: clickArray, revenueArray: revenueArray, ctrArray: ctrArray}) 
  })
}

updateFirstSolution = () => {
  var div = document.getElementById('charts');

  if(div.style.display === 'none') {
    div.style.display = 'block';
  } 
  else {
    div.style.display = 'none';
  }
}

updateSecondSolution = () => {
  var div = document.getElementById('table');

  if(div.style.display === 'none') {
    div.style.display = 'block';
  } 
  else {
    div.style.display = 'none';
  }
}

updateThirdSolution = () => {
  var div = document.getElementById('map');

  if(div.style.display === 'none') {
    div.style.display = 'block';
  } 
  else {
    div.style.display = 'none';
  }
}

  render() {

    return (
      <div className="App">
        <Header/>
          <button onClick={this.updateFirstSolution} class='button'>Show First Solution</button>
          <button onClick={this.updateSecondSolution} class='button'>Show Second Solution</button>
          <button onClick={this.updateThirdSolution} class='button'>Show Third Solution</button>
          <div id="charts">
            <h1>First Solution:</h1>
            <button onClick={this.updateDailyData} class='button'>Daily Metrics</button>
            <button onClick={this.fetchHourlyEventsTable} class='button'>Hourly Metrics</button>
            <h2>Events Chart</h2>
            <EventsChart 
                    chartLabels={this.state.dateArray} 
                    chartLabel='Events'
                    chartData={this.state.eventArray}
                    yAxisLabel={'Events'}
            />
            <h2>CTR Chart</h2>
            <CtrChart 
                    chartLabels={this.state.ctrArray} 
                    chartLabel='Clicks'
                    chartData={this.state.clickArray}
                    leftYAxisLabel={'Clicks'}
                    chartLabel2={'Impressions'}
                    chartData2={this.state.impressionArray}
                    rightYAxisLabel={'Impressions'}
            />
            <h2>Revenue Chart</h2>
            <RevenueChart 
                    chartLabels={this.state.dateArray} 
                    chartLabel='Revenue'
                    chartData={this.state.revenueArray}
                    yAxisLabel={'$'}
            />
          </div>
          <div id="table">
            <h1>Second Solution:</h1>
            <DataTable/>
          </div>
          <div id="map">
          <h1>Third Solution:</h1>
          <Map/>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
