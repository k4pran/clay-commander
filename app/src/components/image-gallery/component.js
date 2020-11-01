import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Logger from "../../logger";

const LOG = new Logger("Gallery");

const example_gallery = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    }
];

const safeInitialize = (content) => {
    LOG.info("Initializing gallery")
    return content === undefined ? example_gallery : content;
}

const ImageViewer = (content) => {

    const location = useLocation();
    const [images, setImages] = useState(
        content === undefined ? safeInitialize(content)
            : location.state);

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer