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

export default function Menu( props ) {

  const {
    match,
    history,
    location,
    closeSelf
  } = props;

  const companyID = match.params.companyID;
  const categoryID = match.params.categoryID;

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


  return (
    <Sidebar>

      <Select
        styles={selectStyle}
        value={selectedCompany}
        onChange={(e) => {
          setSelectedCompany(e);
          history.push(getGoToLink("listItemsInCategory", {companyID: e.value, categoryID}));
        }}
        options={{label: "All companies", value: "all-companies"}, [...companies]}
        />

      {
        categories.map(category =>  (
          <div className="nav" key={category.value}>
            <NavLink
              className={category.value === categoryID ? "active" : ""}
              style={category.value === "all-categories" ? {width: "100%"} : {}}
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

{
  companyID !== "all-companies" &&
    categoryID !== "all-categories" &&
      <NavLink
        style={{width: "100%"}}
        key={"add-item"}
        to={getGoToLink("addItem", {companyID, categoryID})}
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
