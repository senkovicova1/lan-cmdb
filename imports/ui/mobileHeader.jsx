import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import {
  Link
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
//import { setFolders } from '../redux/foldersSlice';

import { SettingsIcon, BackIcon, MenuIcon, LogoutIcon, DeleteIcon, CloseIcon, SearchIcon, LeftArrowIcon,  MenuIcon2, UserIcon } from  "/imports/other/styles/icons";

import Menu from './sidebar';

import {
  useTracker
} from 'meteor/react-meteor-data';
/*
import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';*/
import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  MobilePageHeader as PageHeader,
  LinkButton,
  FullButton,
  Input,
  Popover
} from '../other/styles/styledComponents';

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
    //dispatch(setFolders([]));
    Meteor.logout();
  }
/*
  const folderID = match.params.folderID;
  const folders = useSelector((state) => state.folders.value);
  const passwordID = match.params.passwordID;
  const passwords = useSelector((state) => state.passwords.value);*/

  const [ openSidebar, setOpenSidebar ] = useState(false);
  const [ openSearch, setOpenSearch ] = useState(false);
  const [ title, setTitle ] = useState("LanPass");
/*

  useEffect(() => {
    if (location.pathname === deletedFolders) {
        setTitle("Deleted folders");
    } else if (location.pathname.includes("password-add")) {
      setTitle("Add password");
    } else if (!folderID) {
      setTitle("LanPass");
    } else if (location.pathname.includes("history")) {
      setTitle("Password history");
    } else if (location.pathname.includes("version")) {
      let password = passwords.find(password => password._id === passwordID);
      if (password) {
        setTitle(`Version from ${moment.unix(password.updatedDate).format("D.M.YYYY HH:mm:ss")}`);
      } else {
        setTitle("LanPass");
      }
    } else {
      let folder = folders.find(folder => folder._id === folderID);
      if (folder) {
        setTitle(folder.name);
      } else {
        setTitle("LanPass");
      }
    }
  }, [folderID, location.pathname, folders]);
*/
  const avatar = useMemo(() => {
    if (!currentUser || !currentUser.profile.avatar){
      return null;
    }
    return uint8ArrayToImg(currentUser.profile.avatar);
  }, [currentUser]);

/*    const goBackInPage = useCallback(() => {
      switch (match.path) {
        case folders:
          break;
        case addFolder:
          history.goBack();
          break;
        case editFolder:
          history.push(`/folders/list/${match.params.folderID}`);
          break;
        case listPasswordsInFolder:
          history.push(`/folders`);
          break;

        case listDeletedPasswordsInFolder:
          history.push(`/folders/list/${match.params.folderID}`);
          break;
        case deletedFolders:
          history.push(`/folders`);
          break;
        case editCurrentUser:
          history.goBack();
          break;
        case addPassword:
          history.goBack();
          break;

        case editPassword:
          history.push(`/folders/list/${match.params.folderID}`);
          break;
        case viewPassword:
          history.push(`/folders/list/${match.params.folderID}`);
          break;
        case viewPreviousPassword:
          history.goBack();
          break;
        case passwordHistory:
          history.goBack();
          break;
        default:
          history.goBack();

      }
    }, [match.path, match.params, history]);
*/
    const searchVisible = !openSearch &&  currentUser;
/*
    const folderCanBeEdited = folders.find(folder => folder._id === folderID)?.users.find(user => user._id === currentUser._id).level === 0;
    const passwordCanBeEdited = passwordID ? folders.find(folder => folder._id === folderID)?.users.find(user => user._id === currentUser._id).level <= 0 : false;*/

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

      {/*
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
        match.params.passwordID &&
        !location.pathname.includes("history") &&
        !location.pathname.includes("edit") &&
        <LinkButton
          onClick={(e) => {
            e.preventDefault();
            toggleRevealPassword();
          }}
          >
        <img className="icon" src={EyeIcon} alt="reveal pass" />
        </LinkButton>
      }
      {
        match.params.passwordID &&
        !location.pathname.includes("history") &&
        passwordCanBeEdited &&
        <LinkButton
          onClick={(e) => {
            e.preventDefault();
            togglePopover();
          }}
          >
          <img className="icon" src={MenuIcon2} alt="menu icon" />
        </LinkButton>
      }

      {
        match.params.passwordID &&
        !location.pathname.includes("history") &&
        passwordCanBeEdited &&
        popoverOpen &&
        <Popover>
          <LinkButton
            onClick={(e) => {
              e.preventDefault();
              togglePopover();
              removePassword();
            }}
            >
            <img className="basic-icon" src={DeleteIcon} alt="delete" />
            Delete
          </LinkButton>
        </Popover>
      }

      {
        currentUser &&
        !match.params.passwordID &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            history.push(editCurrentUser);
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
        folderID &&
        currentUser &&
        folderCanBeEdited &&
        !location.pathname.includes("edit") &&
        !location.pathname.includes("password") &&
        !match.params.passwordID &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            history.push(`${editFolderStart}${folderID}`);
          }}
          >
          <img
            className="icon"
            src={SettingsIcon}
            alt="Settings icon not found"
            />
        </LinkButton>
      }

      {
        currentUser &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            history.push(login);
            logout();
          }}
          >
          <img
            className="icon"
            src={LogoutIcon}
            alt="Logout icon not found"
            />
        </LinkButton>
      */}

      {
        openSidebar &&
        currentUser &&
        <Menu {...props} closeSelf={() => setOpenSidebar(false)}/>
      }

    </PageHeader>
  );
};
