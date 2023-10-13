import bookStatusSlice from "./bookStatusSlice";
import { IModalStatus, ISearchValues} from "./type";

export const bookStatusActions = bookStatusSlice.actions;

export const changeBookModalStatus = (modalStatusWithId: IModalStatus)=> {
    return(bookStatusActions.setBookModalStatus(modalStatusWithId))
}

export const changeSearchValues = (searchValues: ISearchValues) => {
    return (bookStatusActions.setSearchValues(searchValues));
}