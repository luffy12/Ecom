import React,{useEffect} from 'react'
import { addToCart,removeFromCart} from '../Actions/cartActions';
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import d1 from '../images/d1.jpg'
 
function Cart(props) {

    const productId=props.match.params.id;
    const qty=props.location.search?Number(props.location.search.split("=")[1]):"";
    // console.log("qtycdsad",props.location.search.split("="))
    const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
//   console.log("dataaaaaaaaaaaaaaaaa",cartItems);
  const removeFromCartHandler = (productId) => {
        // console.log("dataaaaaaaaaaaaaaaaa",productId);
    dispatch(removeFromCart(productId));
  }
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
        return () => {
            
        }
    }, []);
 const  checkOutHandler=()=>{
        props.history.push("/signin?redirect=shipping");
    }
    return (
        <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
      <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li key={item.product}>
                <div className="cart-image">
                  <img src={d1} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                    </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
          </ul>
          </div>
          <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button className="button primary full-width" disabled={cartItems.length === 0} onClick={checkOutHandler}>
        Proceed to Checkout
      </button>

    </div>
          </div>
    )
}

export default Cart
