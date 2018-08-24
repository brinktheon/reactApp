import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export default class IntraurbanTerritoryAutoComplete extends Component{
    constructor(props){
        super(props)
        this.state = {
          IntraurbanTerritoryData: [],
          aolvl: '5/',
          value: '',
        }
        this.loadIntraurbanTerritoryData = this.loadIntraurbanTerritoryData.bind(this);
    }

    loadIntraurbanTerritoryData(value){
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
           localData.push({label: someData[i].formalname, id: i});
         }
         this.setState({IntraurbanTerritoryData: localData});
       })
     }

    render(){
        return(
          <div>
               <Autocomplete
                    items = {this.state.IntraurbanTerritoryData}
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
                        this.loadIntraurbanTerritoryData(e.target.value)
                      }
                    }
                    onSelect={value => this.setState({ value })}
                  />
          </div>
        );
    }
}
