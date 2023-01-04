import Modal from 'components/Modal';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCollaboratorModal } from '../services/collectionModalSlice';

const CollaboratorModal = () => {
    const collaboratorModalOverlay = useSelector((state) => state.collectionModal.collaboratorModal);
    const dispatch = useDispatch()
  return (
    <Modal
            id="collaboratorsModal"
            active={collaboratorModalOverlay}
            closeActive={() => dispatch(closeCollaboratorModal())}>
            <h3 className="text-center my-3">Collaborators</h3>
            
        </Modal>
  )
}

export default CollaboratorModal