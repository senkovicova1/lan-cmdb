import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom';
import {
  useTracker
} from 'meteor/react-meteor-data';
import { useDispatch, useSelector } from 'react-redux';

import { setCompanies } from '/imports/redux/companiesSlice';
import { setCategories } from '/imports/redux/categoriesSlice';
import { setItems } from '/imports/redux/itemsSlice';
import { setAddresses } from '/imports/redux/addressesSlice';
import { setUsers } from '/imports/redux/usersSlice';
import { setSchemes } from '/imports/redux/schemesSlice';
import {
  CompaniesCollection
} from '/imports/api/companiesCollection';
import {
  CategoriesCollection
} from '/imports/api/categoriesCollection';
import {
  ItemsCollection
} from '/imports/api/itemsCollection';
import {
  AddressesCollection
} from '/imports/api/addressesCollection';
import {
  SchemesCollection
} from '/imports/api/schemesCollection';

import Reroute from './reroute';
import Breadcrumbs from './breadcrumbs';
import Header from './header';
import Login from './login';
import CategoryAdd from './categories/addContainer';
import CategoryEdit from './categories/editContainer';
import SchemeView from './schemes/view';
import SchemeDraw from './schemes/drawScheme';
import SchemeEdit from './schemes/editContainer';
import ItemAdd from './items/addContainer';
import ItemEdit from './items/editContainer';
import ItemsList from './items/list';
import ItemView from './items/viewContainer';
import EditUserContainer from './users/editUserContainer';

import {
  uint8ArrayToImg
} from '../other/helperFunctions';
import {
  Content
} from '../other/styles/styledComponents';
import {
getLink
} from "/imports/other/navigationLinks";

