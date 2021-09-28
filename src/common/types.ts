export interface IPagingSupport<T> {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    content: T[];
}

export interface IError {
    errors: any;
    status: number;
    title: string;
    traceId: string;
    type: string;
}
