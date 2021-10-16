import productDetailConstant from '../constants/ProductDetailConstant';
import { dispatchAsync } from '../ReduxDispatcher';
import ProductDetailApi from "../api/ProductDetailApi";

const fetchProductDetailAction = (productId) => dispatch => {
    dispatchAsync(ProductDetailApi.fetchProductDetail(productId), dispatch, {
        request: productDetailConstant.PRODUCT_DETAIL,
        success: productDetailConstant.PRODUCT_DETAIL_SUCCESS,
        failure: productDetailConstant.PRODUCT_DETAIL_ERROR,
        cancel: productDetailConstant.PRODUCT_DETAIL_CANCEL
    });
};

export { fetchProductDetailAction};
