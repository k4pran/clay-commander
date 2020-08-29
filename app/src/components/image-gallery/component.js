import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Context} from "../../store";
import axios from "axios";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    }
];

const safeInitialize = (state) => {
    if (state === undefined) {
        return getGallery();
    }
    return state.imageData === undefined ? getGallery() : state.imageData;
}


const getGallery = () => {
    axios.get('/state/gallery')
        .then(res => {
            console.log(res);
            return images;
        })
        .catch(err => {
            console.log(err);
            // todo
            return images;
        });
}


const ImageViewer = () => {

    const location = useLocation();
    const [, dispatch] = useContext(Context);

    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/state/gallery')
            .then(res => {
                console.log("init images"); // todo logger
                setImages(res.data.content.state);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'gallery'});
    }, [dispatch]);

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer