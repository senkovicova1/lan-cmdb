export const getLink = (address) => {
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user";
      break;
    case "addItemCategory":
      return "/item-categories/add";
      break;
    case "editItemCategory":
      return `/:itemCategoryID/edit`;
      break;
    case "listItemsInCategory":
      return `/:companyID/:itemCategoryID/list`;
      break;
    case "addItem":
      return `/:companyID/:itemCategoryID/add-item`;
      break;
    case "editItem":
      return `/:companyID/:itemCategoryID/:itemID/edit`;
      break;
    case "viewItem":
      return `/:companyID/:itemCategoryID/:itemID/view`;
      break;
    default:
      return `/all-companies/all-categories/list`;
      break;
  }
}

export const getGoToLink = (address, arguments) => {
  const {itemID, itemCategoryID, companyID} = arguments ? arguments : {};
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user";
      break;
    case "addItemCategory":
      return "/item-categories/add";
      break;
    case "editItemCategory":
      return `/${itemCategoryID}/edit`;
      break;
    case "listItemsInCategory":
      return `/${companyID}/${itemCategoryID}/list`;
      break;
    case "addItem":
      return `/${companyID}/${itemCategoryID}/add-item`;
      break;
    case "editItem":
      return `/${companyID}/${itemCategoryID}/${itemID}/edit`;
      break;
    case "viewItem":
      return `/${companyID}/${itemCategoryID}/${itemID}/view`;
      break;
    default:
      return `/all-companies/all-categories/list`;
      break;

  }
}
