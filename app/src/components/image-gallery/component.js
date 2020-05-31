import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageViewer = () => {

    const location = useLocation();
    const [images, setImages] = useState(location.state.imageData);

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer