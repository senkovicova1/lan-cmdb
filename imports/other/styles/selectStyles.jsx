export const selectStyle = {
  control: ( base, state ) => ( {
    ...base,
    minHeight: 30,
    height: "2.5em",
    backgroundColor: 'white',
    border: state.isFocused ? "1px solid #0078d4" : "1px solid #d6d6d6",
    borderRadius: 0,
    width: "100%",
  } ),
  dropdownIndicator: base => ( {
    ...base,
    color: "transparent",
    padding: 4,
  } ),
  clearIndicator: base => ( {
    ...base,
    padding: 4,
  } ),
  multiValue: ( base, {
    data
  } ) => {
    return {
      ...base,
      backgroundColor: data.color ? data.color : "#F2F1F1",
      borderRadius: 0,
    };
  },
  multiValueLabel: ( base, {
    data
  } ) => ( {
    ...base,
    color: data.color ? "white" : "black",
  } ),
  multiValueRemove: ( styles, {
    data
  } ) => ( {
    ...styles,
    color: data.color ? "white" : "black",
    backgroundColor: data.color ? data.color : "#F2F1F1",
    ':hover': {
      backgroundColor: "rgba(0,0,0,0.5)",
      color: 'white',
    },
  } ),
  valueContainer: base => ( {
    ...base,
    padding: '0px 6px',
    borderRadius: 0,
    font: '14px Segoe UI',
    color: '#333',
  } ),
  input: base => ( {
    ...base,
    margin: 0,
    padding: 0,
    backgroundColor: "inherit",
    borderRadius: 0
  } ),
  indicatorSeparator: base => ( {
    ...base,
    width: 0,
  } ),
  placeholder: base => ( {
    ...base,
    font: '14px Segoe UI',
    color: '#777',
  } ),
  menu: base => ( {
    ...base,
    zIndex: 50,
    display: "block !important"
  } ),
};

export const invisibleSelectStyle = {
  container: ( base, state ) => ( {
    ...base,
    width: '-webkit-fill-available',
    height: "2.5em",
    padding: "0px 15px",
  } ),
  control: ( base, state ) => ( {
    ...base,
    backgroundColor: 'transparent',
    border: state.isFocused ? "0px solid #0078d4" : "0px solid #d6d6d6",
    width: '100%',
    borderRadius: 0,
    color: "#0078d4",
  } ),
  dropdownIndicator: base => ( {
    ...base,
    padding: 4,
    paddingRight: "0px",
    color: "#0078d4",
  } ),
  clearIndicator: base => ( {
    ...base,
    padding: 4,
  } ),
  multiValue: ( base, {
    data
  } ) => {
    return {
      ...base,
      backgroundColor: data.color ? data.color : "#F2F1F1",
      borderRadius: 0,
    };
  },
  multiValueLabel: ( base, {
    data
  } ) => ( {
    ...base,
    color: data.color ? "white" : "black",
  } ),
  multiValueRemove: ( styles, {
    data
  } ) => ( {
    ...styles,
    color: data.color ? "white" : "black",
    backgroundColor: data.color ? data.color : "#F2F1F1",
    ':hover': {
      backgroundColor: "rgba(0,0,0,0.5)",
      color: 'white',
    },
  } ),
  valueContainer: base => ( {
    ...base,
    padding: '0px',
    borderRadius: 0,
    font: '1em Segoe UI',
    color: '#333',
  } ),
  singleValue: base => ( {
    ...base,
    color: "#0078d4",
  } ),
  input: base => ( {
    ...base,
    margin: 0,
    padding: 0,
    backgroundColor: "inherit",
    borderRadius: 0
  } ),
  indicatorSeparator: base => ( {
    ...base,
    width: 0,
  } ),
  placeholder: base => ( {
    ...base,
    font: '14px Segoe UI',
    color: '#777',
  } ),
  menu: base => ( {
    ...base,
    zIndex: 50,
    font: '1.3em Segoe UI',
  } ),
};

export const borderedSelectStyle = {
  container: ( base, state ) => ( {
    ...base,
    width: '-webkit-fill-available',
    height: "2.5em",
    padding: "0px 15px",
  } ),
  control: ( base, state ) => ( {
    ...base,
    backgroundColor: 'transparent',
    color: "#0078d4",
    border: "1px solid #0078d4 !important",
    borderRadius: "10px",
    width: '100%',
  } ),
  dropdownIndicator: base => ( {
    ...base,
    padding: 4,
    paddingRight: "0px",
    color: "#0078d4",
  } ),
  clearIndicator: base => ( {
    ...base,
    padding: 4,
  } ),
  multiValue: ( base, {
    data
  } ) => {
    return {
      ...base,
      backgroundColor: data.color ? data.color : "#F2F1F1",
    };
  },
  multiValueLabel: ( base, {
    data
  } ) => ( {
    ...base,
    color: data.color ? "white" : "black",
  } ),
  multiValueRemove: ( styles, {
    data
  } ) => ( {
    ...styles,
    color: "#0078d4",
    backgroundColor: "#F2F1F1",
    ':hover': {
      backgroundColor: "rgba(0,0,0,0.5)",
      color: 'white',
    },
  } ),
  valueContainer: base => ( {
    ...base,
    padding: '0px',
    borderRadius: 0,
    font: '1em Segoe UI',
    color: "#0078d4",
  } ),
  singleValue: base => ( {
    ...base,
    padding: '0px',
    borderRadius: 0,
    font: '1em Segoe UI',
    color: "#0078d4",
  } ),
  input: base => ( {
    ...base,
    margin: 0,
    padding: 0,
    backgroundColor: "inherit",
    borderRadius: 0
  } ),
  indicatorSeparator: base => ( {
    ...base,
    width: 0,
  } ),
  placeholder: base => ( {
    ...base,
    font: '14px Segoe UI',
    color: "#0078d4",
  } ),
  menu: base => ( {
    ...base,
    zIndex: 50,
    font: '1.3em Segoe UI',
  } ),
};
