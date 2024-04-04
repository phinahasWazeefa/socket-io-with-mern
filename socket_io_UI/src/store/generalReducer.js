// project imports
import config from '../config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  count:0
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const generalReducer = (state = initialState, action) => {
   
    switch (action.type) {
            
        case actionTypes.SET_NOTIFICATION_COUNT:
            return {
                ...state,
               count:action.count,
            };
        default:
            return state;
    }
};

export default generalReducer;
