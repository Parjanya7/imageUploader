import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';

const ImageGallery = (props) => {

    const [photos, setPhotos] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {

        getImages();
    }, []);

    const getImages = async() => {
        
        try {

            const res = await axios.get('/getImages', { headers: {'auth-token': localStorage.getItem('token')}});
        
            if(res.data.msg)
                props.history.push('/');

            else if(res.data.length !== 0) {
        
                photos.length = 0;
                let temp = [];
    
                for(let i = 0; i < res.data.length; i++) 
                    temp[i] = { src: res.data[i], width: 6, height: 6 };
    
                setPhotos(photos.concat(temp));
                setLoader(false);
            }
            else if(res.data.imgMsg)
                alert(res.data.imgMsg, 'Please Upload first.');
            else {
                alert('Could not get data from the server.');
            }    
        } 
        catch(err) {
            console.log(err);
        } 
    };

    return (
        <div>
            {
                loader ? 
                <div style = {{ textAlign: 'center'}}>
                    <div className = 'spinner-grow text-primary' role = 'status'>
                        <span className = 'sr-only'>Loading...</span>
                    </div>
                    <div className = 'spinner-grow text-secondary' role = 'status'>
                        <span className = 'sr-only'>Loading...</span>
                    </div>
                    <div className = 'spinner-grow text-success' role = 'status'>
                        <span className = 'sr-only'>Loading...</span>
                    </div>
                    <div className = 'spinner-grow text-danger' role = 'status'>
                        <span className = 'sr-only'>Loading...</span>
                    </div>
                </div> : null
            }

            {
                photos ? <Gallery photos = { photos } /> : null
            }
        </div>
    )
}

export default ImageGallery;
