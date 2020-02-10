import React, { Fragment, useState } from 'react';
import axios from 'axios';
import '../Styles/imageUpload.css';

const ImageUploader = (props) => {

    const [image, setImage] = useState();
    const [imageName, setImageName] = useState('');
    const [thum, setThum] = useState('');
    const [name, setName] = useState('Choose Image');
    const [uploaded, setUploaded] = useState(false);
    const [uploadMsg, setUploadMsg] = useState(''); 

    const uploadFile = (e) => {

        e.preventDefault();

        const formDataVar = new FormData();
        formDataVar.append('image', image);

        if(!image)
            setUploadMsg('Nothing to Upload');

        else {

            axios.post('/imageUpload', formDataVar, { headers: {'auth-token': localStorage.getItem('token')}})
                .then(res => {

                    console.log(res.data);
                    
                    if(res.data.msg)
                        return props.history.push('/');

                    else if(res.data.imgMsg) {
                        
                        setUploadMsg(res.data.imgMsg);
                        setName('Choose Image');
                    }
                    else {
                        
                        setThum(res.data.thum);
                        setImageName(name);
                        setName('Choose Image');
                        setUploaded(true);
                        setUploadMsg('Image Succesfully uploaded.');
                    }
                }).catch(err => console.log(err));
        }
    };

    const removeThumb = () => {

        setUploaded(false);
        setImage('');
        setUploadMsg('');
    };

    const afunc = () => setUploadMsg('');

    return ( 
        <Fragment style = {{textAlign: 'center'}}>
            <div style = {{marginTop:'0rem'}}>
                {
                    uploadMsg ?
                    <div class="alert alert-info alert-dismissible fade show" role="alert" style = {{textAlign:'center'}}>
                        <strong>{ uploadMsg }</strong>
                        <button type="button" class="close" onClick = { afunc } data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null
                }
            </div>
            <form style = {{ textAlign:'center'}} onSubmit = { uploadFile } >
                <div className = 'custom-file' style = {{width:'50rem', marginBottom:'0rem'}}>
                    <input type= 'file' className = 'custom-file-input' id = 'customFile' 
                        onChange = { e => { setImage(e.target.files[0]); setName(e.target.files[0].name)}}/>
                    <label className = 'custom-file-label' htmlFor= 'customFile'> { name } </label>
                    <input type = 'submit' value = 'Upload' className = 'btn btn-primary btn-block mt-1' style = {{marginBottom:'0rem'}}/>
                </div>
            </form>
            {
                uploaded ?                 
                <div style = {{textAlign:'center', overflowX:'hidden'}}>
                    <div className = 'row mt-5' style = {{overflowX:'hidden',textAlign:'center', marginBottom:'1rem'}}>
                        <div className = 'col-md-6 m-auto'>
                            <h3 className = 'text-center'>{imageName}</h3>
                            <a target = '_blank' href = {thum}>
                                <img className = 'img-fluid img-thumbnail' style = {{ width:'15rem', height:'12rem', overflowX:'hidden', cursor:'pointer', borderRadius:'5px'}} src = {thum} alt = 'Thumbnail' />  
                            </a>
                        </div>
                    </div>
                    <input style = {{textAlign:'center', marginTop:'1rem',overflowX:'hidden'}} type = 'button' onClick = { removeThumb } value = 'Close' className = 'btn btn-primary btn-inline mt-1'/> 
                </div> : null
            }
        </Fragment>
    )
}

export default ImageUploader;
