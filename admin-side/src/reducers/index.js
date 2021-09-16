import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";
import assementReducer from './assesment.reducer';
import userAssemntReducer from './userAssements.reducer';

//  we have multiple reducer so we can 
// redux only return newState only
const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    assement: assementReducer,
    userAssement : userAssemntReducer
})
export default rootReducer