import {
  configureStore
} from '@reduxjs/toolkit'
import companiesReducer from './companiesSlice';
import itemsReducer from './itemsSlice';
import itemCategoriesReducer from './itemCategoriesSlice';
import usersReducer from './usersSlice';

export default configureStore( {
  reducer: {
    companies: companiesReducer,
    items: itemsReducer,
    itemCategories: itemCategoriesReducer,
    users: usersReducer,
  },
} )