export default function MainPage( props ) {
  const dispatch = useDispatch();

  console.log("All our amazing icons are from FlatIcon (https://www.flaticon.com/). Thank you to all creators whose icons we could use: PixelPerfect (https://www.flaticon.com/authors/pixel-perfect), Dmitri13 (https://www.flaticon.com/authors/dmitri13), Phatplus (https://www.flaticon.com/authors/phatplus), Kiranshastry (https://www.flaticon.com/authors/kiranshastry), Those Icons (https://www.flaticon.com/authors/those-icons), Google (https://www.flaticon.com/authors/google), Dave Gandy (https://www.flaticon.com/authors/dave-gandy), Tomas Knop (https://www.flaticon.com/authors/tomas-knop), Gregor Cresnar (https://www.flaticon.com/authors/gregor-cresnar), Freepik (https://www.flaticon.com/authors/freepik)");

  const currentUser = useTracker( () => Meteor.user() );

  const userId = useMemo(() => {
    if (currentUser){
      return currentUser._id;
    }
    return null;
  }, [currentUser]);

  const companies = useTracker( () => CompaniesCollection.find( { users:  { $elemMatch: { _id: userId } } } ).fetch() );

  useEffect(() => {
      dispatch(
        setCompanies(
          [
          {label: "All companies", value: "all-companies"},
          ...companies.map(company => ({...company, label: company.name, value: company._id})).sort((c1, c2) => c1.label > c2.label ? 1 : -1)
          ]
        )
      );
  }, [companies]);


  const categories = useTracker( () => CategoriesCollection.find( {} ).fetch() );
  useEffect(() => {
    if (categories.length > 0){
      dispatch(
        setCategories(
          [
          {label: "All categories", value: "all-categories"},
          ...categories.map(category => ({...category, label: category.name, value: category._id}))
          ]
        )
      );
    }
  }, [categories]);

  const companiesIds = companies.map(company => company._id);
  const items = useTracker( () => ItemsCollection.find( { company:  { $in: companiesIds} } ).fetch() );
  useEffect(() => {
    if (items.length > 0){
      dispatch(setItems(items));
    }
  }, [items]);

  const users = useTracker( () => Meteor.users.find( {} ).fetch() );
  useEffect(() => {
    dispatch(
      setUsers(
        users.map(user => ({
          _id: user._id,
          ...user.profile,
          label:  `${user.profile.name} ${user.profile.surname}`,
          value: user._id,
          img: uint8ArrayToImg(user.profile.avatar)
        }) )
      )
    );
  }, [users]);

  const schemes = useTracker( () => SchemesCollection.find( { company:  { $in: companiesIds} } ).fetch() );
  useEffect(() => {
    if (schemes.length > 0){
      dispatch(setSchemes(schemes));
    }
  }, [schemes]);

    const itemsIds = items.map(item => item._id);
    const addresses = useTracker( () => AddressesCollection.find( { item: {$in: itemsIds}} ).fetch() );
    useEffect(() => {
      if (addresses.length > 0){
        dispatch(setAddresses(addresses));
      }
    }, [addresses]);

  const [ search, setSearch ] = useState( "" );
  const [ openSidebar, setOpenSidebar ] = useState( false );
  const [ sortBy, setSortBy ] = useState("name");
  const [ sortDirection, setSortDirection ] = useState("asc");

  return (
    <div style={{height: "100vh"}}>
      <BrowserRouter>
        <Route
          exact
          path={"/"}
          render={(props) => (
            <Reroute
              {...props}
              currentUser={currentUser}
              />
          )}
          />

        <Route
          exact
          path={[
            "/",
            getLink("login"),
            getLink("currentUserEdit"),
            getLink("addCategory"),
            getLink("editCategory"),
            getLink("listItemsInCategory"),
            getLink("schemeView"),
            getLink("schemeDraw"),
            getLink("schemeEdit"),
            getLink("addItem"),
            getLink("editItem"),
            getLink("viewItem"),
          ]}
          render={(props) => (
            <Header
              {...props}
              setSearch={setSearch}
              search={search}
              setParentOpenSidebar={setOpenSidebar}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              />
          )}
          />
        {!currentUser &&
          <Content style={{paddingLeft: "250px", paddingRight: "250px"}}>
            <Route path={["/", getLink("login")]} component={Login} />
          </Content>
        }
        {
          currentUser &&
          <Content>
            <Route
              exact
              path={[
                "/",
                getLink("login"),
                getLink("currentUserEdit"),
                getLink("addCategory"),
                getLink("editCategory"),
                getLink("listItemsInCategory"),
                getLink("schemeView"),
                getLink("schemeDraw"),
                getLink("schemeEdit"),
                getLink("addItem"),
                getLink("editItem"),
                getLink("viewItem"),
              ]}
              render={(props) => (
                <Breadcrumbs
                  {...props}
                  />
              )}
              />

            <div style={{height: "100%", position: "relative"}}>

            <Route
              exact
              path={getLink("currentUserEdit")}
              render={(props) => (
                <EditUserContainer {...props} />
              )}
              />

            <Route
              exact
              path={getLink("addCategory")}
              render={(props) => (
                <CategoryAdd
                  {...props}
                  />
              )}
              />

              <Route
                exact
                path={getLink("editCategory")}
                render={(props) => (
                  <CategoryEdit
                    {...props}
                    />
                )}
                />

                <Route exact path={getLink("addItem")} component={ItemAdd}/>
                <Route exact path={getLink("editItem")} component={ItemEdit}/>

                  <Route
                    exact
                    path={[getLink("listItemsInCategory"), getLink()]}
                    render={(props) => (
                      <ItemsList
                        {...props}
                        search={search}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        />
                    )}
                  />

                <Route exact path={getLink("viewItem")} component={ItemView}/>

                <Route exact path={getLink("schemeView")} component={SchemeView}/>
                <Route exact path={getLink("schemeDraw")} component={SchemeDraw}/>
                <Route exact path={getLink("schemeEdit")} component={SchemeEdit}/>
          </div>
        </Content>
      }
      </BrowserRouter>
    </div>
  );
};
