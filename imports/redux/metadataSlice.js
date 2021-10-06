import {
  createSlice
} from '@reduxjs/toolkit'

export const metadataSlice = createSlice( {
  name: 'metadata',
  initialState: {
    value: {
      company: null,
    },
  },
  reducers: {
    setCompany: ( state, action ) => {
      state.value = {
        ...state.value,
        company: action.payload,
      }
    },
  },
} )

export const {
  setCompany
} = metadataSlice.actions

export default metadataSlice.reducer