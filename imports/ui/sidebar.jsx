import React, {
  useState,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';
import Select from 'react-select';

import AddCompany from '/imports/ui/companies/addCompanyContainer';
import EditCompany from '/imports/ui/companies/editCompanyContainer';

import {
  selectStyle
} from '/imports/other/styles/selectStyles';
import { PlusIcon, SettingsIcon } from  "/imports/other/styles/icons";
import {
  Sidebar,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
getGoToLink
} from "/imports/other/navigationLinks";


//import moment from 'moment';


/*import {
  useTracker
} from 'meteor/react-meteor-data';*/


export default function Menu( props ) {

  const {
    match,
    history,
    closeSelf
  } = props;

  const companyID = match.params.companyID;
  const itemCategoryID = match.params.itemCategoryID;

  //const userId = Meteor.userId();
  // const user = useTracker( () => Meteor.user() );
  const companies = useSelector((state) => state.companies.value);
  const itemCategories = useSelector((state) => state.itemCategories.value);

  const [ companyAdd, setCompanyAdd ] = useState(false);
  const [ companyEdit, setCompanyEdit ] = useState(false);
  const [ selectedCompany, setSelectedCompany ] = useState({});

  const [ selectedItemCategory, setSelectedItemCategory ] = useState({});

  const toggleCompanyAdd = () => {setCompanyAdd(!companyAdd);};
  const toggleCompanyEdit = () => {setCompanyEdit(!companyEdit);};

  useEffect(() => {
    if (companies.length > 0){
      setSelectedCompany(companies.find(company => company.value === companyID));
    } else {
      setSelectedCompany({label: "All companies", value: "all-companies"});
    }
  }, [companies, companyID]);

  useEffect(() => {
    if (itemCategories.length > 0){
      setSelectedItemCategory(itemCategories.find(itemCategory => itemCategory.value === itemCategoryID));
    } else {
      setSelectedItemCategory({label: "All categories", value: "all-categories"});
    }
  }, [itemCategories, itemCategoryID]);

  return (
    <Sidebar>

      <Select
        styles={selectStyle}
        value={selectedCompany}
        onChange={(e) => {
          setSelectedCompany(e);
          history.push(getGoToLink("listItemsInCategory", {companyID: e.value, itemCategoryID}));
        }}
        options={{label: "All companies", value: "all-companies"}, [...companies]}
        />

      {
        itemCategories.map(itemCategory =>  (
          <div className="nav" key={itemCategory.value}>
            <NavLink
              style={itemCategory.value === "all-categories" ? {width: "100%"} : {}}
              key={itemCategory.value}
              to={getGoToLink("listItemsInCategory", {companyID, itemCategoryID: itemCategory.value})}
              onClick={() => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  closeSelf();
                }
              }}
              >
              <span>{itemCategory.label}</span>
            </NavLink>
            {
              itemCategory.value !== "all-categories" &&
            <LinkButton
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("editItemCategory", {itemCategoryID: itemCategory.value}))}}
              >
              <img
                className="icon"
                src={SettingsIcon}
                alt=""
                />
            </LinkButton>
          }
          </div>
          ))
      }

      <LinkButton
        onClick={(e) => {e.preventDefault(); toggleCompanyAdd()}}
        >
        <img
          className="icon"
          src={PlusIcon}
          alt=""
          />
        <span>
          Company
        </span>
      </LinkButton>

      <LinkButton
        onClick={(e) => {e.preventDefault(); toggleCompanyEdit()}}
        >
        <img
          className="icon"
          src={SettingsIcon}
          alt=""
          />
        <span>
          Company
        </span>
      </LinkButton>

      <NavLink
        key={"add-item-category"}
        to={getGoToLink("addItemCategory")}
        onClick={() => {
          if (/Mobi|Android/i.test(navigator.userAgent)) {
            closeSelf();
          }
        }}
        >
        <img
          className="icon"
          src={PlusIcon}
          alt=""
          />
        Item Category
      </NavLink>

      <Modal isOpen={companyAdd} toggle={toggleCompanyAdd}>
        <ModalBody>
          <AddCompany {...props} closeSelf={toggleCompanyAdd}/>
        </ModalBody>
      </Modal>

      <Modal isOpen={companyEdit} toggle={toggleCompanyEdit}>
        <ModalBody>
          <EditCompany {...props} closeSelf={toggleCompanyEdit}/>
        </ModalBody>
      </Modal>
    </Sidebar>
  );
};
