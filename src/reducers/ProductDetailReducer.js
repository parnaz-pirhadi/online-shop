import productDetailConstant from '../constants/ProductDetailConstant';

const initialState = {
    loading: true
};
const initialAction = { type: 'initial state' };

const ProductDetailReducer = (state = initialState, action = initialAction) => {
    switch (action.type) {
        case productDetailConstant.PRODUCT_DETAIL:
            return {
                ...state,
                loading: true,
            };
        case productDetailConstant.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetailReducer: action.payload.response.data.data.product,
                loading:false
            };
        default:
            return state;
    }
};

export default ProductDetailReducer;
