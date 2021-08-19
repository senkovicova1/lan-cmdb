import React, {
  useState,
  useMemo,
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  useDispatch
} from 'react-redux';
import {
  useTracker
} from 'meteor/react-meteor-data';

import Menu from './sidebar';

import {
  MenuIcon,
  LogoutIcon,
  CloseIcon,
  SearchIcon,
  LeftArrowIcon,
  UserIcon
} from "/imports/other/styles/icons";
import {
  MobilePageHeader as PageHeader,
  LinkButton,
  Input,
} from '/imports/other/styles/styledComponents';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function MobileHeader( props ) {

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
    dispatch( setCompanies( [] ) );
    dispatch( setItems( [] ) );
    Meteor.logout();
  }

  const [ openSidebar, setOpenSidebar ] = useState( false );
  const [ openSearch, setOpenSearch ] = useState( false );
  const [ title, setTitle ] = useState( "CMDB" );

  const avatar = useMemo( () => {
    if ( !currentUser || !currentUser.profile.avatar ) {
      return null;
    }
    return uint8ArrayToImg( currentUser.profile.avatar );
  }, [ currentUser ] );

  const searchVisible = !openSearch && currentUser;

  return (
    <PageHeader>
      {
        currentUser &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            setOpenSidebar(!openSidebar);
            setParentOpenSidebar(!openSidebar)
          }}
          >
          <img
            className="icon"
            src={MenuIcon}
            alt="Menu icon not found"
            />
        </LinkButton>
      }
      {
        !openSearch &&
        <h1 onClick={(e) => history.push(getGoToLink())}>{title}</h1>
      }

      {
        openSearch &&
        currentUser &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            setSearch("");
            setOpenSearch(false);
          }}
          >
          <img
            className="icon"
            src={LeftArrowIcon}
            alt="Left arrow icon not found"
            />
        </LinkButton>
      }
      {
        openSearch &&
        currentUser &&
        <div className="search-section">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      }
      {
        openSearch &&
        currentUser &&
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
      }

      {
        !openSearch &&
        currentUser &&
        <LinkButton
          style={{marginLeft: "auto"}}
          font="white"
          onClick={(e) => {
            e.preventDefault();
            setOpenSearch(true);
          }}
          >
          <img
            className="icon"
            src={SearchIcon}
            alt="Search icon not found"
            />
        </LinkButton>
      }

      {
        currentUser &&
        !match.params.passwordID &&
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
            history.push(getGoToLink("login"));
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

      {
        openSidebar &&
        currentUser &&
        <Menu {...props} closeSelf={() => setOpenSidebar(false)}/>
      }

    </PageHeader>
  );
};
