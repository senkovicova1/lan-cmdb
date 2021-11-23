import React, {
  useMemo,
  useEffect,
  useState
} from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import AddContainer from './addContainer';
import EditContainer from './editContainer';

import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';

import { PlusIcon, DeleteIcon, PencilIcon } from  "/imports/other/styles/icons";
import {
  TableList,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

const NO_CHANGE = 0;
const ADDED = 1;
const EDITED = 2;
const DELETED = 3;

export default function PasswordsList( props ) {

  const {
    match,
    history,
    edit,
    itemID,
    passwords,
    setPasswords,
  } = props;

  const userId = Meteor.userId();

  const [ passwordsAdd, setPasswordAdd ] = useState(false);
  const [ passwordsEdit, setPasswordEdit ] = useState(false);
  const [ editedPassword, setEditedPassword ] = useState(null);

  const togglePasswordAdd = () => {setPasswordAdd(!passwordsAdd);};
  const togglePasswordEdit = (pass) => {
    if (passwordsEdit){
      setPasswordEdit(false);
      setEditedPassword(null);
    } else {
      setPasswordEdit(true);
      setEditedPassword(pass);
    }
  } ;

  const removePassword = (password) => {
        if ( window.confirm( "Are you sure you want to remove this password?" ) ) {
          const newPasswords = passwords.map(pass => {
            if (pass._id && pass._id === password._id){
              return ({...pass, change: DELETED});
            }
            if (!pass._id && JSON.stringify(pass) === JSON.stringify(password)){
              return null;
            }
            return pass;
          });
          setPasswords(newPasswords.filter(pass => pass));
        }
  }

  if (!edit && passwords.length === 0){
    return (<div></div>);
  }

  return (
    <TableList>

        <table>
          <thead>
            <tr>
                <th>Passwords</th>
                <th>Login</th>
                <th>Password</th>
                <th>IP/URL:PORT</th>
              <th>Note</th>
              {edit && <th width="50px"></th>}
            </tr>
          </thead>
          <tbody>
            {
              passwords.filter(password => password.change !== DELETED).map((password, index) => (
                <tr key={password._id ? password._id : (password.title + password.login)}>
                  <td>{password.title}</td>
                  <td>{password.login}</td>
                  <td>{password.password}</td>
                  <td>{password.ipUrl}</td>
                  <td>{password.note}</td>
                  {edit &&
                  <td style={{display: "flex"}}>
                    <LinkButton
                      onClick={(e) => {e.preventDefault(); togglePasswordEdit(password);}}
                      >
                      <img
                        className="icon"
                        style={{marginRight: "0.6em"}}
                        src={PencilIcon}
                        alt=""
                        />
                    </LinkButton>
                    <LinkButton
                      onClick={(e) => {e.preventDefault(); removePassword(password)}}
                      >
                      <img
                        className="icon"
                        style={{marginRight: "0em"}}
                        src={DeleteIcon}
                        alt=""
                        />
                    </LinkButton>
                  </td>
                }
                </tr>
              ))
            }
            {edit &&
            <tr key={"add"} onClick={() => {setPasswordAdd(true)}}>
              <td colSpan={8}>
                <LinkButton
                  onClick={(e) => e.preventDefault()}
                  >
                  <img
                    className="icon"
                    style={{marginRight: "0.6em"}}
                    src={PlusIcon}
                    alt=""
                    />
                  <span>
                    Password
                  </span>
                </LinkButton>
              </td>
            </tr>
          }
          </tbody>
        </table>

        <Modal isOpen={passwordsAdd} toggle={togglePasswordAdd}>
          <ModalBody>
            <AddContainer
              match={props.match}
              history={props.history}
              closeSelf={togglePasswordAdd}
              passwords={passwords}
              setPasswords={setPasswords}
              />
          </ModalBody>
        </Modal>

        <Modal isOpen={passwordsEdit} toggle={togglePasswordEdit}>
          <ModalBody>
            <EditContainer
              {...props}
              password={editedPassword}
              closeSelf={togglePasswordEdit}
              passwords={passwords}
              setPasswords={setPasswords}
              />
          </ModalBody>
        </Modal>

    </TableList>
  );
};
