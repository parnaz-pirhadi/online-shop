import React, {useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProductDetailAction} from '../../actions/ProductDetailAction';
import {useLocation} from "react-router-dom";
import {fetchAddToCart} from "../../actions/ProductListAction";
import Services from "../../methodService/services";

function usePrevious(data) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = data
    }, [data])
    return ref.current
}

const ProductDetail = () => {
    const dispatch = useDispatch();
    const productDetailReducer = useSelector(state => state.productDetailReducer.productDetailReducer);
    const loading = useSelector(state => state.productDetailReducer.loading);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const [productDetail, setProductDetail] = useState([]);
    let prevProductDetail = usePrevious(productDetail)

    useEffect(() => {
        if(prevProductDetail && JSON.stringify(prevProductDetail) !== JSON.stringify(productDetailReducer)){
            setProductDetail(productDetailReducer)
        }
    }, [productDetailReducer])

    useEffect(() => {
        detailFunc();
    }, []);

    const detailFunc = () => {
        dispatch(fetchProductDetailAction(id));
    }

    const addToCart = (item) => {
        const root = JSON.parse(localStorage.getItem("persist:root"));
        const productListReducer = JSON.parse(root.productListReducer);
        const cartProduct = productListReducer.cartProductReducer;
        cartProduct.push(item)
        dispatch(fetchAddToCart(cartProduct));
    }

    return (

        <div className="row product-detail">
            {Object.keys(productDetail).length !== 0 &&
            <Fragment>
                <div className="column">
                    <img className={"detail-img"} src={productDetail.images.main} alt={productDetail.title}/>
                </div>
                <div className="column">
                    <div className={"title"}>{productDetail.title}</div>
                    <div className="flex-row item-detail">
                        <i className={"fa fa-star star-rating"}></i>
                        <div
                            className={"child rate"}> {Services.formatNumber(productDetail.rating.rate)}
                            <span className={"rate-count"}>
                                    ({Services.formatNumber(productDetail.rating.count)})
                                    </span>
                        </div>
                    </div>
                    <div className={"price"}>
                        {Services.formatNumber(productDetail.price.rrp_price)} ریال
                    </div>
                    <div className={"btn-cart-detail"} onClick={() => addToCart(productDetail)}>افزودن به سبد
                        خرید
                    </div>
                </div>
            </Fragment>
            }
                {loading&&
                <span className={"loading"}>در حال بارگزاری...</span>
                }
        </div>
    )
}

export default ProductDetail;
