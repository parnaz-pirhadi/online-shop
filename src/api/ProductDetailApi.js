import axios from 'axios';
import baseConstant from '../constants/baseConstant';
import { authHeader } from '../methodService/auth-header';

let ProductDetailApi = {
    fetchProductDetail (productId) {
        return axios.get(`${baseConstant.API_URL}/product/${productId}/`, { headers: authHeader() });
    },
};

export default ProductDetailApi;
