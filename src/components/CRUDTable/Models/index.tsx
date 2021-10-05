export interface ITable {
    enableSelection?: boolean;
    enableFilter?: boolean;
    sort?: boolean;
    title?: string | React.ReactElement;
    headerColor?: "primary" | "secondary" | "standard";
    query: string;
    action?: {
        onAdd?: (callback: Function) => void;
        onEdit?: (rowData: any, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
    columns: IColumn[];
}

export interface IFilterTable {
    columns: IColumn[];
    filters: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isHaveAction: boolean;
    inMutaionMode: boolean;
}

export interface IMutaionRow<T> {
    columns: IColumn[];
    mode: "ADD" | "EDIT";
    rowData?: T;
    setMode: any;
    setInMutation: any;
    setSelectedItem?: any;
    action?: {
        onAdd?: (callback: Function) => void;
        onEdit?: (rowData: any, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
    page: number;
    pageSize: number;
    loadData: (page: number, pageSize: number) => void;
}

export interface IColumn {
    align?: "left" | "right" | "center";
    title: string;
    field: string;
    render?: (data?: any) => React.ReactElement;
    renderLink?: (data?: any) => string;
    disableSort?: boolean;
    disableFilter?: boolean;
    customSort?: (data?: Record<number, string | number>) => React.ReactElement;
    customFilter?: (data?: Record<number, string | number>) => React.ReactElement;
    type?: "index";
    editable?: "never" | "onAdd" | "onEdit";
    index: number;
    link?: string;
    width?: string;
}

export interface ITableHeader {
    headerColor?: "primary" | "secondary" | "standard";
    columns: IColumn[];
    isHaveAction: boolean;
    enableSort?: boolean;
    orderBy: {
        field: string;
        order: Order;
    };
    createSortHandler: (field: string, direction: Order) => void;
}

export type Order = "asc" | "desc";

export interface ITableData<T> {
    rows?: T[];
    columns: IColumn[];
    isHaveActionDelete: boolean;
    isHaveActionEdit: boolean;
    query: string;
    rowPerPage: number;
    page: number;
    loadData: (page: number, pageSize: number) => void;
    inMutaionMode: boolean;
    setMutationMode: any;
    mode: "NORMAL" | "ADD" | "EDIT";
    setMode: any;
    action?: {
        onAdd?: (callback: Function) => void;
        onEdit?: (rowData: any, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
}

export interface ICheckBoxHeader {
    columns: IColumn[];
    selectedColumns: IColumn[];
    setSelectedColumns: any;
    setStringFilter: any;
}
