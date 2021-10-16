import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-modal';
import {useHistory} from "react-router-dom";
import Services from "../../methodService/services";

function usePrevious(data) { // custom hook for getting previous value , useRef hook to keep track of references
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = data
    }, [data])
    return ref.current
}

const customStyles = {
    content: {
        width: '25%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const Header = () => {

    const cartProductReducer = useSelector(state => state.productListReducer.cartProductReducer, {}) || {}; //The equivalent of map state to props
    const [totalCart, setTotalCart] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let prevCartProduct = usePrevious(cartProductReducer);
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("persist:root")) {
            const root = JSON.parse(localStorage.getItem("persist:root"));
            const productListReducer = JSON.parse(root.productListReducer);
            const cartProduct = productListReducer.cartProductReducer;
            setTotalCart(cartProduct)
        }

    }, []);

    useEffect(() => {
        if (prevCartProduct && JSON.stringify(prevCartProduct) !== JSON.stringify(cartProductReducer)) {
            setTotalCart(cartProductReducer)
        }
    }, [cartProductReducer]);

    //modal config
    Modal.setAppElement('#root');
    const openModal = () => {
        if (window.location.pathname !== '/cart')
            setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const showAllCart = () => {
        history.push("/cart")
    }
    return (
        <Fragment>
            <nav className="nav-container">
                <div className={"nav nav-item nav-left"}>
                    <div onClick={openModal} className="notification">
                        <span>لیست خرید</span>
                        {totalCart.length > 0 &&
                        <span className="badge">
                            {Services.formatNumber(totalCart.length)}
                        </span>
                        }
                    </div>

                </div>
                <div className={"nav nav-item nav-right"}>
                    {window.location.pathname === "/" ? "لیست محصولات" : window.location.pathname === "/cart" ? "سبد خرید" : "جزییات محصول"}
                </div>

            </nav>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {totalCart.length>0 && totalCart.slice(0, 2).map((item, index) => {
                    return (
                        <div className="row product-detail-modal" key={index}>
                            <div className="column">
                                <img className={"detail-img"} src={item.images.main} alt={item.title}/>
                            </div>
                            <div className="column">
                                <div className={"title"}>{item.title}</div>
                                <div className={"price"}>{Services.formatNumber(item.price.rrp_price)}ریال</div>
                            </div>
                        </div>
                    )
                })}
                {totalCart.length===0 &&
                <div className="empty-cart">سبد خرید شما خالیست</div>
                }
                <div className="flex-row">
                    <div className="child">
                        <div className={"btn-cart-modal"} onClick={showAllCart}>نمایش همه محصولات
                            ({Services.formatNumber(totalCart.length)}کالا)
                        </div>
                    </div>
                </div>
            </Modal>

        </Fragment>

    )
}

export default Header;
