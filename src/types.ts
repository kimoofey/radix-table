export interface Cosmonaut {
    name: string;
    date: number;
    days: number;
    mission: string;
    isMultiple: boolean;
}

export type orderType = 'asc' | 'desc' | undefined;

export interface AppPropsInterface {

}

export interface AppStateInterface {
    data: Cosmonaut[];
    showModal: boolean;
}

export interface TablePropsInterface {

}

export interface TableStateInterface {
    orderedColumn: number | null;
    ordering: orderType;
    isOpenModal: boolean;
    data: Cosmonaut[];
    selectedRows: string[];
}

export interface ModalPropsInterface {
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: (cosmonaut: Cosmonaut) => void;
}

export interface ModalStateInterface {
    cosmonaut: Cosmonaut;
}

export interface TableToolbarProps {
    numSelected: number;
    handleDelete: () => void;
}