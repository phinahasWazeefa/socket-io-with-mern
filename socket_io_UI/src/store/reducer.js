import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import generalReducer from './generalReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    generalReducer:generalReducer
});

export default reducer;
