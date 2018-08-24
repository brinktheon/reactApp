import React, {Component} from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export default class AreaAutoComplete extends Component{
    constructor(props){
        super(props)
        this.state = {
          areaData: [],
          aolvl: '3/',
          value: '',
        }
        this.loadAreaData = this.loadAreaData.bind(this);
        this.turnStateDisabled = this.turnStateDisabled.bind(this);
    }

    turnStateDisabled(localGuid){
      this.props.callBackFromArea(false, localGuid);
    }

    loadAreaData(value){
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
         this.setState({areaData: localData});
       })
     }

    render(){
        return(
          <div>
               <Autocomplete
                    items = {this.state.areaData}
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
                        this.loadAreaData(e.target.value)
                      }
                    }
                    onSelect={
                      value => {
                        this.setState({ value })
                        this.turnStateDisabled(this.state.areaData[0].guid);
                      }
                    }
                  />
          </div>
        );
    }
}
