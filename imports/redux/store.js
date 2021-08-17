import {
  configureStore
} from '@reduxjs/toolkit'
import companiesReducer from './companiesSlice';
import itemsReducer from './itemsSlice';
import categoriesReducer from './categoriesSlice';
import usersReducer from './usersSlice';

export default configureStore( {
  reducer: {
    companies: companiesReducer,
    items: itemsReducer,
    categories: categoriesReducer,
    users: usersReducer,
  },
} )