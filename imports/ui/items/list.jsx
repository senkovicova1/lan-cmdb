import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';

import {
  List
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function ItemsList( props ) {

    const {
      match,
      history,
      location,
      search
    } = props;

    const userId = Meteor.userId();

    const companyID = match.params.companyID;
    const categoryID = match.params.categoryID;

    const items = useSelector((state) => state.items.value);
    const companies = useSelector((state) => state.companies.value);
    const company = useMemo(() => {
      if (companies.length > 0){
        return companies.find(company => company._id === companyID);
      }
      return {};
    }, [companies, companyID]);
    const categories = useSelector((state) => state.categories.value);
    const category = useMemo(() => {
      if (categories.length > 0){
        return categories.find(category => category._id === categoryID);
      }
      return {};
    }, [categories, categoryID]);

  const itemsInCategory =useMemo(() => {
    let itemsInCategory = items.filter(item => (categoryID === "all-categories" || item.category === categoryID) && (companyID === "all-companies" || item.company === companyID));
    if (categoryID === "all-categories" || companyID == "all-companies"){
      return itemsInCategory.map(item => ({
        ...item,
        category: categories.find(category => category._id === item.category).name,
        company: companies.find(company => company._id === item.company).name,
      }));
    }
    return itemsInCategory;
  }, [items, categoryID, companyID, categories, companies]);

    const searchedItems = useMemo(() => {
      let searchedItems = itemsInCategory.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      if (companyID === "all-companies"){
        searchedItems = searchedItems.filter(item => item.company.toLowerCase().includes(search.toLowerCase()));
      }
      if (categoryID === "all-categories"){
        searchedItems = searchedItems.filter(item => item.category?.toLowerCase().includes(search.toLowerCase()));
      }
      return searchedItems;
    }, [itemsInCategory, search, categoryID, companyID])

    const yellowMatch = (string) => {
      if (search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() )){
        return string;
      }
      let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
      let endIndex = startIndex + search.length;
      return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex, endIndex )} </span> {string.substring(endIndex )} </span>;
    }

  return (
    <List>
      {
        searchedItems.length === 0 &&
        <span className="message">You have no items in this category.</span>
      }

      {searchedItems.length > 0 &&
      <table>
        <thead>
          <tr>
            {categoryID === "all-categories" && <th>Category</th>}
            <th>Name</th>
            {companyID === "all-companies" && <th>Company</th>}
          </tr>
        </thead>
        <tbody>
          {
            searchedItems.map((item) => (
              <tr key={item._id} onClick={() => history.push(getGoToLink("viewItem", {companyID, categoryID, itemID: item._id}))}>
                {categoryID === "all-categories" && <td>{yellowMatch(item.category ? item.category : item.type )}</td>}
                <td>{yellowMatch(item.name)}</td>
                {companyID === "all-companies" && <td>{yellowMatch(item.company)}</td>}
              </tr>
            ))
          }
        </tbody>
      </table>
    }

    </List>
  );
};
