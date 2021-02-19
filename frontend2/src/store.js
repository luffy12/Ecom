import {createStore,combineReducers, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productListReducer1, } from './Reducers/productReducer';
import {  cartReducer, } from './Reducers/cartReducer';
import { userSigninReducer, userRegisterReducer } from './Reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './Reducers/orderReducer';
const cartItems=Cookie.getJSON("cartItems")||[];
const userInfo=Cookie.getJSON("userInfo")||null;
const initialState={cart:{cartItems,shipping: {}, payment: {}},userSignin:{userInfo}};
const reducer=combineReducers({
    productList:productListReducer,
    productList1:productListReducer1,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,

})
const store=createStore(reducer,initialState,compose(applyMiddleware(thunk)));
export default store