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

import {  MenuIcon, LogoutIcon, CloseIcon, UserIcon, MenuIcon2} from  "/imports/other/styles/icons";

import Menu from './sidebar';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  PageHeader,
  LinkButton,
  Input,
  Sort
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
    setParentOpenSidebar,
    parentOpenSidebar,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection
  } = props;

  const currentUser = useTracker( () => Meteor.user() );

  const logout = () => {
    dispatch(setCompanies([]));
    dispatch(setItems([]));
    Meteor.logout();
  }

  const [ openSidebar, setOpenSidebar ] = useState(true);
  const [ openSort, setOpenSort ] = useState(false);
  const [ title, setTitle ] = useState("CMDB");

  useEffect(() => {
    if (!parentOpenSidebar && openSidebar){
      setParentOpenSidebar(true);
    }
  }, [openSidebar, parentOpenSidebar]);

  const avatar = useMemo(() => {
    if (!currentUser || !currentUser.profile.avatar){
      return null;
    }
    return uint8ArrayToImg(currentUser.profile.avatar);
  }, [currentUser]);

  document.addEventListener("click", (evt) => {
      const sortMenu = document.getElementById("sort-menu");
      const openSortMenuBtn = document.getElementById("sort-menu-button");
      let targetElement = evt.target; // clicked element
      do {
          if (targetElement == sortMenu) {
              // This is a click inside. Do nothing, just return.
              return;
          }
          if (targetElement == openSortMenuBtn) {
              setOpenSort(!openSort);
              return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
      } while (targetElement);

      // This is a click outside.
      setOpenSort(false);
  });

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
        <h1 onClick={(e) => props.history.push(getGoToLink())}>{title}</h1>
      </section>

      <section className="header-section" style={{justifyContent: "flex-end"}}>

          {
            currentUser &&
            <LinkButton
              font="white"
              id="sort-menu-button"
              name="sort-menu-button"
              onClick={(e) => {
                e.preventDefault();
                setOpenSort(!openSort);
              }}
              >
              <img
                className="icon"
                src={MenuIcon2}
                alt="MenuIcon2 icon not found"
                />
            </LinkButton>
          }

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
      {
        openSort &&
        <Sort id="sort-menu" name="sort-menu">
          <h3>Sort by</h3>
          <span>
            <input
              id="sort-by-name-asc"
              name="sort-by-name-asc"
              type="checkbox"
              checked={sortBy === "name" && sortDirection === "asc"}
              onChange={() => {
                setSortBy("name");
                setSortDirection("asc");
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  setOpenSort(!openSort);
                }
              }}
              />
            <label htmlFor="sort-by-name-asc">Name (ascending)</label>
          </span>

            <span>
              <input
                id="sort-by-name-desc"
                name="sort-by-name-desc"
                type="checkbox"
                checked={sortBy === "name" && sortDirection === "desc"}
                onChange={() => {
                  setSortBy("name");
                  setSortDirection("desc");
                  if (/Mobi|Android/i.test(navigator.userAgent)) {
                    setOpenSort(!openSort);
                  }
                }}
                />
              <label htmlFor="sort-by-name-desc">Name (descending)</label>
            </span>

            <span>
              <input
                id="sort-by-date-asc"
                name="sort-by-date-asc"
                type="checkbox"
                checked={sortBy === "date" && sortDirection === "asc"}
                onChange={() => {
                  setSortBy("date");
                  setSortDirection("asc");
                  if (/Mobi|Android/i.test(navigator.userAgent)) {
                    setOpenSort(!openSort);
                  }
                }}
                />
              <label htmlFor="sort-by-name-asc">Date created (ascending)</label>
            </span>

              <span>
                <input
                  id="sort-by-date-desc"
                  name="sort-by-date-desc"
                  type="checkbox"
                  checked={sortBy === "date" && sortDirection === "desc"}
                  onChange={() => {
                    setSortBy("date");
                    setSortDirection("desc");
                    if (/Mobi|Android/i.test(navigator.userAgent)) {
                      setOpenSort(!openSort);
                    }
                  }}
                  />
                <label htmlFor="sort-by-name-asc">Date created (descending)</label>
              </span>
        </Sort>
      }

    </PageHeader>
  );
};
