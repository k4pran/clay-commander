import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Context} from "../../store";

const ImageViewer = () => {

    const location = useLocation();
    const [state, dispatch] = useContext(Context);

    const [images, setImages] = useState(location.state.imageData);

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'gallery'});
    }, []);

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer