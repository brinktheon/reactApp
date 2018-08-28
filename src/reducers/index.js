import {combineReducers} from 'redux'

import regions from './Regions'
import areas from './Areas'
import cities from './Cities'
import localities from './Localities'
import streets from './Streets'
import intraurbanTerritories from './IntraurbanTerritories'

export default combineReducers({
  regions,
  areas,
  cities,
  localities,
  streets,
  intraurbanTerritories
})
