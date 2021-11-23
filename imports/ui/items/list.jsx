import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import { PlusIcon, SearchIcon, CloseIcon } from  "/imports/other/styles/icons";
import {
  List,
  Card,
  FloatingButton,
  SearchSection,
  Input,
  LinkButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function ItemsList( props ) {

  const {
    match,
    history,
    setSearch,
    search,
    sortBy,
    sortDirection,
  } = props;

  const userId = Meteor.userId();
  const {companyID, categoryID} = match.params;

  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotView = !company.users.find(user => user._id === userId);
      if (userCannotView){
        history.push(getGoToLink());
      }
    }
  }, [company, companyID, userId]);

  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    if ( categories.length > 0 ) {
      return categories.find( category => category._id === categoryID );
    }
    return {name: "All categories"};
  }, [ categories, categoryID ] );

  const addresses = useSelector( ( state ) => state.addresses.value );
  const items = useSelector( ( state ) => state.items.value );
  const ipsOfItem = (itemId) => {
      let addressesInItem = addresses.filter(addr => addr.item === itemId);
      if (addressesInItem.length > 0){
          return <span key={itemId}>{addressesInItem.map((addr, index) => <p key={addr.ip + index}>{addr.ip}</p>)}</span>;
      }
      return (<p key={itemId}></p>);
  };

  const itemsInCategory = useMemo( () => {
    let itemsInCategory = items.filter( item => ( categoryID === "all-categories" || item.category === categoryID ) && ( companyID === "all-companies" || item.company === companyID ) );
    if ( (categoryID === "all-categories" || companyID == "all-companies") && categories.length > 1 && companies.length > 1) {
      return itemsInCategory.map( item => {
        return ( {
        ...item,
        categoryName: categoryID === "all-categories" ? categories.find( category => category._id === item.category ).name : item.category,
        companyName: companyID == "all-companies" ? companies.find( company => company._id === item.company ).name : item.company,
      } )} );
    }
    return itemsInCategory;
  }, [ items, categoryID, companyID, categories, companies ] );

  const searchedItems = useMemo( () => {
    let searchedItems = itemsInCategory;
    if ( companyID !== "all-companies" && categoryID !== "all-categories" ) {
      searchedItems = searchedItems.filter( item => item.name.toLowerCase().includes( search.toLowerCase() ) || item.company.toLowerCase().includes( search.toLowerCase() ) );
    }
    if ( companyID !== "all-companies" && categoryID === "all-categories" ) {
      searchedItems = searchedItems.filter( item => item.name.toLowerCase().includes( search.toLowerCase() ) || item.category.toLowerCase().includes( search.toLowerCase() ) );
    }
    if ( companyID === "all-companies" && categoryID === "all-categories" ) {
      searchedItems = searchedItems.filter( item => item.name.toLowerCase().includes( search.toLowerCase() ) || item.category.toLowerCase().includes( search.toLowerCase() ) || item.company.toLowerCase().includes( search.toLowerCase() ) );
    }
    return searchedItems;
  }, [ itemsInCategory, search, categoryID, companyID ] );

  const sortedItems = useMemo(() => {
    const multiplier = !sortDirection || sortDirection === "asc" ? -1 : 1;
    return searchedItems
    .sort((p1, p2) => {
      if (sortBy === "date"){
        return p1.createdDate < p2.createdDate ? 1*multiplier : (-1)*multiplier;
      }
        return p1.name.toLowerCase() < p2.name.toLowerCase() ? 1*multiplier : (-1)*multiplier;
    });
  }, [searchedItems, sortBy, sortDirection]);

  const yellowMatch = ( string ) => {
    if ( search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() ) ) {
      return string;
    }
    let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
    let endIndex = startIndex + search.length;
    return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

    const userCanAddItems =company && company.users?.find(user => user._id === userId).level <= 1;


  return (
    <List>

      <h2>{category ? category.name : "All categories"}</h2>
        <span className="command-bar">
        <SearchSection>
          <LinkButton
            font="#0078d4"
            searchButton
            onClick={(e) => {}}
            >
            <img
              className="search-icon"
              src={SearchIcon}
              alt="Search icon not found"
              />
          </LinkButton>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          <LinkButton
            font="#0078d4"
            searchButton
            onClick={(e) => {
              e.preventDefault();
              setSearch("");
            }}
            >
            <img
              className="search-icon"
              src={CloseIcon}
              alt="Close icon not found"
              />
          </LinkButton>
        </SearchSection>
      </span>


      <Card>

      {
        sortedItems.length === 0 &&
        <span className="message">You have no items in this category.</span>
      }

      {sortedItems.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {categoryID === "all-categories" && <th>Category</th>}
              {companyID === "all-companies" && <th>Company</th>}
              <th>IPs</th>
            </tr>
          </thead>
          <tbody>
            {
              searchedItems.map((item) => (
                <tr key={item._id} onClick={() => history.push(getGoToLink("viewItem", {companyID, categoryID, itemID: item._id}))}>
                  <td>{yellowMatch(item.name)}</td>
                  {categoryID === "all-categories" && <td>{yellowMatch(item.categoryName ? item.categoryName : item.type )}</td>}
                  {companyID === "all-companies" && <td>{yellowMatch(item.companyName)}</td>}
                  <td>{ipsOfItem(item._id)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }

    </Card>
    </List>
  );
};
