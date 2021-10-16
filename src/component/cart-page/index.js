import React,{Fragment} from "react";
import CartPage from "./CartPage";
import Header from "../common/Header"

function action (params) {
    return (
        <Fragment>
            <Header {...params}/>
            <CartPage {...params}/>
        </Fragment>


    );
}

export default action;
