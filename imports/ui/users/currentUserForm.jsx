import React, {
  useState,
  useEffect,
} from 'react';
import {
  useTracker
} from 'meteor/react-meteor-data';

import {
  PencilIcon,
  BackIcon,
} from "/imports/other/styles/icons";

import {
  isEmail,
  uint8ArrayToImg
} from '../../other/helperFunctions';

import {
  Form,
  Card,
  Input,
  ButtonRow,
  BorderedLinkButton,
  BorderedFullButton
} from "../../other/styles/styledComponents";

export default function UserForm( props ) {

  const {
    title,
    user,
    onSubmit,
    onRemove,
    onCancel,
    isSignIn,
    openLogIn,
    errorMessage
  } = props;

  const currentUser = useTracker( () => Meteor.user() );

  const [ name, setName ] = useState( "" );
  const [ surname, setSurname ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ avatar, setAvatar ] = useState( {
    name: "",
    buffer: null,
    img: null
  } );
  const [ password1, setPassword1 ] = useState( '' );
  const [ password2, setPassword2 ] = useState( '' );
  const [ rights, setRights ] = useState( {
    addCompanies: false,
    manageCategories: false,
    manageUsers: false,
  } );
  const [ active, setActive ] = useState( true );

  const [ errors, setErrors ] = useState( [] );

  useEffect( () => {
    if (!user){
      setPassword1("lansystems123");
      setPassword2("lansystems123");
    }
    if ( user?.name ) {
      setName( user.name );
    } else {
      setName( "" );
    }
    if ( user?.surname ) {
      setSurname( user.surname );
    } else {
      setSurname( "" );
    }
    if ( user?.avatar ) {
      setAvatar( {
        name: "",
        buffer: user.avatar,
        img: user.img,
      } );
    } else {
      setAvatar( {
        name: "",
        buffer: null,
        img: null
      } );
    }
    if ( user?.rights ) {
      setRights( {...user.rights} );
    } else {
      setRights( {
        addCompanies: false,
        manageCategories: false,
        manageUsers: false,
      } );
    }
    if ( user?.active ) {
      setActive( user.active );
    } else {
      setActive( true );
    }
    setErrors( [] );
  }, [ user ] );

  return (
    <Form>
    <h2>Edit user</h2>

      <span className="command-bar">
        {
          onCancel &&
          <BorderedLinkButton
            fit={true}
            onClick={(e) => {
              e.preventDefault();
              onCancel()
            }}
            >
            <img
              src={BackIcon}
              alt=""
              className="icon"
              />
            Back
          </BorderedLinkButton>
        }
        {
          openLogIn &&
          <BorderedLinkButton
            fit={true}
            onClick={(e) => {
              e.preventDefault();
              openLogIn()
            }}
            >
            <img
              src={BackIcon}
              alt=""
              className="icon"
              />
            Cancel
          </BorderedLinkButton>
        }
        {
          onRemove &&
          false &&
          <BorderedLinkButton
            fit={true}
            onClick={(e) => {
              e.preventDefault();
              onRemove(userId);
              onCancel();
            }}
            >
            Delete
          </BorderedLinkButton>
        }
        <BorderedFullButton
          fit={true}
          onClick={(e) => {
            e.preventDefault();
            let errors = [];
            if (name.length === 0){
              errors.push("name");
            }
            if (surname.length === 0){
              errors.push("surname");
            }
            if (!user && !isEmail(email)){
              errors.push("email");
            }
            if  ((!user && password1 !== password2) || (!user && password1.length < 7)){
              errors.push("password");
            }
            if (name.length > 0 &&surname.length > 0 && (user || isEmail(email)) && (user || (password1 === password2 && password1.length >= 7)) ) {
              onSubmit(
                name,
                surname,
                avatar.buffer,
                active,
                rights,
                email,
                password1
              );
            }
            setErrors(errors);
          }}
          >
          <img
            src={PencilIcon}
            alt=""
            className="icon"
            />
          { isSignIn ? "Sign in" : "Save changes"}
        </BorderedFullButton>
      </span>

      <Card>

      <section>
        <label htmlFor="name">Name<span style={{color: "red"}}>*</span></label>
        <Input
          error={errors.includes("name") && true}
          id="name"
          name="name"
          placeholder="Enter name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.length > 0){
              setErrors(errors.filter(e => e !== "name"));
            }
          }}
          />
      </section>

      <section>
        <label htmlFor="surname">Surname<span style={{color: "red"}}>*</span></label>
        <Input
          error={errors.includes("surname") && true}
          id="surname"
          name="surname"
          placeholder="Enter surname"
          type="text"
          value={surname}
          onChange={(e) =>  {
            setSurname(e.target.value);
            if (e.target.value.length > 0){
              setErrors(errors.filter(e => e !== "surname"));
            }
          }}
          />
      </section>

      { !user &&
        <section>
          <label  htmlFor="email">Email<span style={{color: "red"}}>*</span></label>
          <Input
            error={errors.includes("email") && true}
            name="email"
            id="email"
            placeholder="Enter email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isEmail(e.target.value)){
                setErrors(errors.filter(e => e !== "email"));
              }
            }}
            />
        </section>
      }

      <section>
        <label htmlFor="avatar">Avatar</label>
        <div>
          {
            avatar.img &&
            <img src={avatar.img} alt="avatar" width="50" height="50"/>
          }
          <Input
            id="avatar"
            name="avatar"
            type="file"
            style={{display: "block"}}
            width="100%"
            value={avatar.name}
            onChange={(e) =>  {
              e.persist();
              var file = e.target.files[0];
              if (!file) return;
              var reader = new FileReader();
              reader.onload = function(event){
                var buffer = new Uint8Array(reader.result);
                const img = uint8ArrayToImg(buffer);
                setAvatar({name: e.target.value, buffer, img});
              }
              reader.readAsArrayBuffer(file);
            }}
            />
        </div>
      </section>


      { !user &&
        <section>
          <label htmlFor="password1">Password<span style={{color: "red"}}>*</span></label>
          <Input
            error={errors.includes("password") && true}
            type="password"
            placeholder="Password"
            id="password1"
            name="password1"
            type="password"
            value={password1}
            required
            onChange={e => {
              setPassword1(e.target.value);
              if (e.target.value === password2 && password2.length >= 7){
                setErrors(errors.filter(e => e !== "password"));
              }
            }}
            />
        </section>
      }
      { !user &&
        <section>
          <label htmlFor="password2">Repeat password<span style={{color: "red"}}>*</span></label>
          <Input
            error={errors.includes("password") && true}
            type="password"
            placeholder="Repeat password"
            id="password2"
            name="password2"
            type="password"
            value={password2}
            required
            onChange={e => {
              setPassword2(e.target.value);
              if (e.target.value === password1 && password1.length >= 7){
                setErrors(errors.filter(e => e !== "password"));
              }
            }}
            />
        </section>
      }

      {
        currentUser &&
      currentUser.profile.rights &&
    currentUser.profile.rights.manageUsers &&
    (!user || currentUser._id !== user._id) &&
      <section>
        <label>System settings</label>
        <table width="100%">
          <thead>
            <tr>
              <th width="25%">Active</th>
              <th width="25%">Add companies</th>
              <th width="25%">Manage categories</th>
              <th width="25%">Manage users</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>
                    <Input
                      id="active"
                      name="active"
                      type="checkbox"
                      checked={active}
                      onChange={() =>  {
                        setActive(!active);
                      }}
                      />
                  </td>
                    <td>
                      <Input
                        id="add-companies"
                        name="add-companies"
                        type="checkbox"
                        checked={rights.addCompanies}
                        onChange={(e) =>  {
                          setRights({
                            addCompanies: !rights.addCompanies,
                            manageCategories: rights.manageCategories,
                            manageUsers: rights.editUsers,
                          });
                        }}
                        />
                    </td>
                    <td>
                      <Input
                        id="manage-categories"
                        name="manage-categories"
                        type="checkbox"
                        checked={rights.manageCategories}
                        onChange={(e) =>  {
                          setRights({
                            addCompanies: rights.addCompanies,
                            manageCategories: !rights.manageCategories,
                            manageUsers: rights.editUsers,
                          });
                        }}
                        />
                    </td>
                    <td>
                      <Input
                        id="manage-users"
                        name="manage-users"
                        type="checkbox"
                        checked={rights.editUsers}
                        onChange={(e) =>  {
                          setRights({
                            addCompanies: rights.addCompanies,
                            manageCategories: rights.manageCategories,
                            manageUsers: !rights.editUsers,
                          });
                        }}
                        />
                    </td>
              </tr>
          </tbody>
        </table>
      </section>
      }

      {
        errorMessage &&
        <p>{errorMessage}</p>
      }

    </Card>

    </Form>
  );
};
