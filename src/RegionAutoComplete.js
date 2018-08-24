import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
import AreaAutoComplete from './AreaAutoComplete'
import StreetAutoComplete from './StreetAutoComplete'
import CityAutoComplete from './CityAutoComplete'
import LocalityAutoComplete from './LocalityAutoComplete'
import IntraurbanTerritoryAutoComplete from './IntraurbanTerritoryAutoComplete'

export default class RegionAutoComplete extends Component{
    constructor(props){
        super(props)
        this.state = {
          link: 'http://localhost:8080/items/',
          guid: '',
          areaGuid: '',
          streetGuid: '',
          localityGuid: '',
          aolvl: '1/',
          regionData: [],
          value: '',
          areaDisabled: true,
          cityDisabled: true,
          localityDisabled: true,
          streetDisabled: true,
          intraurbanTerritoryDisabled: true,
        }
        this.loadRegionData = this.loadRegionData.bind(this);
        this.localityTurnState = this.localityTurnState.bind(this);
        this.streetTurnState = this.streetTurnState.bind(this);
        this.intraurbanTerritoryTurnState = this.intraurbanTerritoryTurnState.bind(this);
    }

    localityTurnState(dataFromChild, localGuid) {
        this.setState({localityDisabled: dataFromChild, areaGuid: localGuid})
    }

    streetTurnState(dataFromChild, localGuid) {
        this.setState({streetDisabled: dataFromChild, localityGuid: localGuid})
    }

    intraurbanTerritoryTurnState(dataFromChild, localGuid) {
        this.setState({intraurbanTerritoryDisabled: dataFromChild, streetGuid: localGuid})
    }


    loadRegionData(value){
     var finalLink = this.state.link +
                     this.state.aolvl +
                     value +
                     '?page=0&size=100'
     axios.get(finalLink)
       .then(res => {
         const someData = res.data;
         var localData = []
         for (var i = 0; i < someData.length; ++i)
         {
           localData.push({label: someData[i].formalname,  guid: someData[i].aoguid, id: i});
         }
         this.setState({regionData: localData});
       })
 }

    render(){
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
                     items = {this.state.regionData}
                     shouldItemRender={
                       (item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                     }
                     getItemValue={
                       item =>item.label
                     }

                     renderItem={
                       (item, highlighted) =>
                       <div key={item.id}>

                         {item.label}
                       </div>
                     }

                     value={this.state.value}

                     onChange={
                       e => {
                         this.setState({ value: e.target.value})
                         this.loadRegionData(e.target.value)
                       }
                     }

                     onSelect={
                       value => {
                         this.setState({ value })
                         this.setState({areaDisabled: false, cityDisabled: false})
                         this.setState({guid: this.state.regionData[0].guid})
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
                <AreaAutoComplete
                                   guid={this.state.guid}
                                   disabled={this.state.areaDisabled}
                                   link={this.state.link}
                                   callBackFromArea={this.localityTurnState}
                                   />
                </td>
               </tr>
               <tr>
                <td>
                  Город:
                </td>
                <td>
                <CityAutoComplete
                                    guid={this.state.guid}
                                    disabled={this.state.cityDisabled}
                                    link={this.state.link}
                                    callBackFromCity={this.streetTurnState}
                                   />
                </td>
               </tr>
               <tr>
                <td>
                  Населенный пункт:
                </td>
                <td>
                <LocalityAutoComplete
                                    guid={this.state.areaGuid}
                                    disabled={this.state.localityDisabled}
                                    link={this.state.link}
                                    callBackFromLocality={this.streetTurnState}
                                   />
                </td>
               </tr>
               <tr>
                <td>
                  Улица:
                </td>
                <td>
                <StreetAutoComplete
                                    guid={this.state.localityGuid}
                                    disabled={this.state.streetDisabled}
                                    link={this.state.link}
                                    callBackFromStreet={this.intraurbanTerritoryTurnState}
                                   />
                </td>
               </tr>
               <tr>
                <td>
                  Внутригородская территория:
                </td>
                <td>
                <IntraurbanTerritoryAutoComplete
                                    guid={this.state.streetGuid}
                                    disabled={this.state.intraurbanTerritoryDisabled}
                                    link={this.state.link}
                                   />
                </td>
               </tr>
             </tbody>
           </table>
          </div>
        );
    }
}
