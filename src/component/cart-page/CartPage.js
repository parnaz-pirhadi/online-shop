import React, {useEffect, useState} from 'react';
import Services from "../../methodService/services";


const CartPage = () => {

    const [totalCart, setTotalCart] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("persist:root")) {
            const root = JSON.parse(localStorage.getItem("persist:root"));
            const productListReducer = JSON.parse(root.productListReducer);
            const cartProduct = productListReducer.cartProductReducer;
            setTotalCart(cartProduct)
        }
    }, []);

    return (
        <div className={"cart"}>
            {totalCart.length > 0 && totalCart.map((item, index) => {
                return (
                    <div className="row product-detail" key={index}>
                        <div className="column">
                            <img className={"detail-img"} src={item.images.main} alt={item.title}/>
                        </div>
                        <div className="column">
                            <div className={"title"}>{item.title}</div>
                            <div className="flex-row">
                                <i className={"fa fa-star star-rating"}></i>
                                <div
                                    className={"child rate"}> {Services.formatNumber(item.rating.rate)}
                                    <span className={"rate-count"}>
                                    ({Services.formatNumber(item.rating.count)})
                                    </span>
                                </div>
                            </div>
                            <div className={"price"}>{Services.formatNumber(item.price.rrp_price)}ریال</div>
                        </div>
                    </div>
                )
            })
            }
            {
                totalCart.length === 0 &&
                <div className="row product-detail empty-cart">سبد خرید شما خالیست</div>
            }

        </div>

    )
}

export default CartPage;
