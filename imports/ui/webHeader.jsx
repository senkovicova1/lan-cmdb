import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  useTracker
} from 'meteor/react-meteor-data';
import { useDispatch } from 'react-redux';

import { setCompanies } from '/imports/redux/companiesSlice';
import { setItems } from '/imports/redux/itemsSlice';

import {  MenuIcon, LogoutIcon, CloseIcon, SearchIcon, UserIcon} from  "/imports/other/styles/icons";

import Menu from './sidebar';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  PageHeader,
  LinkButton,
  SearchSection,
  Input,
} from '../other/styles/styledComponents';

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function WebHeader( props ) {

  const dispatch = useDispatch();

  const {
    match,
    location,
    history,
    setSearch,
    search,
    setParentOpenSidebar,
  } = props;

  const currentUser = useTracker( () => Meteor.user() );

  const logout = () => {
    dispatch(setCompanies([]));
    dispatch(setItems([]));
    Meteor.logout();
  }

  const [ openSidebar, setOpenSidebar ] = useState(true);
  const [ openSearch, setOpenSearch ] = useState(true);
  const [ title, setTitle ] = useState("CMDB");

  const avatar = useMemo(() => {
    if (!currentUser || !currentUser.profile.avatar){
      return null;
    }
    return uint8ArrayToImg(currentUser.profile.avatar);
  }, [currentUser]);

  return (
    <PageHeader>
      <section className="header-section">
        {
          currentUser &&
          <LinkButton
            font="white"
            onClick={(e) => {
              e.preventDefault();
              setOpenSidebar(!openSidebar);
              setParentOpenSidebar(!openSidebar);
            }}
            >
            <img
              className="icon"
              src={MenuIcon}
              alt="Menu icon not found"
              />
          </LinkButton>
        }
        <h1 onClick={(e) => props.history.push(`${listPasswordsInFolderStart}all`)}>{title}</h1>
      </section>

      {
        currentUser &&
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
      }

      <section className="header-section" style={{justifyContent: "flex-end"}}>
        {
          currentUser &&
          <LinkButton
            font="white"
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink("currentUserEdit"));
            }}
            >
            {
              avatar &&
              <img className="avatar" src={avatar} alt="assignedAvatar" />
            }
            {
              !avatar &&
              <img className="icon" src={UserIcon} alt="assignedAvatar" />
            }
          </LinkButton>
        }

        {
          currentUser &&
          <LinkButton
            font="white"
            onClick={(e) => {
              e.preventDefault();
              props.history.push(getGoToLink("login"));
              logout();
            }}
            >
            <img
              className="icon"
              src={LogoutIcon}
              alt="Logout icon not found"
              />
          </LinkButton>
        }
      </section>

      {
        openSidebar &&
        currentUser &&
        <Menu {...props} closeSelf={() => setOpenSidebar(false)}/>
      }

    </PageHeader>
  );
};
