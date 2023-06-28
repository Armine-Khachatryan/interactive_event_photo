import React from 'react';
import DeleteIcon from '../../assets/images/Close.svg';
import './NewUploader.css';
import ImageUploading from 'react-images-uploading';

export function NewUploader(props) {
    const [images, setImages] = React.useState([]);
    // const maxNumber = 69;


    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const removeImage = (i)=> {
        let cloneImages =JSON.parse(JSON.stringify(images));
        cloneImages.splice(i, 1);
        setImages(cloneImages);
    }

    return (
        <>
            <div className="App">
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={4}
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
            <div className={"uploadedImagesWhole"}>
                <div className={"uploadedImages"}>
                    {images?.map((image, index) => (
                        <div key={index} className="image-item">
                            <img className={"uploadedImg"}
                                 src={image['data_url']}
                                 alt="" width="100" />
                            <button className={"removeItem"} onClick={() => removeImage(index)}><img className={"closeBtn"} src={DeleteIcon}/></button>
                            {/*<div className="image-item__btn-wrapper">*/}
                            {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                            {/*<button className={"removeItem"} onClick={() => onImageRemove(index)}><img className={"closeBtn"} src={DeleteIcon}/></button>*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
                {images?.length!==0 &&  <div className={"done"}>Done</div>}
            </div>
        </>

    );
}




