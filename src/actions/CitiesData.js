import axios from 'axios'

export const getCities = (value, guid) => dispatch => {
  var finalLink = 'http://localhost:8080/items/subItems/4/' +
                   guid +
                   '/' +
                   value +
                  '?page=0&size=100';

  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_CITIES_DATA', payload: res.data});
    })
}
