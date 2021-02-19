import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
   
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1
    }
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    // justifyContent: "space-evenly"
    justifyContent:"flex-end"
  },
  
}));


const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userSignin=useSelector(state=>state.userSignin);
  const userInfo=userSignin.userInfo;
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "Contact",
      pageURL: "/contact"
    },
    {
      menuTitle: "About",
      pageURL: "/about"
    }
  ];
  // console.log('data in header',userInfo)
  return (
   
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor:"cadetblue"}} >
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={()=>{props.history.push('/')}}>
        V-Shopping
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {/* {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })} */}
                {userInfo? <MenuItem>
                {userInfo.name}
                </MenuItem> :
                 <MenuItem>
                SignIn
                 </MenuItem>
                }
               
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
             <div className="header-links ">
             {/* {userInfo ? (
              <Link to="/cart/:id?">Cart</Link>
            ) : ( */}
              <Link to={userInfo?"/cart/:id?":"/cart/:id?"}>  <IconButton aria-label="cart">
     <Badge color="secondary" badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton></Link>
         
            
             {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
             </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default withRouter(Header);
