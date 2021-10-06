import {
  createSlice
} from '@reduxjs/toolkit'

export const descriptionsSlice = createSlice( {
  name: 'descriptions',
  initialState: {
    value: [],
  },
  reducers: {
    setDescriptions: ( state, action ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
} )

// Action creators are generated for each case reducer function
export const {
  setDescriptions
} = descriptionsSlice.actions

export default descriptionsSlice.reducer