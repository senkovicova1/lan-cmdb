import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useTracker
} from 'meteor/react-meteor-data';
import {
  Modal,
  ModalBody
} from 'reactstrap';
import Select from 'react-select';

import AddCompany from '/imports/ui/companies/addContainer';
import EditCompany from '/imports/ui/companies/editContainer';
import Loader from '/imports/ui/other/loadingScreen';

import {
  invisibleSelectStyle
} from '/imports/other/styles/selectStyles';
import { PlusIcon, SettingsIcon, FolderIcon, FilterIcon, UserIcon } from  "/imports/other/styles/icons";
import {
  Sidebar,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function Menu( props ) {

  const {
    match,
    history,
    location,
    closeSelf
  } = props;

  const userId = Meteor.userId();
    const currentUser = useTracker( () => Meteor.user() );

  const companyID = match.params.companyID !== "undefined" ? match.params.companyID : "all-companies";
  const categoryID = match.params.categoryID !== "undefined" ? match.params.categoryID : "all-categories";

  const companies = useSelector((state) => state.companies.value);
  const categories = useSelector((state) => state.categories.value);

  const [ companyAdd, setCompanyAdd ] = useState(false);
  const [ companyEdit, setCompanyEdit ] = useState(false);
  const [ selectedCompany, setSelectedCompany ] = useState({});

  const [ selectedCategory, setSelectedCategory ] = useState({});

  const toggleCompanyAdd = () => {setCompanyAdd(!companyAdd);};
  const toggleCompanyEdit = () => {setCompanyEdit(!companyEdit);};

  useEffect(() => {
    if (companies.length > 0 && companyID){
      setSelectedCompany(companies.find(company => company.value === companyID));
    } else {
      setSelectedCompany({label: "All companies", value: "all-companies"});
    }
  }, [location.pathname, companies, companyID]);

  useEffect(() => {
    if (categories.length > 0 && categoryID){
      setSelectedCategory(categories.find(category => category.value === categoryID));
    } else {
      setSelectedCategory({label: "All categories", value: "all-categories"});
    }
  }, [location.pathname, categories, categoryID]);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((c1, c2) => c1.label > c2.label ? 1 : -1);
  }, [categories]);


if (!selectedCompany){
  return <Loader />;
}

  const userCanAddItems = selectedCompany.value === "all-companies" || selectedCompany.users?.find(user => user._id === userId).level <= 1;
  const userCanAddCompanies = currentUser && currentUser.profile.rights && currentUser.profile.rights.addCompanies;
  const userCanManageCategories = currentUser && currentUser.profile.rights && currentUser.profile.rights.manageCategories;
  const userCanManageUsers = currentUser && currentUser.profile.rights && currentUser.profile.rights.manageUsers;

  return (
    <Sidebar>

      <label className="selector-name">
        <img
          className="icon"
          src={FolderIcon}
          alt=""
          />
        Company
      </label>

      <Select
        styles={invisibleSelectStyle}
        value={selectedCompany}
        onChange={(e) => {
          setSelectedCompany(e);
          history.push(getGoToLink("listItemsInCategory", {companyID: e.value, categoryID}));
        }}
        options={{label: "All companies", value: "all-companies"}, [...companies]}
        />

      <hr />

      {
        selectedCompany.value !== "all-companies" &&
        <NavLink
          className={location.pathname.includes("scheme") ? "active" : ""}
          style={{width: "100%"}}
          key={"scheme"}
          to={getGoToLink("schemeView", {companyID: selectedCompany.value})}
          onClick={() => {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
              closeSelf();
            }
          }}
          >
          <span>Schema</span>
        </NavLink>
      }

      <label className="selector-name">
        <img
          className="icon"
          src={FilterIcon}
          alt=""
          />
        Category
      </label>

      {
        sortedCategories.map(category =>  (
          <div className="nav" key={category.value}>
            <NavLink
              className={category.value === categoryID ? "active" : ""}
              style={category.value === "all-categories" || !userCanManageCategories ? {width: "100%"} : {}}
              key={category.value}
              to={getGoToLink("listItemsInCategory", {companyID: selectedCompany?.value, categoryID: category.value})}
              onClick={() => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  closeSelf();
                }
              }}
              >
              <span>{category.label}</span>
            </NavLink>
            {
              category.value !== "all-categories" &&
              userCanManageCategories &&
            <LinkButton
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("editCategory", {categoryID: category.value}))}}
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
<hr />
{
    userCanAddItems &&
      <NavLink
        style={{width: "100%"}}
        key={"add-item"}
        to={getGoToLink("addItem", {companyID: companyID ? companyID : "all-companies", categoryID: categoryID ? categoryID : "all-categories"})}
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
        Item
      </NavLink>
    }

    {
      userCanManageCategories &&
      <NavLink
        style={{width: "100%"}}
        key={"add-item-category"}
        to={getGoToLink("addCategory")}
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
    }

    {userCanAddCompanies &&
      <LinkButton
        onClick={(e) => {e.preventDefault(); toggleCompanyAdd()}}
        >
        <img
          className="icon"
          style={{marginRight: "0.6em"}}
          src={PlusIcon}
          alt=""
          />
        <span>
          Company
        </span>
      </LinkButton>
    }

      {
      companyID !== "all-companies" &&
      <LinkButton
        onClick={(e) => {e.preventDefault(); toggleCompanyEdit()}}
        >
        <img
          className="icon"
          style={{marginRight: "0.6em"}}
          src={SettingsIcon}
          alt=""
          />
        <span>
          Company
        </span>
      </LinkButton>
    }

    {userCanManageUsers &&
  <NavLink
    className={match.path === "/users/list" ? "active" : ""}
    style={{width: "100%"}}
    key={"users"}
    to={getGoToLink("users")}
    onClick={() => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        closeSelf();
      }
    }}
    >
    <img
      className="icon"
      src={UserIcon}
      alt=""
      />
    <span>Users</span>
  </NavLink>
}

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
