import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    //เก็บ user ที่ login เข้ามา
    user : userReducer,
})

export default rootReducer;