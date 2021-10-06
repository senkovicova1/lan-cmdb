import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  Form,
  Input,
  Textarea,
  ButtonRow,
  FullButton,
} from "/imports/other/styles/styledComponents";

export default function PasswordForm( props ) {

  const {
    formTitle,
    _id,
    title: passTitle,
    login: passLogin,
    password: passPassword,
    ipUrl: passIpUrl,
    note: passNote,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const [ title, setTitle ] = useState( "" );
  const [ login, setLogin ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ ipUrl, setIpUrl ] = useState( "" );
  const [ note, setNote ] = useState( "" );

  useEffect( () => {
    if ( passTitle ) {
      setTitle( passTitle );
    } else {
      setTitle( "" );
    }
    if ( passLogin ) {
      setLogin( passLogin );
    } else {
      setLogin( "" );
    }
    if ( passPassword ) {
      setPassword( passPassword );
    } else {
      setPassword( "" );
    }
    if ( passIpUrl ) {
      setIpUrl( passIpUrl );
    } else {
      setIpUrl( "" );
    }
    if ( passNote ) {
      setNote( passNote );
    } else {
      setNote( "" );
    }
  }, [  passTitle, passLogin, passPassword, passIpUrl, passNote ] );

  return (
    <Form>

      <h1>{formTitle}</h1>

      <section>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          nic="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="login">Login</label>
        <Input
          id="login"
          name="login"
          type="text"
          placeholder="Enter login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="ipUrl">IP/URL:PORT</label>
        <Input
          id="ipUrl"
          name="ipUrl"
          type="text"
          placeholder="Enter ip/url"
          value={ipUrl}
          onChange={(e) => setIpUrl(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="note">Note</label>
        <Textarea
          id="note"
          name="note"
          type="text"
          placeholder="Enter note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          />
      </section>

      <ButtonRow>
        <FullButton
          colour=""
          disabled={title.length === 0}
          onClick={(e) => {e.preventDefault(); onSubmit(
            title,
            login,
            password,
            ipUrl,
            note,
            itemID,
            _id
          );}}
          >
          Save
        </FullButton>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        {onRemove && <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove()}}>Delete</FullButton>}
      </ButtonRow>

    </Form>
  );
};
