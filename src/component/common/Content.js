import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from "../product-List";
import ProductDetail from "../product-detail";
import CartPage from "../cart-page";


const Content = () => (
    <main>
        <Switch>
            <Route exact path="/">
                <ProductList />
            </Route>
            <Route path="/product-detail">
                <ProductDetail />
            </Route>
            <Route path="/cart">
                <CartPage />
            </Route>
        </Switch>
    </main>
);
export default Content;
