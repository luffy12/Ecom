import Toolbar from '@material-ui/core/Toolbar';
import React from "react";
import "./styles.css";
import Header from "./Components/Header";
import { Route, Switch,BrowserRouter } from "react-router-dom";
import Home from './Components/Home';
import Product from './Components/Product';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Cart from './Components/Cart';
import { makeStyles } from "@material-ui/core/styles";
import Signin from "./Components/Signin";
import { useSelector } from "react-redux";
import Register from "./Components/Register";
import Products from "./Components/Products";
import Payment from "./Components/Payment";
import Shipping from './Components/Shipping';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import PlaceOrder from './Components/PlaceOrder';
import Order from './Components/Order'
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
export default function App(props) {
  const userSignIn=useSelector(state=>state.userSignIn);
  const userInfo=userSignIn;
   
  const classes = useStyles();
  return (
    <BrowserRouter>
    
    <div className={classes.container}>
      <Header />
      <div id="back-to-top-anchor" />
      
      <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/:id" component={Product}/>
            <Route path="/products" component={Products} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route exact path="/cart/:id?" component={Cart}/>
            <Route exact path="/Signin" component={Signin}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/placeorder" component={PlaceOrder}/>
            <Route path="/order/:id" component={Order} />

           
          </Switch>
          
          <ScrollTop {...props}>
        <Fab style={{backgroundColor:"cadetblue"}} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </div>
    </BrowserRouter>
  );
}
