import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export default class CityAutoComplete extends Component{
    constructor(props){
        super(props)
        this.state = {
          localityData: [],
          aolvl: '6/',
          value: '',
        }
        this.loadLocalityData = this.loadLocalityData.bind(this);
        this.turnStateDisabled = this.turnStateDisabled.bind(this);
    }

    turnStateDisabled(localGuid){
      this.props.callBackFromLocality(false, localGuid);
    }

    loadLocalityData(value){
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
         this.setState({localityData: localData});
       })
     }

    render(){
        return(
          <div>
               <Autocomplete
                    items = {this.state.localityData}
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
                        this.loadLocalityData(e.target.value)
                      }
                    }
                    onSelect={value =>
                    {
                      this.setState({ value })
                      this.turnStateDisabled(this.state.localityData[0].guid);
                    }
                    }
                  />
          </div>
        );
    }
}
