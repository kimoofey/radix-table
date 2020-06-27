export interface Cosmonaut {
    name: string,
    date: number,
    days: number,
    mission: string,
    isMultiple: boolean,
}

export interface AppPropsInterface {

}

export interface AppStateInterface {
    data: Cosmonaut[],
    showModal: boolean,
}

export interface TablePropsInterface {

}

export interface TableStateInterface {
    orderedColumn: number | null;
    ordering: orderType;
}

export type orderType = 'asc' | 'desc' | undefined;