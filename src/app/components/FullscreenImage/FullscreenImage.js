import React from 'react';
import './FullscreenImage.css'
import Left from '../../assets/images/left.png'
import Right from '../../assets/images/right.png'
import Close from '../../assets/images/Close.svg'

const FullscreenImage = ({src, leftClick, rightClick, closeClick}) => {


    return (
        <div className={`fullscreen-image fullscreen`}>
            <div onClick={closeClick} className="close_icon_block">
                <img src={Close} alt="Left" className="close_icon"/>
            </div>
            <div onClick={leftClick} className="left_arrow_block">
                <img src={Left} alt="Left" className="left_arrow"/>
            </div>

            <img src={src} alt="Image" className="gen_pic"/>
            <div onClick={rightClick} className="right_arrow_block">
                <img src={Right} alt="Right" className="right_arrow"/>
            </div>
        </div>
    );
};

export default FullscreenImage;
