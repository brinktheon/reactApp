import axios from 'axios'

export const getStreets = (value, guid) => dispatch => {
  var finalLink = 'http://localhost:8080/items/subItems/7/' +
                   guid +
                   '/' +
                   value +
                  '?page=0&size=100';

  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_STREET_DATA', payload: res.data});
    })
}
