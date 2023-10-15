// bookApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from './type';

const apiUrl = '/api';

export const bookApiSlice = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiUrl,
    headers: {
      'Accept': 'application/json'
    },
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<{books: Book[], last_page: number}, {page: number, sortColumn: string, sortOrder: string, searchKey: string, searchField: string | undefined,}>({
        transformResponse(response: any) {
          return {books: response.data, last_page: response.last_page};
        },
      query: ({page = 1, sortColumn, sortOrder, searchField, searchKey}) => `books?page=${page}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&searchKey=${searchKey}&searchField=${searchField}`,
      providesTags: ['Book'],
    }),
    getBook: builder.query<Book, number> ({
      transformResponse(response: any) {
          return {...response,status:response.status > 0};
      },
      query: (currentId) => `books/${currentId}`,
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, Partial<Book>>({
      query: (updatedBook) => ({
        url: `books/${updatedBook.id}`,
        method: 'PUT',
        body: updatedBook,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<void, number | undefined>({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    exportXmlAndCSV: builder.mutation<string, object>({
      query: (type) => ({
        url: `books/exportAsCsvAndXml`,
        method: 'POST',
        body: type
      })
    })
  }),
});

// Export hooks for using the API endpoints
export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useGetBookQuery, useExportXmlAndCSVMutation, } = bookApiSlice;
