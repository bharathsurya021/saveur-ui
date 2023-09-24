import { apiSlice } from './apiSlice';

const CONTACT_BASE_URL = '/api/contacts';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: CONTACT_BASE_URL,
        method: 'GET',
      }),
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_BASE_URL}/`,
        method: `POST`,
        body: data,
      }),
    }),
    updateContactDetails: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_BASE_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getContactDetails: builder.query({
      query: (id) => ({
        url: `${CONTACT_BASE_URL}/${id}`,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${CONTACT_BASE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useUpdateContactDetailsMutation,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactDetailsQuery,
} = contactApiSlice;
