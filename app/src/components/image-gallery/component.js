import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Context} from "../../store";

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const safeInitialize = (state) => {
    if (state === undefined) {
        return images;
    }
    return state.imageData === undefined ? images : state.imageData;
}


const ImageViewer = () => {

    const location = useLocation();
    const [, dispatch] = useContext(Context);

    const [images,] = useState(safeInitialize(location.state));

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'gallery'});
    }, [dispatch]);

    return (
        <ImageGallery items={images}/>
    )
};
export default ImageViewer