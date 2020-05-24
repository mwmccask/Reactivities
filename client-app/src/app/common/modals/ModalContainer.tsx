import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {closeModal, modal: {body, open}} = rootStore.modalStore;

    return (
        <Modal
            onClose={closeModal}
            open={open}
            size='mini'
        >
            <Modal.Content>{body}</Modal.Content>
        </Modal>
    );
};

export default observer(ModalContainer);
