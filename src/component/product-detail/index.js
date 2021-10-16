import React,{Fragment} from "react";
import ProductDetail from "./ProductDetail";
import Header from "../common/Header"

function action (params) {
    return (
        <Fragment>
            <Header {...params}/>
            <ProductDetail {...params}/>
        </Fragment>


    );
}

export default action;
