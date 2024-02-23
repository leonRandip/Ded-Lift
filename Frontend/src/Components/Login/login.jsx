import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
export default function Login(){
    const navigate=useNavigate();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    axios.defaults.withCredentials=true;

    const handlesignUp=(e)=>{
        e.preventDefault()
        axios
          .post("https://ded-lift.onrender.com/register", {
            name,
            email,
            password,
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
    }
    const handleLogin=(e)=>{
        e.preventDefault()
        axios
          .post("https://ded-lift.onrender.com/login", { email, password })
          .then((res) => {
            const token=res;
            localStorage.setItem("token", token);
            if (res.data.Status === "Success") {
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
    }
   const handleGoogleLoginSuccess = (credentialResponse) => {
     console.log(credentialResponse);

     // Extract user information from the JWT token
     const decodedToken = jwtDecode(credentialResponse?.credential);

     if (decodedToken) {
       const { name, email } = decodedToken;

       // You can now use 'name' and 'email' in your application
       // Update or set the 'token' cookie with the received token
       const token = credentialResponse?.tokenId;
       localStorage.setItem("token", token);

       // You can perform additional actions or navigate to a different page here if needed
        localStorage.setItem("profileData", JSON.stringify({ name, email }));
        navigate("/");
     } else {
       console.log("Unable to fetch user information from Google login");
     }
   };
      const handleGoogleLoginError = () => {
        console.log('Login Failed');
      };
    

        return(
                <div className="lgcontain">
                <div class="wrapper">
                <div class="card-switch">
                    <label class="switch">
                    <input type="checkbox" class="toggle"/>
                    <span class="slider"></span>
                    <span class="card-side"></span>
                    <div class="flip-card__inner">
                        <div class="flip-card__front">
                            <div class="title">Log in</div>
                            <form class="flip-card__form" action="" onSubmit={handleLogin}>
                            <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                             >  
                    
                    </GoogleLogin>
                                <input class="flip-card__input" name="email" placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)}/>
                                <input class="flip-card__input" name="password" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
                                <button class="flip-card__btn">Let`s go!</button>
                            </form>
                        </div>
                        <div class="flip-card__back">
                            <div class="title">Sign up</div>
                            <form class="flip-card__form" action="" onSubmit={handlesignUp}>
                                <input class="flip-card__input" placeholder="Name" type="name" onChange={e=>setName(e.target.value)}/>
                                <input class="flip-card__input" name="email" placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)}/>
                                <input class="flip-card__input" name="password" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
                                <button type="submit" class="flip-card__btn">Confirm!</button>
                            </form>
                        </div>
                    </div>
                    </label>
                </div>   
        </div>
        </div>
        );
}