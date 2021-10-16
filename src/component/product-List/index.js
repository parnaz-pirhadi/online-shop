import React, {Fragment} from "react";
import ProductList from "./ProductList";
import Header from "../common/Header"

function action(params) {
    return (
        <Fragment>
            <Header {...params}/>
            <ProductList {...params}/>

        </Fragment>

    );
}

export default action;
