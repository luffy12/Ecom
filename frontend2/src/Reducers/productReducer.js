import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_ERROR, PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,PRODUCT_LIST_REQUEST1, PRODUCT_LIST_SUCCESS1, PRODUCT_LIST_ERROR1 } from "../Constants/productConstants";

function productListReducer(state={products:[]},action){
switch (action.type){
case PRODUCT_LIST_REQUEST:
 return {loading:true};

case PRODUCT_LIST_SUCCESS:
    return{
      
loading:false,products:action.payload,hasNextPage:action.payload.hasOwnProperty('next')
    }
    case PRODUCT_LIST_ERROR:
    return{
loading:false,error:action.payload
    }
    default:
        return state
}
}
function productListReducer1(state={products:[]},action){
  switch (action.type){
  case PRODUCT_LIST_REQUEST1:
   return {loading:true};
  
  case PRODUCT_LIST_SUCCESS1:
      return{
        
  loading:false,products:action.payload,
      }
      case PRODUCT_LIST_ERROR1:
      return{
  loading:false,error:action.payload
      }
      default:
          return state
  }
  }
function productDetailsReducer(state={product:[]},action){
    switch (action.type){
    case PRODUCT_DETAILS_REQUEST:
     return {loading:true};
    
    case PRODUCT_DETAILS_SUCCESS:
        return{
    loading:false,product:action.payload
        }
        case PRODUCT_DETAILS_ERROR:
        return{
    loading:false,error:action.payload
        }
        default:
            return state
    }
    }
function productSaveReducer(state = { product: {} }, action) {
        switch (action.type) {
          case PRODUCT_SAVE_REQUEST:
            return { loading: true };
          case PRODUCT_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
          case PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      }

function productDeleteReducer(state = { product: {} }, action) {
        switch (action.type) {
          case PRODUCT_DELETE_REQUEST:
            return { loading: true };
          case PRODUCT_DELETE_SUCCESS:
            return { loading: false, product: action.payload, success: true };
          case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      }
export{productListReducer,productDetailsReducer,productSaveReducer,productDeleteReducer,productListReducer1}