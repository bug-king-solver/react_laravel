export enum ModalStatus  {
    OPEN = 'open',
    EDIT = 'edit',
    CLOSE = 'close',
    REMOVE = 'remove',
}

export interface ISearchValues {
    isSearched: boolean,
    searchKey: string,
    searchField: string | undefined,
}

export interface IModalStatus {
    modalStatus: ModalStatus;
    currentId: number | undefined,
}

export interface IAppStates {
    modalStatus: IModalStatus,
    searchValues: ISearchValues,
}


export interface Book {
    id: number;
    title: string;
    body: string;
    author: string;
    status: boolean;
}
