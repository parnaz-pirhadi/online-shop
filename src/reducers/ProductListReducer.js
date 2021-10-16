import productListConstant from '../constants/ProductListConstant';

const initialState = {
    cartProductReducer: [],
    productListReducer: [],
};
const initialAction = {type: 'initial state'};

const productListReducer = (state = initialState, action = initialAction) => {
    switch (action.type) {
        case productListConstant.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productListReducer: action.payload.response.data.data.products,
                pagerReducer: action.payload.response.data.data.pager,
            };

        case productListConstant.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cartProductReducer: action.payload,
            };
        default:
            return state;
    }
};


export default productListReducer;
