import {
  configureStore
} from '@reduxjs/toolkit'
import companiesReducer from './companiesSlice';
import itemsReducer from './itemsSlice';
import addressesReducer from './addressesSlice';
import passwordsReducer from './passwordsSlice';
import categoriesReducer from './categoriesSlice';
import usersReducer from './usersSlice';
import schemesReducer from './schemesSlice';

export default configureStore( {
  reducer: {
    companies: companiesReducer,
    items: itemsReducer,
    addresses: addressesReducer,
    passwords: passwordsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    schemes: schemesReducer,
  },
} )