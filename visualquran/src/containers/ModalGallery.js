import React from 'react'
import Modal from '../components/UI/Modal/Modal'
import Gallery from '../components/Gallery/Gallery'

const ModalGallery = (props) => {
    return (
        <div>
             <Modal><Gallery changeBackground={props.changeBackground} ></Gallery></Modal>
        </div>
    )
}

export default ModalGallery
