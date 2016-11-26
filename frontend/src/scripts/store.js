import {createStore} from 'redux'
import reducers from './reducers/main.reducer'

const store = createStore(reducers);

export default store;