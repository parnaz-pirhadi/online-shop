import { combineReducers } from 'redux';

import productListReducer from "./ProductListReducer";
import productDetailReducer from "./ProductDetailReducer";


const rootReducer  = combineReducers({productListReducer,productDetailReducer});

export default rootReducer ;
