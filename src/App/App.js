import React, {Component} from 'react'
import {connect} from 'react-redux'
import Autocomplete from 'react-autocomplete'

import {getRegions} from '../actions/RegionsData'
import {getAreas} from '../actions/AreasData'
import {getCities} from '../actions/CitiesData'
import {getLocalities} from '../actions/LocalitiesData'
import {getStreets} from '../actions/StreetsData'
import {getIntraurbanTerritories} from '../actions/IntraurbanTerritoriesData'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
          value: '',
          areaValue: '',
          cityValue: '',
          streetValue: '',
          localityValue: '',
          intraurbanTerritoryValue: '',

          guid: '',
          areaGuid: '',
          streetGuid: '',
          localityGuid: '',

          areaDisabled: true,
          cityDisabled: true,
          localityDisabled: true,
          streetDisabled: true,
          intraurbanTerritoryDisabled: true,
        }
  }


    render(){
        console.log('streets', this.props.streets);
        console.log('locality', this.props.localities);
        console.log('intraurbanTerritories', this.props.intraurbanTerritories);
        return(
          <div>
          <table align="center">
            <tbody>
             <tr>
               <td>
                 Регион:
               </td>
               <td>
                   <Autocomplete
                     items = {this.props.regions}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item =>item.formalname
                     }

                     renderItem={
                       (item, highlighted) =>
                       <div key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     value={this.state.value}

                     onChange={
                       e => {
                         this.setState({ value: e.target.value})
                         this.props.onGetRegions(e.target.value)
                       }
                     }

                     onSelect={
                       value => {
                         this.setState({ value })
                         this.setState({areaDisabled: false, cityDisabled: false})
                         this.setState({guid: this.props.regions[0].aoguid})
                       }
                     }
                   />
               </td>
               </tr>
               <tr>
                <td>
                  Район:
                </td>
                <td>
                <Autocomplete
                     items = {this.props.areas}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item => item.formalname
                     }
                     renderItem={
                       (item, highlighted) =>
                       <div
                         key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     inputProps={
                       {disabled: this.state.areaDisabled}
                     }

                     value={this.state.areaValue}
                     onChange={
                       (e) => {
                         this.setState({ areaValue: e.target.value })
                         this.props.onGetAreas(e.target.value, this.state.guid)
                       }
                     }
                     onSelect={
                       value => {
                         this.setState({areaValue:  value })
                         this.setState({areaGuid: this.props.areas[0].aoguid})
                         this.setState({localityDisabled: false})
                       }
                     }
                   />
                </td>
               </tr>
               <tr>
                <td>
                  Город:
                </td>
                <td>
                <Autocomplete
                     items = {this.props.cities}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item => item.formalname
                     }
                     renderItem={
                       (item, highlighted) =>
                       <div
                         key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     inputProps={
                       {disabled: this.state.cityDisabled}
                     }

                     value={this.state.cityValue}
                     onChange={
                       (e) => {
                         this.setState({ cityValue: e.target.value })
                         this.props.onGetCities(e.target.value, this.state.guid)
                       }
                     }
                     onSelect={value => {
                       this.setState({cityValue: value })
                       this.setState({localityGuid: this.props.cities[0].aoguid});
                       this.setState({streetDisabled: false})
                     }
                     }
                   />
                </td>
               </tr>
               <tr>
                <td>
                  Населенный пункт:
                </td>
                <td>
                <Autocomplete
                     items = {this.props.localities}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item => item.formalname
                     }
                     renderItem={
                       (item, highlighted) =>
                       <div
                         key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     inputProps={
                       {disabled: this.state.localityDisabled}
                     }

                     value={this.state.localityValue}
                     onChange={
                       (e) => {
                         this.setState({ localityValue: e.target.value })
                         this.props.onGetLocalities(e.target.value, this.state.areaGuid)
                       }
                     }
                     onSelect={value =>
                     {
                       this.setState({localityValue: value })
                       this.setState({localityGuid: this.props.localities[0].guid});
                       this.setState({streetDisabled: false})
                     }
                     }
                   />
                </td>
               </tr>
               <tr>
                <td>
                  Улица:
                </td>
                <td>
                <Autocomplete
                     items = {this.props.streets}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item => item.formalname
                     }
                     renderItem={
                       (item, highlighted) =>
                       <div
                         key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     inputProps={
                       {disabled: this.state.streetDisabled}
                     }

                     value={this.state.streetValue}
                     onChange={
                       (e) => {
                         this.setState({streetValue: e.target.value })
                         this.props.onGetStreets(e.target.value, this.state.localityGuid)
                       }
                     }
                     onSelect={value =>
                     {
                       this.setState({streetValue: value })
                       this.setState({streetGuid: this.props.streets[0].aoguid});
                       this.setState({intraurbanTerritoryDisabled: false})
                     }
                     }
                   />
                </td>
               </tr>
               <tr>
                <td>
                  Внутригородская территория:
                </td>
                <td>
                <Autocomplete
                     items = {this.props.intraurbanTerritories}
                     shouldItemRender={
                       (item, value) => item.formalname.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item => item.formalname
                     }
                     renderItem={
                       (item, highlighted) =>
                       <div
                         key={item.aoguid}>

                         {item.formalname}
                       </div>
                     }

                     inputProps={
                       {disabled: this.state.intraurbanTerritoryDisabled}
                     }

                     value={this.state.intraurbanTerritoryValue}
                     onChange={
                       (e) => {
                         this.setState({ intraurbanTerritoryValue: e.target.value })
                         this.props.onGetIntraurbanTerritories(e.target.value, this.state.streetGuid)
                       }
                     }
                     onSelect={value =>
                     {
                       this.setState({intraurbanTerritoryValue: value })
                     }
                     }
                   />
                </td>
               </tr>
             </tbody>
           </table>
          </div>
        );
    }
}

export default connect(
  state => ({
    regions: state.regions,
    cities: state.cities,
    areas: state.areas,
    localities: state.localities,
    streets: state.streets,
    intraurbanTerritories: state.intraurbanTerritories
  }),
  dispatch => ({
    onGetRegions: (value) => {
      dispatch(getRegions(value))
    },
    onGetAreas: (value, guid) => {
      dispatch(getAreas(value, guid))
    },
    onGetCities: (value, guid) => {
      dispatch(getCities(value, guid))
    },
    onGetLocalities: (value, guid) => {
      dispatch(getLocalities(value, guid))
    },
    onGetStreets: (value, guid) => {
      dispatch(getStreets(value, guid))
    },
    onGetIntraurbanTerritories: (value, guid) => {
      dispatch(getIntraurbanTerritories(value, guid))
    }
  })
)(App);
