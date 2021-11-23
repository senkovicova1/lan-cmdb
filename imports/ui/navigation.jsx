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
import { setPasswords } from '/imports/redux/passwordsSlice';
import { setUsers } from '/imports/redux/usersSlice';
import { setSchemes } from '/imports/redux/schemesSlice';
import { setDescriptions } from '/imports/redux/descriptionsSlice';
import { setManuals } from '/imports/redux/manualsSlice';
import { setCompany } from '/imports/redux/metadataSlice';
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
  PasswordsCollection
} from '/imports/api/passwordsCollection';
import {
  SchemesCollection
} from '/imports/api/schemesCollection';
import {
  DescriptionsCollection
} from '/imports/api/descriptionsCollection';
import {
  ManualsCollection
} from '/imports/api/manualsCollection';

import Reroute from './reroute';
import Breadcrumbs from './breadcrumbs';
import Header from './header';
import Login from './login';
import CategoryAdd from './categories/addContainer';
import CategoryEdit from './categories/editContainer';
import SchemeView from './schemes/view';
import SchemeEdit from './schemes/editContainer';
import DescriptionView from './descriptions/view';
import DescriptionEdit from './descriptions/editContainer';
import ItemAdd from './items/addContainer';
import ItemEdit from './items/editContainer';
import ItemsList from './items/list';
import ItemView from './items/viewContainer';
import EditUserContainer from './users/editUserContainer';
import UsersList from './users/list';
import Manuals from './manuals/container';

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
      dispatch(setCompany({label: "All companies", value: "all-companies"}));
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

  const manuals = useTracker( () => ManualsCollection.find( { company:  { $in: companiesIds} } ).fetch() );
  useEffect(() => {
      dispatch(setManuals(manuals));
  }, [manuals]);

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

  const descriptions = useTracker( () => DescriptionsCollection.find( { company:  { $in: companiesIds} } ).fetch() );
  useEffect(() => {
    if (descriptions.length > 0){
      dispatch(setDescriptions(descriptions));
    }
  }, [descriptions]);

    const itemsIds = items.map(item => item._id);
    const addresses = useTracker( () => AddressesCollection.find( {item: {$in: itemsIds}} ).fetch() );
    useEffect(() => {
      dispatch(setAddresses(addresses));
    }, [addresses]);
    const passwords = useTracker( () => PasswordsCollection.find( {item: {$in: itemsIds}} ).fetch() );
    useEffect(() => {
      dispatch(setPasswords(passwords));
    }, [passwords]);

  const [ search, setSearch ] = useState( "" );
  const [ openSidebar, setOpenSidebar ] = useState( true );
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
            getLink("users"),
            getLink("addCategory"),
            getLink("editCategory"),
            getLink("listItemsInCategory"),
            getLink("schemeView"),
            getLink("schemeDraw"),
            getLink("schemeEdit"),
            getLink("descriptionView"),
            getLink("descriptionEdit"),
            getLink("manuals"),
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
          <Content withSidebar={false} style={{paddingLeft: "250px", paddingRight: "250px"}}>
            <Route path={["/", getLink("login")]} component={Login} />
          </Content>
        }
        {
          currentUser &&
          <Content withSidebar={openSidebar}>
            <div style={{height: "calc(100vh - 50px)", position: "relative"}}>

            <Route
              exact
              path={[
                "/",
                getLink("login"),
              ]}
              render={(props) => (
                <Breadcrumbs
                  {...props}
                  />
              )}
              />

            <Route
              exact
              path={getLink("currentUserEdit")}
              render={(props) => (
                <EditUserContainer {...props} />
              )}
              />

                            <Route
                              exact
                              path={getLink("users")}
                              render={(props) => (
                                <UsersList {...props} search={search}/>
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
                        setSearch={setSearch}
                        search={search}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        />
                    )}
                  />

                <Route exact path={getLink("viewItem")} component={ItemView}/>

                <Route exact path={getLink("schemeView")} component={SchemeView}/>
                <Route exact path={getLink("schemeEdit")} component={SchemeEdit}/>

                <Route exact path={getLink("descriptionView")} component={DescriptionView}/>
                <Route exact path={getLink("descriptionEdit")} component={DescriptionEdit}/>

                <Route exact path={getLink("manuals")} component={Manuals}/>
          </div>
        </Content>
      }
      </BrowserRouter>
    </div>
  );
};
