import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppStates, IModalStatus, ISearchValues, ModalStatus } from "./type";

const initialBookStatus: IAppStates = {
    modalStatus: {
        modalStatus: ModalStatus.CLOSE,
        currentId: undefined,
    },
    searchValues: {
        isSearched: false,
        searchKey: '',
        searchField: '',
    }
}

const bookStatusSlice = createSlice({
    name: 'bookStatus',
    initialState: initialBookStatus,
    reducers: {
        setBookModalStatus(state, action: PayloadAction<IModalStatus>) {
            state.modalStatus.modalStatus = action.payload.modalStatus;
            state.modalStatus.currentId = action.payload.currentId;
        },
        setSearchValues(state, action: PayloadAction<ISearchValues>) {
            state.searchValues.isSearched = action.payload.isSearched;
            state.searchValues.searchKey = action.payload.searchKey;
            state.searchValues.searchField = action.payload.searchField;
        }
    }
})

export default bookStatusSlice;