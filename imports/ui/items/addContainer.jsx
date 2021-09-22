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
import Select from 'react-select';

import {
  ItemsCollection
} from '/imports/api/itemsCollection';
import {
  AddressesCollection
} from '/imports/api/addressesCollection';

import {addNewAddress, NO_CHANGE, ADDED, EDITED, DELETED} from '../addresses/addressesHandlers';

import ItemForm from './form';

import {
  selectStyle
} from '/imports/other/styles/selectStyles';
import {
  Form,
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function AddItemContainer( props ) {
  const {
    match,
    history,
  } = props;

  const userId = Meteor.userId();

  const [actualCompany, setActualCompany] = useState(null);
  const [actualCategory, setActualCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  const categoryID = match.params.categoryID;
  const categories = useSelector( ( state ) => state.categories.value );

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

useEffect(() => {
  if (companyID !== "all-companies" && company){
    const userCannotAddItems = company.users.find(user => user._id === userId).level > 1;
    if (userCannotAddItems){
      history.push(getGoToLink());
    }
  }
}, [company, companyID, userId]);

  useEffect(() => {
     if (companyID !== "all-companies" && categoryID !== "all-categories"){
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }, [categoryID, companyID]);

  const addNew = ( name, status, placement, installationDate, expirationDate, description, backupDescription, monitoringDescription, updatedDate, updatedBy, originalItemId, addresses, category, company, createdDate, createdBy ) => {
    ItemsCollection.insert( {
      name,
      status,
      placement,
      installationDate,
      expirationDate,
      description,
      backupDescription,
      monitoringDescription,
      updatedDate,
      updatedBy,
      category,
      company,
      createdDate,
      createdBy
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      } else {
        addresses.forEach((address, i) => {
          addNewAddress(address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
        });

        history.push( getGoToLink( "viewItem", {
          companyID,
          categoryID,
          itemID: _id
        } ) );
      }
    } );
  }

  const close = () => {
    history.goBack();
  }

  if (modalOpen){
    return (
      <Modal isOpen={modalOpen}>
        <ModalBody>
          <Form>
            {
              companyID === "all-companies" &&
            <section>
              <label htmlFor="company">Company</label>
                <Select
                  id="company"
                  styles={selectStyle}
                  value={actualCompany}
                  onChange={(e) => {
                    setActualCompany(e);
                  }}
                  options={companies}
                  />
            </section>
          }
            {
              categoryID === "all-categories" &&
            <section>
              <label htmlFor="category">Category</label>
                <Select
                  id="category"
                  styles={selectStyle}
                  value={actualCategory}
                  onChange={(e) => {
                    setActualCategory(e);
                  }}
                  options={categories}
                  />
            </section>
          }
            <ButtonCol>
              <FullButton colour="grey" onClick={(e) => {e.preventDefault(); close()}}>Cancel</FullButton>
              <FullButton
                colour=""
                onClick={(e) => {e.preventDefault(); setModalOpen(false);}}
                >
                Continue
              </FullButton>
            </ButtonCol>
          </Form>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <ItemForm
      {...props}
      companyID={actualCompany ? actualCompany._id : companyID}
      categoryID={actualCategory ? actualCategory._id : categoryID}
      title={"Add item"}
      onSubmit={addNew}
      onCancel={close}
      />
  );
};
