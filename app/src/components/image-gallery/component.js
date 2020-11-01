import React, {useEffect, useState} from "react";
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

const safeInitializeFromProps = (content) => {
    LOG.info("Initializing gallery")
    return content === undefined ? example_gallery : content;
}

const safeInitializeFromLocation = (location) => {
    LOG.info("Initializing gallery")
    if (location.state === undefined || location.state.content === undefined) {
        return example_gallery;
    }
    return location.state.content;
}

const ImageViewer = (content) => {

    const location = useLocation();
    const [images, setImages] = useState(
        content === undefined ? safeInitializeFromProps(content)
            : safeInitializeFromLocation(location));

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer