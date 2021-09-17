export const getLink = (address) => {
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user";
      break;
    case "users":
      return "/users/list";
      break;
    case "addCategory":
      return "/categories/add";
      break;
    case "editCategory":
      return `/:categoryID/edit`;
      break;
    case "listItemsInCategory":
      return `/:companyID/:categoryID/list`;
      break;
    case "schemeView":
      return `/:companyID/scheme/view`;
      break;
    case "schemeDraw":
      return `/:companyID/scheme/draw`;
      break;
    case "schemeEdit":
      return `/:companyID/scheme/edit`;
      break;
      case "diagram":
      return `/:companyID/diagram/draw`;
      break;
    case "addItem":
      return `/:companyID/:categoryID/add-item`;
      break;
    case "editItem":
      return `/:companyID/:categoryID/:itemID/edit`;
      break;
    case "viewItem":
      return `/:companyID/:categoryID/:itemID/view`;
      break;
    default:
      return `/all-companies/all-categories/list`;
      break;
  }
}

export const getGoToLink = (address, arguments) => {
  const {itemID, categoryID, companyID} = arguments ? arguments : {};
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user";
      break;
    case "users":
      return "/users/list";
      break;
    case "addCategory":
      return "/categories/add";
      break;
    case "editCategory":
      return `/${categoryID}/edit`;
      break;
    case "listItemsInCategory":
      return `/${companyID}/${categoryID}/list`;
      break;
    case "schemeView":
      return `/${companyID}/scheme/view`;
      break;
    case "schemeDraw":
      return `/${companyID}/scheme/draw`;
      break;
    case "schemeEdit":
      return `/${companyID}/scheme/edit`;
      break;
    case "addItem":
      return `/${companyID}/${categoryID}/add-item`;
      break;
    case "editItem":
      return `/${companyID}/${categoryID}/${itemID}/edit`;
      break;
    case "viewItem":
      return `/${companyID}/${categoryID}/${itemID}/view`;
      break;
    default:
      return `/all-companies/all-categories/list`;
      break;

  }
}
