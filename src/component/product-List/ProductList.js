import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProductListAction, fetchAddToCart} from '../../actions/ProductListAction';
import InfiniteScroll from 'react-infinite-scroll-component';
import Services from "../../methodService/services";


function usePrevious(data) { // custom hook for getting previous value , useRef hook to keep track of references
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = data
    }, [data])
    return ref.current
}

const ProductList = () => {
    const dispatch = useDispatch();

    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalpage] = useState();
    const [searchValue, setSearchValue] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFilter, setIsFilter] = useState(false);

    const [sort, setSort] = useState(22);
    const sortList = [
        {name: "پر بازدید ترین", value: 4},
        {name: "مرتبط ترین", value: 22},
        {name: "پیشنهاد مشتریان", value: 27},
    ]

    const productListReducer = useSelector(state => state.productListReducer.productListReducer); //The equivalent of map state to props
    const pagerReducer = useSelector(state => state.productListReducer.pagerReducer);

    let prevProductList = usePrevious(productList)


    useEffect(() => {
        if (!isFilter) {
            if (prevProductList && JSON.stringify(prevProductList) !== JSON.stringify(productListReducer)) {
                setProductList([...prevProductList, ...productListReducer])
                setTotalpage(pagerReducer.total_pages)
            }
        } else {
            setProductList(productListReducer)
            setIsFilter(false)
        }

    }, [productListReducer])


    useEffect(() => {
        productListFunc();
    }, [page, searchValue, sort]);

    const productListFunc = () => {
        let searchModel = {};
        searchModel.page = page;
        searchModel.q = searchValue;
        searchModel.sort = sort;
        dispatch(fetchProductListAction(Object.keys(searchModel).filter(key => searchModel[key] != null)
            .map(key => `${key}=${encodeURIComponent(searchModel[key])}`).join("&")));
    }

    const fetchMoreData = () => {
        if (productList.length) {
            if (page < totalPage) {
                setPage(page + 1);
                setIsFilter(false)
            }
            if (page === totalPage) {
                setHasMore(false);
            }
        }
    }
    const addToCart = (item) => {
        //
        // let arr = [1,5,6,1,0,1];
        // const findSumPairs = (arr, value) => {
        //     let sumsLookup = {};
        //     let output = [];
        //
        //     for(let i = 0; i < arr.length; i++) {
        //         let targetVal = value - arr[i];
        //
        //         if(sumsLookup[targetVal]) {
        //             output.push([arr[i], targetVal]);
        //         }
        //
        //         sumsLookup[arr[i]] = true;
        //     }
        //
        //     return output;
        // }
        // console.log(findSumPairs(arr, 6));

        const root = JSON.parse(localStorage.getItem("persist:root"));
        const productListReducer = JSON.parse(root.productListReducer);
        const cartProduct = productListReducer.cartProductReducer;
        cartProduct.push(item)
        dispatch(fetchAddToCart(cartProduct));
    }

    const showDetail = (id) => {
        window.open(`product-detail?id=${id}`)
    }

    const searchProduct = (e) => {
        setPage(1);
        setSearchValue(e.target.value)
        setIsFilter(true)
    }
    const sortFunction = (item) => {
        setIsFilter(true)
        setSort(item.value)
    }

    return (
        <Fragment>
            <div className="search-container">
                <div className={"filter-container"}>
                    {sortList.map((item, index) => {
                        return (
                            <div key={index} onClick={() => sortFunction(item)}
                                 className={item.value === sort ? "filter active-filter" : "filter"}>{item.name}</div>
                        )
                    })}
                </div>
                <div className="search">
                    <input type="text" className="searchInput" placeholder="جستجو..."
                           onChange={searchProduct}/>
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <InfiniteScroll
                dataLength={productList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<span className={'loading'}>بارگزاری لیست...</span>}
            >
                <div className={"listing-section"}>
                    {!isFilter && productList.length > 0 && productList.map((item, index) => (
                        <div className={"product"} key={index}>
                            <div className={"img"} onClick={() => showDetail(item.id)}><img alt={item.title}
                                src={item.images.main}/>
                            </div>
                            <span className={"title"}>{item.title}</span>

                            <div className="flex-row">
                                <i className={"fa fa-star star-rating"}></i>
                                <div
                                    className={"child rate"}> {Services.formatNumber(item.rating.rate)}
                                    <span className={"rate-count"}>
                                    ({Services.formatNumber(item.rating.count)})
                                    </span>
                                </div>
                                <div className="child">
                                    <span className={"status"}>{item.status}</span>
                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="child price">
                                    {Services.formatNumber(item.price.rrp_price)} ریال
                                </div>
                                <div className="child">
                                    <div onClick={() => addToCart(item)} className={"btn-cart"}>+
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </Fragment>
    )
}

export default ProductList;
