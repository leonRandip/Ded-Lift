import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';
export default function Login(){
    const navigate=useNavigate();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [cookies, setCookie] = useCookies(['token']); 
    axios.defaults.withCredentials=true;

    const handlesignUp=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name, email, password})
        .then(res=>{
            window.location.reload()

        }).catch(err=>console.log(err))
    }
    const handleLogin=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email, password})
        .then(res=>{
            if(res.data.Status==="Success"){
                navigate("/") 
            }
            

        }).catch(err=>console.log(err))
    }
    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log(credentialResponse);
    
        // Extract the token from the response (customize this based on the actual structure of the response)
        const token = credentialResponse?.tokens?.id_token;
    
        // Update or set the 'token' cookie with the received token
        setCookie('token', token, { path: '/' });
    
        navigate('/');
        // You can perform additional actions or navigate to a different page here if needed
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
                    <button class="oauthButton">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        <path d="M1 1h22v22H1z" fill="none"></path>
                    </svg>
                    Continue with Google
                    </button>
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