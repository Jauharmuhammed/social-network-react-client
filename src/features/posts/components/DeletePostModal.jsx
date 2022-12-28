import Modal from 'components/Modal'
import React from 'react'

const DeletePostModal = ({postDelete, setPostDelete}) => {
  return (
    <Modal id='deletePostModal' active={postDelete} closeActive={()=> setPostDelete(false)}>
        
    </Modal>
  )
}

export default DeletePostModal