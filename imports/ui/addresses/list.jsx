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

import { PlusIcon, DeleteIcon, PencilIcon } from  "/imports/other/styles/icons";
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
    history,
    edit,
    itemID,
    addresses: historyAddresses,
    addedAddresses,
    setAddedAddresses,
    editedAddresses,
    setEditedAddresses,
    deletedAddresses,
    setDeletedAddresses
  } = props;

  const userId = Meteor.userId();

  const addresses = useSelector( ( state ) => state.addresses.value );
  const addressesInItem = useMemo( () => {
    if (historyAddresses){
      return historyAddresses;
    }
    return addresses.filter(address => address.item === itemID);
  }, [ addresses, itemID ] );

  const [ addressAdd, setAddressAdd ] = useState(false);
  const [ addressEdit, setAddressEdit ] = useState(false);
  const [ editedAddress, setEditedAddress ] = useState(null);

  const toggleAddressAdd = () => {setAddressAdd(!addressAdd);};
  const toggleAddressEdit = (addr) => {
    if (addressEdit){
      setAddressEdit(false);
      setEditedAddress(null);
    } else {
      setAddressEdit(true);
      setEditedAddress(addr);
    }
  } ;

  const removeAddress = (id) => {
        if ( window.confirm( "Are you sure you want to remove this address?" ) ) {
          AddressesCollection.remove( {
            _id: id
          } );
        }
  }

  const allAddresses = useMemo(() => {
    if (!deletedAddresses && !editedAddresses && ! addedAddresses){
        return addressesInItem;
    }
    const deletedAddressesIds = deletedAddresses.map(addr => addr._id);
    const editedAddressesIds = editedAddresses.map(addr => addr._id);
    return [...addressesInItem.filter((addr, i) => !deletedAddressesIds.includes(addr._id) && !editedAddressesIds.includes(addr._id)), ...editedAddresses, ...addedAddresses];
  }, [addressesInItem, deletedAddresses, editedAddresses, addedAddresses]);

  if (!edit && addressesInItem.length === 0){
    return (<div></div>);
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
              <th width="60px"></th>
            </tr>
          </thead>
          <tbody>
            {
              allAddresses.map((address, index) => (
                <tr key={address._id + index}>
                  <td>{address.nic}</td>
                  <td>{address.ip}</td>
                  <td>{address.mask}</td>
                  <td>{address.gateway}</td>
                  <td>{address.dns}</td>
                  <td>{address.vlan}</td>
                  <td>{address.note}</td>
                  {edit &&
                  <td style={{display: "flex"}}>
                    <LinkButton
                      onClick={(e) => {e.preventDefault(); toggleAddressEdit(address);}}
                      >
                      <img
                        className="icon"
                        style={{marginRight: "0.6em"}}
                        src={PencilIcon}
                        alt=""
                        />
                    </LinkButton>
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
                }
                </tr>
              ))
            }
            {edit &&
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
          }
          </tbody>
        </table>

        <Modal isOpen={addressAdd} toggle={toggleAddressAdd}>
          <ModalBody>
            <AddAddressContainer
              match={props.match}
              history={props.history}
              closeSelf={toggleAddressAdd}
              addedAddresses={addedAddresses}
              setAddedAddresses={setAddedAddresses}/>
          </ModalBody>
        </Modal>

        <Modal isOpen={addressEdit} toggle={toggleAddressEdit}>
          <ModalBody>
            <EditAddressContainer
              {...props}
              address={editedAddress}
              closeSelf={toggleAddressEdit}
              setEditedAddresses={setEditedAddresses}
              setDeletedAddresses={setDeletedAddresses}
              />
          </ModalBody>
        </Modal>

    </AddressList>
  );
};
