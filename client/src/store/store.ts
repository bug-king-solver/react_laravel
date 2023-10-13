// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { bookApiSlice } from './bookApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import bookStatusSlice from './bookStatusSlice';
export const store = configureStore({
  reducer: {
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    bookStatus: bookStatusSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch