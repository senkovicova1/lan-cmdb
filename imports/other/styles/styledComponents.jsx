import styled from 'styled-components'

//colours
const backgroundColour = "#f6f6f6";
const phColour = "#004578";
const basicBlueColour = "#0078d4";
const lightBlueColour = "#deeaf3";

//numeric values
const contentOffset = "calc((100vw - 800px)/2)";
const sidebarWidthWeb = "250px";
const sidebarWidthMobile = "300px";
const inputOffset = "15px";
const elementOffset = "24.9px"; //1.2em

export const MainPage = styled.div `
  overflow: hidden;
  font-size: 1em;
  text-align: left;
  line-height: 1.5em;

  h1, h2, h3, h4 {
    font-weight: lighter;
  }

  h2 {
    font-size: 1.3em;
  }

  ul {
    list-style-type: none;
  }

  .ck ul, form ul {
    list-style-type: circle !important;
  }

  label {
    margin: 0px;
  }

  hr{
    color: #d6d6d6;
    margin: 0px;
    opacity: 1;
  }

  img.icon {
    height: 1em !important;
    filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
  }

  img.avatar {
    width:32px;
    height: 32px;
    border-radius: 50px;
  }

  img.scheme{
    width: auto;
    max-width: 100%;
    height: auto;
    border-radius: 0px;
    margin: 0px;
    cursor: zoom-in;
  }

  img.enlarged-scheme{
    width: auto;
    height: auto;
    border-radius: 0px;
    margin: 0px;
    cursor: zoom-in;
  }

  .cke_content > iframe{
  width: 100% !important;
  }
  .cke_contents > iframe{
  width: 100% !important;
  }

  .ck-editor__editable_inline {
      min-height: 200px;
  }

  section.description{
    table td, table th {
      background-color: white;
      border: 1px solid #d6d6d6;
      min-width: 150px;
      padding: 0.3em 0.6em;
      text-align: center;
    }
    table tr:first-of-type td, table tr:first-of-type td {
      font-weight: 500;
    }

    blockquote{
      border-left: 4px solid #d6d6d6;
      padding: 0.5em 1em;
      font-style: italic;
    }
  }
`;

export const MobilePageHeader = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 50px;
  background-color: ${basicBlueColour};
    padding: 0px ${inputOffset};
    i {
      font-size: 1.5em;
    }
    img.icon {
      filter: invert(1);
      height: 1.5em;
      width: 1.5em;
      margin-right: 0px;
    }
    img.search-icon{
      height: 1.3em;
      width: 1.3em;
    }
    button{
      i{
        margin: 0px !important;
      }
      margin-right: 1em;
    }
    button:last-of-type{
        margin: 0px !important;
    }

    h1 {
      height: 32px;
      padding-left: 0em;
      display: inline;
      font-size: 1.5em;
      color: white;
      margin-bottom: 0em;
    }

    div.search-section{
      width: -webkit-fill-available;
      input{
        width: -webkit-fill-available;
        border: none !important;
        outline: none !important;
      }
      input:focus{
        border: none !important;
      }
    }
`;

export const PageHeader = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 50px;
  background-color: ${basicBlueColour};
  padding: 0px ${inputOffset};

  section.header-section{
    width: 300px;
    align-items: center;
    display: flex;

     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;

  button{
    margin-right: 1em;
  }
  button:last-of-type{
    margin: 0px !important;
  }

  h1 {
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
    height: 32px;
    padding-left: 0em;
    display: inline;
    font-size: 1.5em;
    color: white;
    margin-bottom: 0em;
    margin-left: 1em;
  }

  img.icon {
    filter: invert(1);
    height: 1.5em;
    width: 1.5em;
    margin-right: 0px;
  }
  }

  div.search-section{
    width: -webkit-fill-available;
    input{
      width: -webkit-fill-available;
      border: none !important;
      outline: none !important;
    }
    input:focus{
      border: none !important;
    }
`;

export const SearchSection = styled.section `
  display: flex;
  width: 800px !important;
  input{
    width: -webkit-fill-available;
    border: none !important;
    outline: none !important;
  }
  input:focus{
    border: none !important;
  }

    img.search-icon{
      height: 1.3em;
      width: 1.3em;
    }

  button:last-of-type {
    margin-left: 0em !important;
    margin-right: 1em;
    padding-left: ${inputOffset};
  }

  button:first-of-type {
    margin-right: 0em;
    padding-left: ${inputOffset};
    margin-left: ${inputOffset};
  }
`;

export const Content = styled.main `
  display: block;
  height: calc(100vh - 50px);
  margin: 0px;
  margin-left: 250px;
  padding-right: 0px;
  overflow-x: auto;
`;

export const Breadcrumbs = styled.div`
  width: 100%;
  padding: ${elementOffset};
  display: flex;
  font-size: 1.3em;
  font-weight: 300 !important;
  &>span{
    display: flex;
    align-items: center;
  }
  &>span>button{
    height: fit-content;
    font-weight: 300 !important;
    margin: 0em 0.3em;
    color: black !important;
    text-decoration: none;
    }
  &>span:first-of-type>button{
    margin-left: 0px !important;
  }
`;

export const Sidebar = styled.section `
  background-color: ${backgroundColour};
  position: absolute;
  left: 0;
  @media all and (max-width: 799px), @media handheld  {
    box-shadow: 5px 0px 13px 0px slategrey;
    width: ${sidebarWidthMobile};
  }
  @media all and (min-width: 800px){
    box-shadow: none;
    border-right: 0px solid #d6d6d6;
    width: ${sidebarWidthWeb};
    background-color: white;
  }
  top: 50px;
  height: calc(100vh - 50px);
  z-index: 3;
  padding: 0px;

  button {
    padding: 10px ${inputOffset};
    height: 3em;
  }
  a {
    width: calc(100%);
    color: ${basicBlueColour} !important;
    display: flex;
    align-items: center;
    height: 3em;
    padding: 10px ${inputOffset};
    text-decoration: none !important;
    i, img.icon{
      margin-right: 10px;
    }
    img.icon{
      filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(80%) contrast(101%);
    }
  }

  a.active {
    background-color: ${basicBlueColour}22;
      width: calc(100% - ${inputOffset} - 26px);
  }

  div.nav{
    justify-content: space-between;

    button{
      margin: 0px;
      padding: 0px 15px 0px 0px;
      display: none;
      width: 41px;
      img.icon{
        filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(80%) contrast(101%);
      }
    }

    a.active + button {
      background-color: ${basicBlueColour}22 !important;
      display: flex;
    }
  }

  label.selector-name{
    height: 3em;
    line-height: 3em;
    width: 100%;
    font-weight: 300;
    font-size: 0.8em;
    padding: 0px 15px;
    img.icon{
      height: 1em;
      margin-right: 0.6em;
      filter: invert(0);
    }
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  height: -webkit-fill-available;

  div.left-section{
    width: 43%;
  }

  div.right-section{
    background: white;
    width: 57%;
  }
`;

export const ManualInfo = styled.div`
  display: flex;
  padding: 1em ${elementOffset};
  align-items: center;
  border-top: 1px solid #d6d6d6;

  &:last-of-type{
    border-bottom: 1px solid #d6d6d6;
  }

  &:hover{
    background-color: ${lightBlueColour};
    cursor: pointer;
  }

  ${(props) => props.active && `
    background-color: ${lightBlueColour};
    `};

  span.title{
    width: 50%;
  }

  div.info{
    width: 50%;
    font-size: 0.8em;
    color: #acacac;
    text-align: end;
    height: fit-content;
  }

  div.info span{
    display: block;
  }
`;

export const ButtonRow = styled.section `
  display: flex;
  margin-top: 0em !important;
  margin-bottom: 0em;
  button {
    width: 150px;
  }
  button:first-of-type{
    margin-right: 0.5em;
  }
  button:last-of-type{
    margin-left: 0.5em;
  }
`;

export const ButtonCol = styled.section `
  margin-top: 0em !important;
  button:not(last-of-type) {
    margin-bottom: 1.5em;
  }
  button:last-of-type {
    margin-bottom: 0em;
  }
`;

export const LinkButton = styled.button `
  color: ${(props) => props.font ? props.font : basicBlueColour};
  padding: 0px;
  height: ${(props) => props.fit ? "fit-content" : "2.5em"};
  background-color: ${(props) => props.searchButton ? "white" : "transparent" } !important;
  outline: none !important;
  border: none !important;
  line-height: 1em;
  display: flex;
  align-items: center;
  i, img {
    margin-right: ${(props) => props.searchButton ? "0.6em" : "0.3em" }
  }
  img {
    ${(props) => props.searchButton && `
      filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(191deg) brightness(97%) contrast(101%) !important;
      `};
  }

      img.basic-icon {
          height: 1.5em;
          width: 1.5em;
          filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
      }
`;

export const FullButton = styled.button `
  width: 100%;
  color: white;
  padding: 0px;
  background-color: ${(props) => props.colour ? props.colour : "#0078d4" } !important;
  outline: none !important;
  border: none !important;
  line-height: 2em;
  height: 2em;
  align-items: center;
  padding: 0px 0.5em;
  i, img.icon {
    margin-right: 0.3em;
  }
  img.icon{
    filter: invert(1) !important;
  }
`;

export const FloatingButton = styled.button `
  color: white;
  padding: 0px 0.8em;
  height: 2.5em;
  background-color: ${(props) => props.font ? props.font : basicBlueColour};
  outline: none !important;
  border: none !important;
  border-radius: 1.5em;
  align-items: center;
  position: absolute;
  bottom: 40px;
  ${(props) => props.left &&
  `
  left: ${inputOffset};
  `};
  ${(props) => !props.left &&
  `
  right: ${inputOffset};
  `};
  display: flex;

  span{
    vertical-align: text-bottom;
    margin-left: 0.3em;
  }
  img.icon{
    filter: invert(1) !important;
  }
`;

export const List = styled.section `
  width: 100%;
  padding: 0em ${elementOffset};

  span.message{
    margin: 0em ${inputOffset};
    line-height: 3em;
  }

  &>table{
    width: 100%;
    tbody tr{
      line-height: 2.5em;
    }
  }

  &>table>thead>tr>th{
    height: fit-content;
    font-weight: 400;
    padding: 0px ${inputOffset};
  }

  &>table>tbody>tr{
    background-color: white;
    border-bottom: 1px solid ${backgroundColour};
    color: #7d7d7d;
  }

  &>table>tbody>tr:hover{
   cursor: pointer;
  }

  &>table>tbody>tr>td{
    padding: 0px ${inputOffset};
    p{
      margin: 0px;
      line-height: 2em;
    }
  }
  span.message{
    margin-left: 0px !important;
  }
`;

export const TableList = styled.section `
  width: 100%;
  padding: 0px;

  &>table{
    width: 100%;
    tr{
      line-height: 2.5em;
    }
  }

  &>table>thead>tr>th{
    font-weight: 400;
      padding: 0px ${inputOffset};
  }

  &>table>tbody>tr{
    background-color: white;
    border-bottom: 1px solid ${backgroundColour};
    color: #7d7d7d;
  }

  &>table>tbody>tr>td{
    padding: 0px ${inputOffset};
      font-weight: 400;
  }
  span.message{
    margin-left: 0px !important;
  }
`;

export const ItemContainer = styled.section `
  &:hover{
    cursor: pointer;
  }

  margin: 0em ${inputOffset};
  height: 3em;
  display: flex;
  align-items: center;
  color: ${basicBlueColour};

  input[type=checkbox]{
    width: 1.5em !important;
    height: 1.5em !important;
  }

  &> span {
    margin-right: auto;
    padding: 10px;
    width: calc(100% - 6em);
    overflow-wrap: anywhere;
  }

  img.icon{
    height: 1.3em;
    filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
  }

  img.folder{
    margin-right: 0.3em;
  }

  img.avatar {
    margin-right: 0.6em;
  }
`;

export const Form = styled.form `
  padding: ${(props) => props.fullPadding ? `${elementOffset}` : "0em"} ${elementOffset};
  width: -webkit-fill-available;
  min-width: ${(props) => props.scrollable ? "1200px" : ""};

  section {
    margin: 0em 0em ${elementOffset} 0em;
      i {
        font-size: 1.5em;
      }
    div.flex{
      display: flex;
      img{
        margin: 0px;
        }
      }

      img:not(.scheme) {
        width: auto;
        max-width: 500px;
        height: auto;
        max-height: 500px;
        border-radius: 0px;
      }

      img.icon {
        width:32px;
        height: 32px;
        border-radius: 50px;
        margin-right: 1em;
      }

      label{
        margin: 0px 1em 0em 0em;
        font-weight: 500;
      }

      input[type=text], input[type=password], input[type=datetime-local], teaxtarea, &>div {
        width: -webkit-fill-available;
      }
    }
      section:last-of-type {
        margin: 0em !important;
      }


      section.input-row{
        display: flex !important;
        max-width: 50% !important;
      }

      section.input-row-triple{
              display: flex !important;
              max-width: 75% !important;
            }

    section.input-row>div, section.input-row-triple>div{
        margin-right: 1em;
      }


    section.row div{
        padding: 0px !important;
        display: flex;

        align-items: center;
        width: -webkit-fill-available;
      }

      section.row div>div.dates{
        display: inline-block;
        text-align: end;
      }

      section.row div>div.dates>span{
        display: block;
        font-size: 0.8em;
        color: #7d7d7d;
      }

      section.row div>div.dates>span>span{
        font-weight
      }
      
    input[type=file] {
      margin-top: ${elementOffset};
    }

    & section.row-notes{
      div.text{
        padding: 0px !important;
        @media all and (max-width: 799px), @media handheld  {
          display: block;
        }
        @media all and (min-width: 800px){
          display: flex;
        }
        width: 100%;

        div.main{
          @media all and (max-width: 799px), @media handheld  {
            padding-right: 0em;
            margin-bottom: 1em;
          }
          @media all and (min-width: 800px){
            padding-right: 1em;
          }
          min-width: 66%;
        }

        div.note{
          background-color: #fff10026;
          padding: 1.5em !important;
          height: fit-content;
          width: -webkit-fill-available;
        }
      }
    }

  div.heading{
    display: flex;
    justify-content: space-between;
    margin-bottom: ${elementOffset};
  }


  div.scheme-content{
    display: flex;
    justify-content: space-between;
  }

  div.scheme-sidebar{
    margin-left: 2em;
    height: auto;
    width: 300px;
    background-color: white;
    padding: 1em;
  }

  div.scheme-sidebar>h2{
    font-size: 1.5em;
  }

  div.scheme-sidebar>div{
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }

  div.scheme-sidebar>div:first-of-type{
    margin-top: 1em;
  }

  div.scheme-sidebar>div:hover{
    cursor: pointer;
  }

  div.scheme-sidebar>div>span{
    margin-right: 1em;
    align-self: center;
  }


`;

export const Input = styled.input `
  background-color: white !important;
  outline: none !important;
  border: ${(props) => props.error ? "1px solid red" : "1px solid #d6d6d6"};
  width: ${(props) => props.width ? props.width : "auto"};
  padding-left: 0.4em;
  height: 2.5em !important;

  &:focus{
    border: 1px solid ${basicBlueColour} !important;
  }

  &[type=checkbox]{
      vertical-align: middle;
  }
`;

export const ViewInput = styled.input `
  background-color: transparent !important;
  outline: none !important;
  border: none;
  width: 100%;
  height: 2.5em !important;
  padding-left: 0px;

  &:hover{
    cursor: default;
  }
`;

export const TitleInput = styled.input `
background-color: white;
padding-left: 7px;
outline: none !important;
font-size: 1.5em;
border: none;
width: ${(props) => props.width ? props.width : "auto"};
height: 2.5em !important;

&:hover{
  cursor: default;
}

`;export const TitleInputView = styled.input `
  background-color: transparent !important;
  outline: none !important;
  font-size: 1.5em;
  border: none;
  width: ${(props) => props.width ? props.width : "auto"};
  height: fit-content !important;
  padding: 0em;

  &:hover{
    cursor: default;
  }
`;

export const Textarea = styled.textarea `
background-color: white !important;
outline: none !important;
border: 1px solid #d6d6d6;
width: 100%;
height: 8em;
padding-left: 0.4em;

&:focus{
  border: 1px solid ${basicBlueColour} !important;
}
`;

export const ViewTextarea = styled.textarea `
background-color: transparent !important;
outline: none !important;
border: none;
width: 100%;
height: 8em;
padding-left: 0px;

&:hover{
  cursor: default;
}
`;

export const Sort = styled.div`
  position: absolute;
  z-index: 999;
  background-color: white;
  box-shadow: 0px 0px 7px 0px slategrey;
  width: 350px;
  top: 50px;
  right: 20px;
  padding: ${inputOffset};
  span{
    display: flex;
    align-items: center;
    line-height: 2em;
  }
  input{
    height: 1.3em;
    width: 1.3em;
    margin-right: 0.6em;
  }
`;

export const GroupButton = styled.button `
  width: -webkit-fill-available;

  background-color: ${(props) => props.colour ? props.colour : "white"};
  color: ${(props) => props.colour ? "white" : basicBlueColour};
  outline: none !important;
  border: 1px solid ${basicBlueColour};

  border-radius: 0px;

  &:last-of-type{
    border-left: 0px;
  }
`;

export const LoginContainer = styled.div`
@media all and (max-width: 799px), @media handheld  {
  width: auto;
}
@media all and (min-width: 800px){
  width: 500px;
}

height: calc(100vh - 50px);
margin: auto;

&>div{
    height: -webkit-fill-available;
    width: inherit;
    background-color: ${backgroundColour};
    position: relative;
    display: flex;
    align-items: center;
}

h1 {
  margin: 0px;
  background-color: ${basicBlueColour};
  color: white;
  font-size: 1.5em;
  font-weight: 400;
  padding-left: 5px;
  height: 1.5em;
}
`;

export const PasswordContainer = styled.div`
&:first-of-type{
  margin-top: 0.5em;
}

&:hover, *:hover{
  cursor: pointer;
}

margin: 0em ${inputOffset};
height: 4em;
display: flex;
align-items: center;

div {
  display: inline-block;
    margin-right: auto;
    padding: 10px 0.6em;
    width: calc(100% - 6em);
    overflow-wrap: anywhere;
}

label.title {
display: block;
font-weight: 600;
color: ${basicBlueColour};
}

label.username {
display: flex;
align-items: center;
font-weight: 400;
font-size: 0.9em;
  img {
    filter: invert(0%) sepia(0%) saturate(17%) hue-rotate(322deg) brightness(102%) contrast(104%);
    margin-right: 0.3em;
  }

}

img{
  margin-right: 0em;
}


`;

export const LoadingScreen = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${backgroundColour}AA;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  div{
    margin-left: auto;
    margin-right: auto;
    span.sr-only{
      display: none;
    }
  }
`;

export const Popover = styled.div`
  position: absolute;
  border: 1px solid #DDD;
  top: 50px;
  width: auto;
  height: auto;
  background-color: white;
  padding: 0.6em;
  z-index: 99;
  right: calc(${inputOffset} + 45px);
`;

export const DifficultyInput = styled.input`
    background: linear-gradient(to left, #0bb829,#bbe147,#f4e531,#ee6e8f,#ff0053);
    width: 100%;
    border: none;
    height: 1em;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-border-radius: 5px;
        /*16x16px adjusted to be same as 14x14px on moz*/
        height: 1em;
        width: 1em;
        border-radius: 5px;
        background: white;
        border: none;
    }

    ::-moz-range-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        -moz-border-radius: 5px;
        height: 1em;
        width: 1em;
        background: white;
        border: none;
    }

    ::-ms-thumb {
        height: 1em;
        width: 1em;
        background: white;
        border: none;
    }
`;
