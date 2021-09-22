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
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";

export default function AddressForm( props ) {

  const {
    title,
    _id,
    nic: addrNic,
    ip: addrIp,
    mask: addrMask,
    gateway: addrGateway,
    dns: addrDns,
    vlan: addrVlan,
    note: addrNote,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const [ nic, setNic ] = useState( "" );
  const [ ip, setIp ] = useState( "" );
  const [ mask, setMask ] = useState( "" );
  const [ gateway, setGateway ] = useState( "" );
  const [ dns, setDns ] = useState( "" );
  const [ vlan, setVlan ] = useState( "" );
  const [ note, setNote ] = useState( "" );

  useEffect( () => {
    if ( addrNic ) {
      setNic( addrNic );
    } else {
      setNic( "" );
    }
    if ( addrIp ) {
      setIp( addrIp );
    } else {
      setIp( "" );
    }
    if ( addrMask ) {
      setMask( addrMask );
    } else {
      setMask( "" );
    }
    if ( addrGateway ) {
      setGateway( addrGateway );
    } else {
      setGateway( "" );
    }
    if ( addrDns ) {
      setDns( addrDns );
    } else {
      setDns( "" );
    }
    if ( addrVlan ) {
      setVlan( addrVlan );
    } else {
      setVlan( "" );
    }
    if ( addrNote ) {
      setNote( addrNote );
    } else {
      setNote( "" );
    }
  }, [  addrNic, addrIp, addrMask, addrGateway, addrDns, addrVlan, addrNote ] );

  return (
    <Form>

      <h1>{title}</h1>

      <section>
        <label htmlFor="nic">NIC</label>
        <Input
          id="nic"
          nic="nic"
          type="text"
          placeholder="Enter nic"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="ip">IP</label>
        <Input
          id="ip"
          name="ip"
          type="text"
          placeholder="Enter ip"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="mask">Mask</label>
        <Input
          id="mask"
          name="mask"
          type="text"
          placeholder="Enter mask"
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="gateway">Gateway</label>
        <Input
          id="gateway"
          name="gateway"
          type="text"
          placeholder="Enter gateway"
          value={gateway}
          onChange={(e) => setGateway(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="dns">DNS</label>
        <Input
          id="dns"
          name="dns"
          type="text"
          placeholder="Enter dns"
          value={dns}
          onChange={(e) => setDns(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="vlan">VLAN</label>
        <Input
          id="vlan"
          name="vlan"
          type="text"
          placeholder="Enter vlan"
          value={vlan}
          onChange={(e) => setVlan(e.target.value)}
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

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        {onRemove && <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove()}}>Delete</FullButton>}
        <FullButton
          colour=""
          disabled={nic.length === 0}
          onClick={(e) => {e.preventDefault(); onSubmit(
            nic,
            ip,
            mask,
            gateway,
            dns,
            vlan,
            note,
            _id
          );}}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
