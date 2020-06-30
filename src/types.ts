export interface Cosmonaut {
    name: string;
    date: number;
    days: number;
    mission: string;
    isMultiple: boolean;
}

export type orderType = 'asc' | 'desc' | undefined;

export type CosmonautKeys = keyof Cosmonaut;

export interface AppPropsInterface {

}

export interface AppStateInterface {
    data: Cosmonaut[];
    showModal: boolean;
}

export interface TablePropsInterface {

}

export interface TableStateInterface {
    orderedColumn: number;
    ordering: orderType;
    isOpenModal: boolean;
    data: Cosmonaut[];
    selectedRows: string[];
    rowsPerPage: number;
    page: number;
}

export interface ModalPropsInterface {
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: (cosmonaut: Cosmonaut) => void;
}

export interface ModalStateInterface {
    cosmonaut: Cosmonaut;
    helperText: string;
    error: {
        name: boolean,
        date: boolean,
        days: boolean,
        mission: boolean,
    };
}

export interface TableToolbarProps {
    numSelected: number;
    handleDelete: () => void;
}