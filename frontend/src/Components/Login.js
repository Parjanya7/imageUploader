import React, { useState } from 'react';
import '../Styles/login.css';
import '../Styles/Button.css';
import {
    Link,
    useHistory
  } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {

    const history = useHistory();

    const [ userVal, setUserVal ] = useState(props.user);
    const [ passVal, setPassVal ] = useState('');   
    
    const someFunc = (e) => { 

        e.preventDefault();
        
        axios.post('/login', { username: userVal, password: passVal })
            .then(res => {

                console.log(res.data);
                if(res.data.username)
                    alert(res.data.username);

                if(res.data.password)
                    alert(res.data.password);
               
                if(res.data.msg)
                    alert(res.data.msg);   
               
                if(res.data.user) {

                    alert(`'Welcome' ${res.data.user}`);    
                    props.updateUser(res.data.user);
                    localStorage.setItem('token', res.data.token);
                    history.push('/imageUpload');
                }
                else
                    history.push('/');
            }); 
    };

    return (

        <div className='containerLogin'>
            <h1 className='login'> Login </h1>

            <form>

                <input className='input' 
                type = "text" 
                name = "username" 
                value = { userVal } 
                placeholder = "Username" 
                autoFocus
                id = 'UserName'
                    onChange = { e => { setUserVal( e.target.value ) } }
                />

                <br/>

                <input className='input' type = "password" name = "password" value = { passVal } placeholder = "Password" 
                    onChange = { e => { setPassVal( e.target.value ) } }
                />
                <p className="forgotPassword" style = {{cursor: 'pointer'}}> Forgot Password ? </p> 
                <br/>
                <div style = {{textAlign:'right'}}>
                    <button className='Button' type = "submit" onClick = {someFunc} > Login </button>
                </div>

            </form>

           <div id = "linkToSignUp">
                <p> Don't have an Account ?</p> <Link to = "/" id = "link"> SignUp </Link>
            </div>
        </div>
    )
}

export default Login;
