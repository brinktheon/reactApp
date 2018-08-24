import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export default class Street extends Component{
    constructor(props){
        super(props)
        this.state = {
          streetData: [],
          aolvl: '7/',
          value: '',
        }
        this.loadStreetData = this.loadStreetData.bind(this);
        this.turnStateDisabled = this.turnStateDisabled.bind(this);
    }

    turnStateDisabled(localGuid){
      this.props.callBackFromStreet(false, localGuid);
    }
    loadStreetData(value){
      var finalLink = this.props.link +
                      'subItems/' +
                      this.state.aolvl +
                      this.props.guid +
                      "/" +
                      value +
                      '?page=0&size=50'
      console.log(finalLink)
      axios.get(finalLink)
        .then(res => {
          const someData = res.data;
          var localData = []
          for (var i = 0; i < someData.length; ++i)
          {
            localData.push({label: someData[i].formalname, guid: someData[i].aoguid, id: i});
          }
          this.setState({streetData: localData});
        })
    }

    render(){
        return(
          <div>
          <Autocomplete
              items = {this.state.streetData}
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
                  this.loadStreetData(e.target.value)
                }
              }
              onSelect={value =>
              {
                this.setState({ value })
                this.turnStateDisabled(this.state.streetData[0].guid);
              }
            }
            />
          </div>
        );
    }
}
