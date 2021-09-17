import React, {
  useState
} from 'react';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import UserForm from './userForm';

import { PlusIcon } from  "/imports/other/styles/icons";
import {
  Accounts
} from 'meteor/accounts-base';
import {
  LinkButton
} from '/imports/other/styles/styledComponents';

export default function AddUserContainer( props ) {

  const [ addUserModalOpen, showAddUserModal ] = useState( false );

  const toggleAddUserModal = () => showAddUserModal( !addUserModalOpen );

  const addNewUser = ( name, surname, avatar, active, rights, email, password ) => {
    Accounts.createUser( {
      password,
      email,
      profile: {
        name,
        surname,
        avatar,
        rights,
        active: true,
      }
    } );
    showAddUserModal( false );
  };

  const closeModal = () => {
    showAddUserModal( false );
  }

  return (
    <div style={{borderBottom: "0px"}}>
      <LinkButton onClick={toggleAddUserModal}>
      <img
        className="icon"
        style={{marginRight: "0.6em"}}
        src={PlusIcon}
        alt=""
        />
       User
     </LinkButton>
      <Modal isOpen={addUserModalOpen} toggle={toggleAddUserModal}>
        <ModalBody>
          <UserForm title={"Add user"} onSubmit={addNewUser} onCancel={closeModal}/>
        </ModalBody>
      </Modal>
    </div>
  );
};
