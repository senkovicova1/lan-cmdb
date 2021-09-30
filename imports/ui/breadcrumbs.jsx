import React, {
  useEffect,
  useState
} from 'react';
import {
  Meteor
} from 'meteor/meteor';
import {
  useSelector
} from 'react-redux';

import {
  Breadcrumbs as StyledBreadcrumbs,
  LinkButton
} from '/imports/other/styles/styledComponents';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function Breadcrumbs( props ) {

  const {match, history, location} = props;
  const {categoryID, companyID, itemID} = match.params;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const companies = useSelector( ( state ) => state.companies.value );
  const categories = useSelector( ( state ) => state.categories.value );
  const items = useSelector( ( state ) => state.items.value );

  useEffect(() => {
    let result = [];
    const path = match.path.split("/");

    if (path[1] === "categories"){
      result = [{ link: "listItemsInCategory", label: "Categories", args: {categoryID: "all-categories"}}];
      if (match.path.includes("add")){
        result.push({ link: "addCategory", label: "Add category"});
      }
    }

    if (companyID){
      const company = companies.find( company => company.value === companyID);
      result.push({ link: "listItemsInCategory", label: company ? company.label : "All companies", args: {companyID: company ? company._id : "all-companies", categoryID: "all-categories"}});
    }
    if (match.path.includes("scheme")){
      result.push({ link: "schemeView", label: "Scheme", args: {companyID}});
       if (match.path.includes("edit")){
          result.push({ link: "schemeEdit", label: "Edit scheme", args: {companyID}});
        }
    }
    if (categoryID){
      const category = categories.find( category => category.value === categoryID );
      result.push({ link: "listItemsInCategory", label: category.label, args: {companyID: !companyID ? "all-companies" : companyID, categoryID}});
      if (match.path.includes("edit") && !itemID){
        result.push({ link: "editCategory", label: "Edit category", args: {categoryID}});
      }
    }
    if (itemID && items.length !== 0){
      const item = items.find( item => item._id === itemID );
      if (item){
        result.push({ link: "viewItem", label: item.name, args: {companyID, categoryID, itemID}});
        if (match.path.includes("edit")){
          result.push({ link: "editItem", label: "Edit item", args: {companyID, categoryID, itemID}});
        }
      }
    }
    
    if (match.path.includes("add-item")){
      result.push({ link: "addItem", label: "Add item", args: {companyID, categoryID}});
    }

    if (match.path.includes("user")){
       result = [];
     }

    setBreadcrumbs(result);
  }, [match.path, categoryID, categories, companyID, companies, itemID, items]);

  return (
    <StyledBreadcrumbs>
      {breadcrumbs.map((crumb, index) =>
        (
        <span key={crumb.label + index}>
          <LinkButton
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink(crumb.link, crumb.args));
            }}
            >
            {crumb.label}
          </LinkButton>
          {
            (index + 1) !== breadcrumbs.length &&
          ">"
        }
        </span>
        )
          )}
        </StyledBreadcrumbs>
  );
};
