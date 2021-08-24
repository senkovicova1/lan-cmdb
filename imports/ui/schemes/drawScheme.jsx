import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

import {
  PencilIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  LinkButton,
  FloatingButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';


const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [150, 60],
      outputs: [ { id: 'port-1', alignment: 'right' }, { id: 'port-2', alignment: 'right' } ],
    },
  ]
});

const CustomRender = ({ id, content, data, inputs, outputs }) => (
    <div style={{background: 'purple'}}>
      <div style={{textAlign: 'right'}}>
        <LinkButton icon="times" size="small" onClick={()=>data.onClick(id)}/>
      </div>
      <div role="button" style={{padding: '15px'}}>
        {content}
      </div>
      <div style={{marginTop: '10px',display:'flex', justifyContent:'space-between'}}>
        {inputs.map((port) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
        {outputs.map((port) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
      </div>
    </div>
);

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const deleteNodeFromSchema = (id) => {
    const nodeToRemove = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
  };

  const addNewNode = () => {
    const nextNode = {
       id: `node-${schema.nodes.length+1}`,
       content: `Node ${schema.nodes.length+1}`,
       coordinates: [
         schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
         schema.nodes[schema.nodes.length - 1].coordinates[1],
       ],
       render: CustomRender,
       data: {onClick: deleteNodeFromSchema},
       inputs: [{ id: `port-${Math.random()}`}],
       outputs: [{ id: `port-${Math.random()}`}],
   };

   addNode(nextNode);
  }

  return (
    <div style={{ height: '30rem' }}>
      <LinkButton  onClick={(e) => {e.preventDefault(); addNewNode()}}>Add new node</LinkButton>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default function SchemeDraw( props ) {
  const {match, history} = props;
  const { companyID } = match.params;
return (
  <Form style={{minHeight: "100%"}}>

          <h1>Draw scheme</h1>

    <FloatingButton
      style={{position: "absolute", zIndex: "9"}}
      left
      onClick={(e) => {e.preventDefault(); history.push(getGoToLink("schemeView", {companyID}));}}
      >
      <img
        style={{marginRight: "2px"}}
        src={BackIcon}
        alt=""
        className="icon"
        />
    </FloatingButton>
    <UncontrolledDiagram />

</Form>
  );
};
