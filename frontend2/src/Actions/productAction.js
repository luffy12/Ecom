// const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } = require("../Constants/productConstants")
import{PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_ERROR,PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,PRODUCT_LIST_REQUEST1, PRODUCT_LIST_SUCCESS1, PRODUCT_LIST_ERROR1} from '../Constants/productConstants'
import axios from 'axios'
const listProduct=(page,searchKeyword,
sortOrder)=>async (dispatch)=>{
  // console.log("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",searchKeyword)
try {
    dispatch({type:PRODUCT_LIST_REQUEST});
const {data}=await axios.get(`/api/products/?page=${page}&limit=6&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`);
// console.log("actionnnnnnnnnnn",data)
dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
} catch (error) {
    dispatch({type:PRODUCT_LIST_ERROR,payload:error.message})
}

}
const listProduct1=()=>async (dispatch)=>{
  try {
      dispatch({type:PRODUCT_LIST_REQUEST1});
  const {data}=await axios.get(`/api/products/get1`);
  // console.log("actionnnnnnnnnnn111111111111",data)
  dispatch({type:PRODUCT_LIST_SUCCESS1,payload:data})
  } catch (error) {
      dispatch({type:PRODUCT_LIST_ERROR1,payload:error.message})
  }
  
  }
const detailsProduct=(productId)=>async (dispatch)=>{
try {
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
    const {data}=await axios.get("/api/products/"+productId);
    dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
} catch (error) {
    dispatch({type:PRODUCT_DETAILS_ERROR,payload:error.message})
}
}
const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!product._id) {
        const { data } = await axios.post('/api/products', product, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(
          '/api/products/' + product._id,
          product,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };
  const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete('/api/products/' + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
  };
export {listProduct,detailsProduct,saveProduct,deleteProduct,listProduct1}