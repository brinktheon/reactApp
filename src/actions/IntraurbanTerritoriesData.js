import axios from 'axios'

export const getIntraurbanTerritories = (value, guid) => dispatch => {
  var finalLink = 'http://localhost:8080/items/subItems/5/' +
                   guid +
                   '/' +
                   value +
                  '?page=0&size=100';

  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_INTRAURBANTERRITORY_DATA', payload: res.data});
    })
}
