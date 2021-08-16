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
import { setItemCategories } from '../redux/itemCategoriesSlice';
/*import { setPasswords } from '../redux/passwordsSlice';*/
import { setUsers } from '../redux/usersSlice';
import {
  CompaniesCollection
} from '/imports/api/companiesCollection';
import {
  ItemCategoriesCollection
} from '/imports/api/itemCategoriesCollection';
/*
import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';*/
import {
  useTracker
} from 'meteor/react-meteor-data';

import Reroute from './reroute';
import Header from './header';
import Login from './login';
import ItemCategoryAdd from './itemCategories/addItemCategoryContainer';
import ItemCategoryEdit from './itemCategories/editItemCategoryContainer';
/*import FolderList from './folders/folderList';
import FolderEdit from './folders/editFolderContainer';
import PasswordList from './passwords/passwordList';
import PasswordHistoryList from './passwords/passwordHistoryList';
import EditUserContainer from './users/editUserContainer';
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


  const itemCategories = useTracker( () => ItemCategoriesCollection.find( {} ).fetch() );

  useEffect(() => {
    if (itemCategories.length > 0){
      dispatch(
        setItemCategories(
          [
          {label: "All categories", value: "all-categories"},
          ...itemCategories.map(itemCategory => ({...itemCategory, label: itemCategory.name, value: itemCategory._id}))
          ]
        )
      );
    }
  }, [itemCategories]);

  /*
  const savedFolderIds = folders.map(folder => folder._id);
  const passwords = useTracker( () => PasswordsCollection.find( { folder:  { $in: savedFolderIds} } ).fetch() );
  useEffect(() => {
    if (passwords.length > 0){
      dispatch(setPasswords(passwords));
    }
  }, [ passwords ]);
*/
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
            getLink("addItemCategory"),
            getLink("editItemCategory"),
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
        currentUser &&
          <Content>
            <div style={{height: "100%", position: "relative"}}>

            <Route
              exact
              path={getLink("addItemCategory")}
              render={(props) => (
                <ItemCategoryAdd
                  {...props}
                  />
              )}
              />

              <Route
                exact
                path={getLink("editItemCategory")}
                render={(props) => (
                  <ItemCategoryEdit
                    {...props}
                    />
                )}
                />

          </div>
        </Content>
{/*
              <Route
                exact
                path={deletedFolders}
                render={(props) => (
                  <FolderList {...props} active={false} search={search} />
                )}
                />

              <Route exact path={editFolder} component={FolderEdit} />

              <Route
                exact
                path={["/", listAllPasswords, listPasswordsInFolder]}
                render={(props) => (
                  <PasswordList
                    {...props}
                    search={search}
                    active={true}
                    />
                )}
                />

              <Route
                exact
                path={listDeletedPasswordsInFolder}
                render={(props) => (
                  <PasswordList
                    {...props}
                    search={search}
                    active={false}
                    />
                )}
                />

              <Route
                exact
                path={editCurrentUser}
                render={(props) => (
                  <EditUserContainer {...props} />
                )}
                />

              <Route
                exact
                path={addPassword}
                render={(props) => (
                  <PasswordAdd
                    {...props}
                    revealPassword={revealPassword}
                    />
                )}
                />

              <Route
                exact
                path={editPassword}
                render={(props) => (
                  <PasswordEdit
                    {...props}
                    revealPassword={revealPassword}
                    />
                )}
                />

              <Route
                exact
                path={[viewPassword, viewPreviousPassword]}
                render={(props) => (
                  <PasswordView
                    {...props}
                    revealPassword={revealPassword}
                    />
                )}
                />

              <Route
                exact
                path={passwordHistory}
                render={(props) => (
                  <PasswordHistoryList
                    {...props}
                    search={search}
                    />
                )}
                />

            </div>
          </Content>
        */}
      </BrowserRouter>
    </div>
  );
};
