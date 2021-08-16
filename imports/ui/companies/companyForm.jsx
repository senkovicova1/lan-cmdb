import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import Select from 'react-select';

import {
  selectStyle
} from '../../other/styles/selectStyles';

import { DeleteIcon } from  "/imports/other/styles/icons";
import { countries } from  "/imports/other/constants";

import {
  uint8ArrayToImg,
  isEmail
} from '../../other/helperFunctions';

import { useSelector } from 'react-redux';

import {
  Form,
  Input,
  ButtonCol,
  LinkButton,
  FullButton,
  UserEntry,
  Textarea
} from "../../other/styles/styledComponents";

export default function FolderForm( props ) {

  const {
    _id: companyId,
    name: companyName,
    DPH: companyDPH,
    ICO: companyICO,
    DIC: companyDIC,
    IC_DPH: companyIC_DPH,
    country: companyCountry,
    city: companyCity,
    street: companyStreet,
    ZIP: companyZIP,
    email: companyEmail,
    phone: companyPhone,
    description: companyDescription,
    users: companyUsers,
    onSubmit,
    onRemove,
    onCancel,
    match,
    location,
    title
  } = props;

const dbUsers = useSelector((state) => state.users.value);

const userId = Meteor.userId();

  const [ name, setName ] = useState( "" );
  const [ DPH, setDPH ] = useState( "" );
  const [ ICO, setICO ] = useState( "" );
  const [ DIC, setDIC ] = useState( "" );
  const [ IC_DPH, setIC_DPH ] = useState( "" );
  const [ country, setCountry ] = useState( {} );
  const [ city, setCity ] = useState( "" );
  const [ street, setStreet ] = useState( "" );
  const [ ZIP, setZIP ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ phone, setPhone ] = useState( "" );
  const [ description, setDescription ] = useState( "" );

  const [ users, setUsers ] = useState( [] );

  useEffect( () => {
    if ( companyName ) {
      setName( companyName );
    } else {
      setName( "" );
    }
    if ( companyDPH ) {
      setDPH( companyDPH );
    } else {
      setDPH( "" );
    }
    if ( companyICO ) {
      setICO( companyICO );
    } else {
      setICO( "" );
    }
    if ( companyDIC ) {
      setDIC( companyDIC );
    } else {
      setDIC( "" );
    }
    if ( companyIC_DPH ) {
      setIC_DPH( companyIC_DPH );
    } else {
      setIC_DPH( "" );
    }
    if ( companyCountry ) {
      setCountry( countries.find(country => country.value === companyCountry) );
    } else {
      setCountry( "" );
    }
    if ( companyCity ) {
      setCity( companyCity );
    } else {
      setCity( "" );
    }
    if ( companyStreet ) {
      setStreet( companyStreet );
    } else {
      setStreet( "" );
    }
    if ( companyZIP ) {
      setZIP( companyZIP );
    } else {
      setZIP( "" );
    }
    if ( companyEmail ) {
      setEmail( companyEmail );
    } else {
      setEmail( "" );
    }
    if ( companyPhone ) {
      setPhone( companyPhone );
    } else {
      setPhone( "" );
    }
    if ( companyDescription ) {
      setDescription( companyDescription );
    } else {
      setDescription( "" );
    }
    if ( companyUsers ) {
      setUsers( companyUsers );
    } else {
      setUsers( [{_id: userId, level: 0}] );
    }
}, [ companyName, companyDPH, companyICO, companyDIC, companyIC_DPH, companyCountry, companyCity, companyStreet, companyZIP, companyEmail, companyPhone, companyDescription, companyUsers ] );

  const usersWithRights = useMemo(() => {
   return users.map(user =>
        {
        let newUser = {...dbUsers.find(u => u._id === user._id), level: user.level};
        return newUser;
      }). sort((u1, u2) => (u1.level > u2.level ? 1 : -1));
  }, [users, dbUsers]);

  const usersToSelect = useMemo(() => {
    return dbUsers.filter(user => !users.find(u => u._id === user._id));
  }, [dbUsers, users]);

  return (
    <Form>

      <h1>{title}</h1>

      <section>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="dph">DPH</label>
        <Input
          id="dph"
          name="dph"
          type="text"
          placeholder="Enter name"
          value={DPH}
          onChange={(e) => setDPH(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="ico">ICO</label>
        <Input
          id="ico"
          name="ico"
          type="text"
          placeholder="Enter name"
          value={ICO}
          onChange={(e) => setICO(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="dic">DIC</label>
        <Input
          id="dic"
          name="dic"
          type="text"
          placeholder="Enter name"
          value={DIC}
          onChange={(e) => setDIC(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="ic_dph">IC DPH</label>
        <Input
          id="ic_dph"
          name="ic_dph"
          type="text"
          placeholder="Enter name"
          value={IC_DPH}
          onChange={(e) => setIC_DPH(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="country">Country</label>
          <Select
            styles={selectStyle}
            value={country}
            onChange={(e) => {
              setUsers([...users, {_id: e._id, level: 2}]);
            }}
            options={countries}
            />
      </section>

      <section>
        <label htmlFor="city">City</label>
        <Input
          id="city"
          name="city"
          type="text"
          placeholder="Enter name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="street">Street</label>
        <Input
          id="street"
          name="street"
          type="text"
          placeholder="Enter name"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="psc">PSČ</label>
        <Input
          id="psc"
          name="psc"
          type="text"
          placeholder="Enter name"
          value={ZIP}
          onChange={(e) => setZIP(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="email">E-mail</label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Enter name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="phone">Phone</label>
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter name"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          type="text"
          placeholder="Enter name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </section>

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

      <section>
        <table width="100%">
          <thead>
            <tr>
              <th width="33%"> Name </th>
              <th width="33%">Edit passwords</th>
              <th width="33%">View passwords</th>
            </tr>
          </thead>
          <tbody>
            {usersWithRights.map((user) => (
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
            ))}
          </tbody>
        </table>
      </section>

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel();}}>Cancel</FullButton>
        {onRemove &&
          <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove(folderId);}}>Delete</FullButton>
        }
        <FullButton
          colour=""
          disabled={name.length === 0 || (email.length > 0 && !isEmail(email)) || ICO.length === 0}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(
               name,
               DPH,
               ICO,
               DIC,
               IC_DPH,
               country.value,
               city,
               street,
               ZIP,
               email,
               phone,
               description,
               users
            );
          }}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
