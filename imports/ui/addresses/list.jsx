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

import AddAddressContainer from './addContainer';
import EditAddressContainer from './editContainer';

import {
  AddressesCollection
} from '/imports/api/addressesCollection';

import { PlusIcon, DeleteIcon } from  "/imports/other/styles/icons";
import {
  AddressList,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function AddressesList( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const addresses = useSelector( ( state ) => state.addresses.value );
  const addressesInItem = useMemo( () => {
    return addresses.filter(address => address.item === itemID);
  }, [ addresses, itemID ] );

  const [ addressAdd, setAddressAdd ] = useState(false);
  const [ addressEdit, setAddressEdit ] = useState(false);
  const [ editedAddress, setEditedAddress ] = useState(null);

  const toggleAddressAdd = () => {setAddressAdd(!addressAdd);};
  const toggleAddressEdit = (id) => {
    if (addressEdit){
      setAddressEdit(false);
      setEditedAddress(null);
    } else {
      setAddressEdit(true);
      setEditedAddress(id);
    }
  } ;

  const removeAddress = (id) => {
        if ( window.confirm( "Are you sure you want to remove this address?" ) ) {
          AddressesCollection.remove( {
            _id: id
          } );
        }
  }

  return (
    <AddressList>

        <table>
          <thead>
            <tr>
                <th>NIC</th>
                <th>IP</th>
                <th>Mask</th>
                <th>Gateway</th>
                <th>DNS</th>
              <th>VLAN</th>
              <th>Note</th>
              <th width="20px"></th>
            </tr>
          </thead>
          <tbody>
            {
              addressesInItem.map((address) => (
                <tr key={address._id} onClick={(e) => {e.preventDefault(); toggleAddressEdit(address._id);}}>
                  <td>{address.nic}</td>
                  <td>{address.ip}</td>
                  <td>{address.mask}</td>
                  <td>{address.gateway}</td>
                  <td>{address.dns}</td>
                  <td>{address.vlan}</td>
                  <td>{address.note}</td>
                  <td>
                    <LinkButton
                      onClick={(e) => {e.preventDefault(); removeAddress(address._id)}}
                      >
                      <img
                        className="icon"
                        style={{marginRight: "0.6em"}}
                        src={DeleteIcon}
                        alt=""
                        />
                    </LinkButton>
                  </td>
                </tr>
              ))
            }
            <tr key={"add"} onClick={() => {setAddressAdd(true)}}>
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
                    Address
                  </span>
                </LinkButton>
              </td>
            </tr>
          </tbody>
        </table>

        <Modal isOpen={addressAdd} toggle={toggleAddressAdd}>
          <ModalBody>
            <AddAddressContainer {...props} closeSelf={toggleAddressAdd}/>
          </ModalBody>
        </Modal>

        <Modal isOpen={addressEdit} toggle={toggleAddressEdit}>
          <ModalBody>
            <EditAddressContainer {...props}
              addressId={editedAddress} closeSelf={toggleAddressEdit}/>
          </ModalBody>
        </Modal>

    </AddressList>
  );
};
