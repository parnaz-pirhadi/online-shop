import axios from 'axios';
import baseConstant from '../constants/baseConstant';
import { authHeader } from '../methodService/auth-header';

let ProductListApi = {
    fetchProductListAction (model) {
        return get(`${baseConstant.API_URL}/search/?${model}`, { headers: authHeader() });
    },
    makeRequestCreator () {
        let call;
        return (url) => {
            if (call) {
                call.cancel();
            }
            call = axios.CancelToken.source();
            return axios.get(url, { cancelToken: call.token, headers: authHeader() });
        };
    },
};

let get = ProductListApi.makeRequestCreator();
export default ProductListApi;
