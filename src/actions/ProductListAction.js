import productListConstant from '../constants/ProductListConstant';
import { dispatchAsync } from '../ReduxDispatcher';
import ProductListApi from "../api/ProductListApi";

const fetchProductListAction = (model) => dispatch => {
    dispatchAsync(ProductListApi.fetchProductListAction(model), dispatch, {
        request: productListConstant.PRODUCT_LIST,
        success: productListConstant.PRODUCT_LIST_SUCCESS,
        failure: productListConstant.PRODUCT_LIST_ERROR,
        cancel: productListConstant.PRODUCT_LIST_CANCEL
    });
};
const fetchAddToCart = (data) => dispatch => {
    dispatch({
        type: productListConstant.ADD_TO_CART_SUCCESS,
        payload: data
    });
};

export { fetchProductListAction,fetchAddToCart};
