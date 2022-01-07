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

export default function AddressesList( props ) {

  const {
    match,
    history,
    edit,
    itemID,
    addresses,
    setAddresses,
  } = props;

  const userId = Meteor.userId();

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

  const removeAddress = (address) => {
        if ( window.confirm( "Are you sure you want to remove this address?" ) ) {
          const newAddresses = addresses.map(addr => {
            if (addr._id && addr._id === address._id){
              return ({...addr, change: DELETED});
            }
            if (!addr._id && JSON.stringify(addr) === JSON.stringify(address)){
              return null;
            }
            return addr;
          });
          setAddresses(newAddresses.filter(addr => addr));
        }
  }

  if (!edit && addresses.length === 0){
    return (<div></div>);
  }

  return (
    <TableList>

        <table>
          <thead>
            <tr>
                <th>NIC</th>
                <th>IP</th>
                <th>Mask</th>
                <th>Gateway</th>
                <th>DNS</th>
              <th>VLAN</th>
              <th width="25%">Note</th>
              {edit && <th width="50px"></th>}
            </tr>
          </thead>
          <tbody>
            {
              addresses.filter(address => address.change !== DELETED).map((address, index) => (
                <tr key={address._id ? address._id : (address.nic + address.ip)}>
                  <td>{address.nic}</td>
                  <td>{address.ip}</td>
                  <td>{address.mask}</td>
                  <td>{address.gateway}</td>
                  <td>{address.dns}</td>
                  <td>{address.vlan}</td>
                  <td style={{lineHeight: "1.8em"}}>{address.note}</td>
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
                      onClick={(e) => {e.preventDefault(); removeAddress(address)}}
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
              addresses={addresses}
              setAddresses={setAddresses}
              />
          </ModalBody>
        </Modal>

        <Modal isOpen={addressEdit} toggle={toggleAddressEdit}>
          <ModalBody>
            <EditAddressContainer
              {...props}
              address={editedAddress}
              closeSelf={toggleAddressEdit}
              addresses={addresses}
              setAddresses={setAddresses}
              />
          </ModalBody>
        </Modal>

    </TableList>
  );
};
