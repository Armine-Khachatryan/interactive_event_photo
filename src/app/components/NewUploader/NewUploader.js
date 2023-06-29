import React from 'react';
import DeleteIcon from '../../assets/images/Close.svg';
import './NewUploader.css';
import ImageUploading from 'react-images-uploading';
import axios from "axios";
import config from "../../config";

export function NewUploader(props) {
    const [images, setImages] = React.useState([]);
    // const maxNumber = 69;


    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        props.setUpImages(imageList)
    };

    // const removeImage = (i)=> {
    //     let cloneImages =JSON.parse(JSON.stringify(images));
    //     cloneImages.splice(i, 1);
    //     setImages(cloneImages);
    // }



    return (
        <>
            <div className="App">
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={+props?.maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                      }) => (
                        // write your building UI
                        <>
                            <div className="upload__image-wrapper">
                                <button
                                    className="rightButton"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Upload
                                </button>
                                {/*&nbsp;*/}
                            </div>
                        </>
                    )}

                    {/*</div>*/}
                    {/*<button className="removeBtn" onClick={onImageRemoveAll}>Remove all images</button>*/}
                </ImageUploading>
            </div>
        </>
    );
}




