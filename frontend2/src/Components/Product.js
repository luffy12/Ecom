import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {detailsProduct} from '../Actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import d1 from '../images/d1.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';
import data from '../data'
function Product(props) {
    const [qty,setQty]=useState(1);
    // const product = data.products.find(x => x._id === props.match.params.id)
    const productDetails=useSelector(state=>state.productDetails);
const{product,loading,error}=productDetails;
 const dispatch = useDispatch();
 useEffect(() => {
     dispatch(detailsProduct(props.match.params.id));
     return () => {
        
     }
 }, []);
 const handleAddToCart=()=>{
     props.history.push("/cart/"+props.match.params.id+"?qty="+qty);
 }
    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
           { loading ? (
           <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"80vh",alignItems:"center"}}>
           <CircularProgress/>
                      </div>
          ) : error ? (
            <div>{error}</div>
          ):
            <div className="details">
                <div className="details-image">
                    <img src={d1} alt="product"></img>
                </div>


                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            <a href="#reviews">
                                {product.rating}
                                {/* <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    /> */}
                            </a>
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Description:
                  <div>{product.description}</div>
                        </li>
                    </ul>
                </div>
                <div className="details-actions">
                    <ul>
                        <li>Price: {product.price}</li>
                        <li>status: {product.status}</li>
                        <li>
                            Qty:<select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option value={x+1} key={x+1}>
                                        {x+1}
                                    </option>
                                    )}
                            </select>
                        </li>
                        <li>
                 {product.countInStock>0?<button
                      onClick={handleAddToCart}
                      className="button primary full-width"
                    >
                      Add to Cart
                    </button>:"Out of Stock"}
                    
                  
                </li>
                    </ul>
                </div>
            </div>}

        </div>
    )
}

export default Product
