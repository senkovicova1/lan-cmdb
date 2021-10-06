import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  useSelector
} from 'react-redux';
import Select from 'react-select';

import {
  Form,
  Input,
  ButtonRow,
  FullButton,
  Textarea
} from "/imports/other/styles/styledComponents";
import {
  selectStyle
} from '/imports/other/styles/selectStyles';
import {
  countries
} from "/imports/other/constants";
import {
  isEmail
} from '/imports/other/helperFunctions';

export default function CompanyForm( props ) {
const {
  _id: companyId,
  name: companyName,
  description: companyDescription,
  users: companyUsers,
  onSubmit,
  onRemove,
  onCancel,
  title
} = props;

const userId = Meteor.userId();

const dbUsers = useSelector( ( state ) => state.users.value );

const [ name, setName ] = useState( "" );
const [ description, setDescription ] = useState( "" );

const [ users, setUsers ] = useState( [] );

const [ errors, setErrors ] = useState( [] );

useEffect( () => {
  if ( companyName ) {
    setName( companyName );
  } else {
    setName( "" );
  }
  if ( companyDescription ) {
    setDescription( companyDescription );
  } else {
    setDescription( "" );
  }
  if ( companyUsers ) {
    setUsers( companyUsers );
  } else {
    setUsers( [ {
      _id: userId,
      level: 0
      } ] );
  }
  setErrors( [] );
}, [ companyName, companyDescription, companyUsers ] );

const usersWithRights = useMemo( () => {
  return users.map( user => {
    let newUser = {
      ...dbUsers.find( u => u._id === user._id ),
      level: user.level
    };
    return newUser;
  } ).sort( ( u1, u2 ) => ( u1.level > u2.level ? 1 : -1 ) );
}, [ users, dbUsers ] );

const usersToSelect = useMemo( () => {
  return dbUsers.filter( user => !users.find( u => u._id === user._id ) );
}, [ dbUsers, users ] );

  const userCanChangeRights = users.find(user => user._id === userId)?.level === 0;

  return (
    <Form>

      <h1>{title}</h1>

      <section>
        <label htmlFor="name">
          Name
          <span style={{color: "red"}}>*</span>
        </label>
        <Input
          error={errors.includes("name") && true}
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
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
        <label htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          type="text"
          placeholder="Enter name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </section>
      {
        userCanChangeRights &&
      <section>
        <Select
          styles={selectStyle}
          value={{label: "Choose another user", value: 0}}
          onChange={(e) => {
            setUsers([...users, {_id: e._id, level: 2}]);
          }}
          options={usersToSelect}
          />
      </section>
    }
{
  userCanChangeRights &&
      <section>
        <table width="100%">
          <thead>
            <tr>
              <th width="33%"> Name </th>
              <th width="33%">Edit items</th>
              <th width="33%">View items</th>
            </tr>
          </thead>
          <tbody>
            {
              usersWithRights.map((user) => (
              <tr key={user._id}>
                <td>{user.label}</td>
                  <td>
                    <Input
                      id="write"
                      name="write"
                      type="checkbox"
                      disabled={user.level === 0}
                      checked={user.level <= 1}
                      onChange={(e) =>  {
                        let newUsers = [];
                        if (user.level === 1) {
                          newUsers = users.map((u) => {
                            if (user._id !== u._id){
                              return u;
                            }
                            return ({_id: user._id, level: 2});
                          })
                        } else {
                          newUsers = users.map((u) => {
                            if (user._id !== u._id){
                              return u;
                            }
                            return ({_id: user._id, level: 1});
                          })
                        }
                        setUsers(newUsers);
                      }}
                      />
                </td>
                    <td>
                      <Input
                        id="read"
                        name="read"
                        type="checkbox"
                        disabled={user.level === 0}
                        checked
                        onChange={(e) =>  {
                          let newUsers = users.filter((u) => (user._id !== u._id));
                          setUsers(newUsers);
                        }}
                        />
                    </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </section>
    }

      <ButtonRow>
        <FullButton
          colour=""
          onClick={(e) => {
            e.preventDefault();
            let errors = [];
            if (name.length === 0){
              errors.push("name");
            }
            if (name.length > 0) {
              onSubmit(
                name,
                description,
                users
              );
            }
            setErrors(errors);
          }}
          >
          Save
        </FullButton>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel();}}>Cancel</FullButton>
        {onRemove &&
          <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove();}}>Delete</FullButton>
        }
      </ButtonRow>

    </Form>
  );
};
