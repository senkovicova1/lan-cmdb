import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import {
  useTracker
} from 'meteor/react-meteor-data';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import { DeleteIcon, PencilIcon } from  "/imports/other/styles/icons";

import AddUser from './addUserContainer';
import EditUser from './editUserContainer';

import {
  List,
  Input,
  LinkButton
} from "/imports/other/styles/styledComponents";

export default function UserList( props ) {

  const users = useSelector((state) => state.users.value);
    const currentUser = useTracker( () => Meteor.user() );

  const [ editUserModalOpen, showEditUserModal ] = useState( false );
  const [ chosenUser, setChosenUser ] = useState( null );

  const userCanManageUsers = currentUser && currentUser.profile.rights && currentUser.profile.rights.manageUsers;

  return (
    <List>
      <h2 style={{ marginTop: "0.2em", marginBottom: "0em"}}>Users</h2>
      {
        userCanManageUsers &&
      <AddUser {...props} />
    }
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th width="16%">Name</th>
            <th width="16%">Active</th>
            <th width="16%">Add companies</th>
            <th width="16%">Managae categories</th>
            <th width="16%">Manage users</th>
            {userCanManageUsers && <th width="16%">Actions</th> }
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user._id} onClick={() => setChosenUser(user)}>
              <td>{user.name + " " + user.surname}</td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.active}
                  />
              </td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.rights ? user.rights.addCompanies : false}
                  />
              </td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.rights ? user.rights.manageCategories : false}
                  />
              </td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.rights ? user.rights.manageUsers : false}
                  />
              </td>
              {userCanManageUsers &&
              <td style={{display: "flex"}}>
                <LinkButton
                  onClick={(e) => {
                    e.preventDefault();
                    setChosenUser(user);
                  }}
                  >
                  <img
                    className="icon"
                    src={PencilIcon}
                    alt=""
                    />
                </LinkButton>
                <LinkButton
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  >
                  <img
                    className="icon"
                    src={DeleteIcon}
                    alt=""
                    />
                </LinkButton>
              </td>
            }
            </tr>
          )}
        </tbody>
      </table>

    {
      chosenUser &&
       <Modal isOpen={true} toggle={() => setChosenUser(null)}>
         <ModalBody>
           <EditUser userID={chosenUser._id} closeSelf={() => setChosenUser(null)}/>
         </ModalBody>
       </Modal>
     }

    </List>
  );
};
