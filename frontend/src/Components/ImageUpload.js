import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/imageUpload.css';
import { withRouter } from 'react-router-dom';
import ImageUploader from './ImageUploader';

export class ImageUpload extends Component {
  
    constructor(props) {

        super(props);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        
        axios.get('/current', { headers: {'auth-token': localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data);

            if(!res.data.user) {
                 
                alert('Login first to proceed ahead');
                this.props.updateUser(undefined);
                return this.props.history.push('/');
            }
            else
                this.props.updateUser(res.data.user);
        });
    };

    logOut = () => {

        this.props.updateUser(undefined);
        localStorage.removeItem('token');
        this.props.history.push('/');
    };

    toDashboard = () => this.props.history.push('/dashboard');

    render() {
        return (
            <div>
                <div id = 'welcomeUser'>    
                    <h1 style = {{ marginLeft: '10rem', lineHeight:'100px'}}>Welcome {this.props.user}</h1>
                    <h5 style = {{ marginLeft:'40rem'}} id = 'logout' onClick = { this.toDashboard } ><u>Dashboard</u></h5>
                    <h6 id = 'logout' onClick = { this.logOut } ><u> LogOut </u></h6>   
                </div>
                <div style = {{ textAlign:'center', marginTop:'1rem', marginBottom:'0rem'}}>
                    <h4 className = 'display-4 text-center mb-3' >    
                        Upload Image
                    </h4>
                </div>  
                <ImageUploader history = { this.props.history } />
            </div>
        )
    }
}

export default withRouter(ImageUpload);

