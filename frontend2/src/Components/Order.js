import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../Actions/orderActions';
import d1 from '../images/d1.jpg';
import StripeCheckout from 'react-stripe-checkout';

function Order(props) {
    const orderDetails = useSelector(state => state.orderDetails);
    const [product,setProduct] =useState({});
    const { loading, order, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        // if (successPay) {
        //   props.history.push("/profile");
        // } else {
          dispatch(detailsOrder(props.match.params.id));
        // }
       
      },[]);
      const makePayement=token=>{
        dispatch(payOrder(order, token));
      }
    return  loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          {/* <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
            </div>
          </div> */}
          <div>
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
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
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
                          Qty: {item.qty}
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


        </div>
        <div className="placeorder-action">
          <ul>
            {/* <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li> */}
            <li>
              <StripeCheckout
              stripeKey="pk_test_51HQk3rAOJSsP9jlMIQOKheq2EMWZZa46J3WRGKirzK147kzzAcc907sn6CQ6JR72xcZb5hTxuC7K0kg3Pcr9WZF500QmCd3IZi"
              token={makePayement}
              name="BUY THE PRODUCT "
              amount={order.totalPrice}
              />
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default Order
