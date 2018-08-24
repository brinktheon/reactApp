import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export default class CityAutoComplete extends Component{
    constructor(props){
        super(props)
        this.state = {
          cityData: [],
          aolvl: '4/',
          value: '',
        }
        this.loadCityData = this.loadCityData.bind(this);
        this.turnStateDisabled = this.turnStateDisabled.bind(this);
    }

    turnStateDisabled(localGuid){
      this.props.callBackFromCity(false, localGuid);
    }

    loadCityData(value){
     var finalLink = this.props.link +
                     'subItems/' +
                     this.state.aolvl +
                     this.props.guid +
                     "/" +
                     value +
                     '?page=0&size=50'
     axios.get(finalLink)
       .then(res => {
         const someData = res.data;
         var localData = []
         for (var i = 0; i < someData.length; ++i)
         {
           localData.push({label: someData[i].formalname, guid: someData[i].aoguid, id: i});
         }
         this.setState({cityData: localData});
       })
     }

    render(){
        return(
          <div>
               <Autocomplete
                    items = {this.state.cityData}
                    shouldItemRender={
                      (item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    getItemValue={
                      item => item.label
                    }
                    renderItem={
                      (item, highlighted) =>
                      <div
                        key={item.id}>

                        {item.label}
                      </div>
                    }

                    inputProps={
                      {disabled: this.props.disabled}
                    }

                    value={this.state.value}
                    onChange={
                      (e) => {
                        this.setState({ value: e.target.value })
                        this.loadCityData(e.target.value)
                      }
                    }
                    onSelect={value => {
                      this.setState({ value })
                      this.turnStateDisabled(this.state.cityData[0].guid);
                    }
                    }
                  />
          </div>
        );
    }
}
