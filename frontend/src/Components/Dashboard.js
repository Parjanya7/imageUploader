import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/imageUpload.css';
import { withRouter } from 'react-router-dom';
import ImageGallery from './ImageGallery';


const Dashboard = (props) => {

    const [mount, setMount] = useState(false);

    useEffect(() => {

        axios.get('/current', { headers: {'auth-token': localStorage.getItem('token')}})
            .then(res => {
        
                if(!res.data.user) {
        
                    alert('Login first to proceed ahead');
                    props.updateUser(undefined);
                    return props.history.push('/');
                }
                else {
        
                    props.updateUser(res.data.user);
                    setMount(true);
                }
            }).catch(err => {console.log(err)});
    }, []);  
    
    const logOut = () => {

        props.updateUser(undefined);
        localStorage.removeItem('token');
        props.history.push('/');
    };

    const toImageUpload = () => props.history.push('/imageUpload');

    return (
        <div>
            <div id = 'welcomeUser'>    
                <h1 style = {{ marginLeft: '10rem', lineHeight:'100px'}} >
                        Welcome {props.user}
                </h1>
                <h5 style = {{ marginLeft:'40rem'}} id = 'logout' onClick = { toImageUpload } >
                    <u> Uploader </u>
                </h5>
                <h6 id = 'logout' onClick = { logOut } >
                    <u> LogOut </u>
                </h6>   
            </div>
            <div style = {{ marginBottom: '1rem', display: 'inline', textAlign: 'center'}}>
                <h2 className = 'display-4 text-center mb-3'>
                    <u>Images</u>
                </h2>
            </div>  
            <div style = {{ border: '1px solid gray', borderRadius: '5px'}}>
                { mount ? <ImageGallery history = { props.history } /> : null }
            </div>
        </div>
    )
}

export default withRouter(Dashboard);

