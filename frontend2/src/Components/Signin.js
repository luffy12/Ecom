import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../Actions/userActions';
import FacebookLogin from "react-facebook-login";

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
        return () => {
          //
        };
      }, [userInfo]);
    const  responseFacebook = response => {

        console.log(response);
    // dispatch(socialsignin())
        // this.setState({
        //   isLoggedIn: true,
        //   userID: response.userID,
        //   name: response.name,
        //   email: response.email,
        //   picture: response.picture.data.url
        // });
      };
    
   const componentClicked = () => console.log("clicked");
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit")
        dispatch(signin(email, password));
    
      }
    return (
        <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary full-width">Signin</button>
        </li>
        <li>
        <FacebookLogin
          appId="1023455441457766"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
        </li>
        <li>
          New to here?
        </li>
        <li>
        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your  account</Link>
        </li>
      </ul>
    </form>
  </div>
    )
}

export default Signin
