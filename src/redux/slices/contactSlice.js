import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      const newData = { ...action.payload };
      state.contacts = [newData, ...state.contacts];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts?.filter(
        (item) => item.id !== action.payload
      );
    },
    getContact: (state, action) => {
      state.contacts = state.contacts.find(
        (item) => item.id === action.payload._id
      );
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts((item) =>
        item.id === action.payload._id ? action.payload : item
      );
    },
  },
});

export const { setContacts, deleteContact, getContact, updateContact } =
  contactSlice.actions;
export default contactSlice.reducer;
