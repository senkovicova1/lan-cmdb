import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCompanies } from '../redux/companiesSlice';
import { setCategories } from '../redux/categoriesSlice';
import { setItems } from '../redux/itemsSlice';
import { setUsers } from '../redux/usersSlice';
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
  useTracker
} from 'meteor/react-meteor-data';

import Reroute from './reroute';
import Header from './header';
import Login from './login';
import CategoryAdd from './categories/addContainer';
import CategoryEdit from './categories/editContainer';
import ItemAdd from './items/addContainer';
import ItemEdit from './items/editContainer';
import ItemsList from './items/list';
import ItemView from './items/view';
import EditUserContainer from './users/editUserContainer';
/*import FolderList from './folders/folderList';
import FolderEdit from './folders/editFolderContainer';
import PasswordList from './passwords/passwordList';
import PasswordHistoryList from './passwords/passwordHistoryList';
import PasswordAdd from './passwords/addPasswordContainer';
import PasswordEdit from './passwords/editPasswordContainer';
import PasswordView from './passwords/passwordView';*/


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
    if (companies.length > 0){
      dispatch(
        setCompanies(
          [
          {label: "All companies", value: "all-companies"},
          ...companies.map(company => ({...company, label: company.name, value: company._id}))
          ]
        )
      );
    }
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

  const [ search, setSearch ] = useState( "" );
  const [ openSidebar, setOpenSidebar ] = useState( false );

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
              />
          )}
          />
        {!currentUser &&
          <Content>
            <Route path={["/", getLink("login")]} component={Login} />
          </Content>
        }
        {
          currentUser &&
          <Content>
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
                        />
                    )}
                  />

                <Route exact path={getLink("viewItem")} component={ItemView}/>
          </div>
        </Content>
      }
      </BrowserRouter>
    </div>
  );
};
