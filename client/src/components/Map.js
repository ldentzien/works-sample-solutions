import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fetchPoiTable } from '../dataFetch'

const Marker = ({ text }) => <div style={{color: 'blue', fontSize: '2em'}}>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            poiIdArray: [],
            nameArray: [],
            latArray: [],
            lonArray: [],
        }
    }

  static defaultProps = {
    center: {
      lat: 43.6708,
      lng: -79.3899
    },
    zoom: 11
  };

  componentDidMount(){
    this.fetchPoiTable();
  }

  fetchPoiTable = () =>{
      fetchPoiTable()
      .then ((data) => {
        var poiIdArray = [];
        var nameArray = [];
        var latArray = [];
        var lonArray = [];

        for (var i = 0; i < data.length; i++) {
          if (data[i].poi_id != null) {
            poiIdArray.push(data[i].poi_id)
          }
          if (data[i].name != null) {
            nameArray.push(data[i].name)
          } 
          if (data[i].lat != null) {
            latArray.push(data[i].lat)
          } 
          if (data[i].lon != null) {
            lonArray.push(data[i].lon)
          } 
        } 
        this.setState({ poiIdArray: poiIdArray, nameArray: nameArray, latArray: latArray, lonArray: lonArray}) 
      })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <Marker
            lat={this.state.latArray[0]}
            lng={this.state.lonArray[0]}
            text={this.state.nameArray[0]}
        />
        <Marker
            lat={this.state.latArray[1]}
            lng={this.state.lonArray[1]}
            text={this.state.nameArray[1]}
        />
        <Marker
            lat={this.state.latArray[2]}
            lng={this.state.lonArray[2]}
            text={this.state.nameArray[2]}
        />
        <Marker
            lat={this.state.latArray[3]}
            lng={this.state.lonArray[3]}
            text={this.state.nameArray[3]}
        />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;