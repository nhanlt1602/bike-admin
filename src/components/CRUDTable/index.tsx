import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { IPagingSupport } from "src/common/types";

import { TableData } from "./Body";
import { CheckboxesHeader } from "./CheckboxesHeader";
import { FilterTable } from "./Filter";
import { TableHeader } from "./Header";
import { IColumn, ITable, Order } from "./Models";

import { AddBoxRounded } from "@mui/icons-material";
import {
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TablePagination,
    CircularProgress,
    Box,
    Typography,
    Toolbar,
    Tooltip,
    IconButton,
} from "@mui/material";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const convertCamelToSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const CRUDTable = <T extends Record<string, string | number>>(
    props: ITable & { children?: React.ReactNode }
) => {
    const { query, columns } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [paging, setPaging] = useState<IPagingSupport<T>>({
        totalPage: 0,
        totalCount: 0,
        currentPage: 1,
        pageSize: 5,
        content: [],
        nextPage: 2,
        previousPage: null,
    });
    const [selectedColumns, setSelectedColumns] = useState<IColumn[]>(columns);
    const [stringFilter, setStringFilter] = useState<string>("");

    const generateFilter = () => {
        let fields: string[] = columns.map((column) => column.field);
        let obj: Record<string, string> = {};
        fields.forEach((field) => {
            obj[field] = "";
        });
        return obj;
    };

    const [filters, setFilters] = useState(generateFilter());
    const [param, setParam] = useState<string>("");
    const [isInMutaionMode, setMutationMode] = useState(false);
    const [mode, setMode] = useState<"ADD" | "EDIT" | "NORMAL">("NORMAL");
    const [orderBy, setOrderBy] = useState<{ field: string; order: Order }>({
        field: "Id",
        order: "desc",
    });

    const loadData = async (offset: number, limit: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${query}?page-offset=${offset}&limit=${limit}${stringFilter}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (response.ok) {
                const data: IPagingSupport<T> = await response.json();
                setPaging({
                    ...data,
                });
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        } finally {
            setLoading(false);
        }
    };

    const callbackLoadData = useCallback(
        async (
            offset: number,
            limit: number,
            queryStr: string,
            stringFilter: string,
            orderBy: { field: string; order: Order }
        ) => {
            setLoading(true);
            try {
                let orderStr = "";
                if (orderBy.field && orderBy.order) {
                    orderStr = `&order-by=${
                        orderBy.field.charAt(0).toUpperCase() + orderBy.field.slice(1)
                    }&order-type=${orderBy.order}`;
                }
                const response = await fetch(
                    `${query}?offset=${offset}&limit=${limit}${stringFilter}${queryStr}${orderStr}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                if (response.status === 200) {
                    const data: IPagingSupport<T> = await response.json();
                    setPaging(data);
                }
            } catch (ex) {
                // eslint-disable-next-line no-console
                console.log(ex);
            } finally {
                setLoading(false);
            }
        },
        [query]
    );

    useEffect(() => {
        // let stringFilter = selectedColumns
        //     .map((column) => column.field)
        //     .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
        //     .join(",");
        // stringFilter = `&filtering=${stringFilter}`;
        callbackLoadData(1, 5, param, stringFilter, orderBy);
    }, [callbackLoadData, param, stringFilter, orderBy]);

    const handleChangePage = (event: unknown, newPage: number) => {
        loadData(newPage + 1, paging.pageSize);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        loadData(1, parseInt(event.target.value, 10));
    };

    const createSortHandler = (field: string, direction: Order) => {
        setOrderBy({
            ...orderBy,
            field: field,
            order: direction === "asc" ? "desc" : "asc",
        });
    };

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        let params: string = "";
        if (value) {
            params = `&${convertCamelToSnakeCase(name)}=${value}`;
        }
        Object.keys(filters)
            .filter((key) => key !== name)
            .forEach((key) => {
                if (filters[key]) {
                    params += `&${convertCamelToSnakeCase(key)}=${filters[key]}`;
                }
            });
        setParam(params);
    };

    const onAddHandler = () => {
        // setMutationMode(true);
        // setMode("ADD");
        if (props.action?.onAdd) {
            props.action?.onAdd(() => {
                loadData(1, paging.pageSize);
                // setMode("NORMAL");
                // setMutationMode(false);
            });
        }
    };

    const emptyRows =
        paging.currentPage > 1
            ? Math.max(0, paging.currentPage * paging.pageSize - paging.totalCount)
            : 0;

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {props.title}
                    </Typography>
                    {!!props?.action?.onAdd && (
                        <React.Fragment>
                            <CheckboxesHeader
                                selectedColumns={selectedColumns}
                                setSelectedColumns={setSelectedColumns}
                                setStringFilter={setStringFilter}
                                columns={columns}
                            />
                            <Tooltip title="Thêm mới">
                                <IconButton size="large" onClick={() => onAddHandler()}>
                                    <AddBoxRounded />
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                    )}
                </Toolbar>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHeader
                            enableSort={props.sort}
                            columns={selectedColumns}
                            isHaveAction={!!props?.action?.onDelete || !!props?.action?.onEdit}
                            orderBy={orderBy}
                            createSortHandler={createSortHandler}
                        />
                        <TableBody>
                            {props.enableFilter && (
                                <FilterTable
                                    onChange={onHandleChange}
                                    filters={filters}
                                    columns={selectedColumns}
                                    isHaveAction={
                                        !!props?.action?.onDelete || !!props?.action?.onEdit
                                    }
                                    inMutaionMode={isInMutaionMode}
                                />
                            )}
                            {loading ? (
                                <TableRow
                                    style={{
                                        height: 53 * (paging.pageSize || 5),
                                    }}
                                >
                                    <TableCell colSpan={selectedColumns.length + 1}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <React.Fragment>
                                    <TableData
                                        rowPerPage={paging.pageSize}
                                        loadData={loadData}
                                        query={query}
                                        rows={paging?.content}
                                        columns={selectedColumns}
                                        isHaveActionDelete={!!props?.action?.onDelete}
                                        isHaveActionEdit={!!props?.action?.onEdit}
                                        inMutaionMode={isInMutaionMode}
                                        setMutationMode={setMutationMode}
                                        mode={mode}
                                        page={paging?.currentPage}
                                        setMode={setMode}
                                        action={props.action}
                                    />
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell
                                                colSpan={
                                                    !!props?.action?.onDelete ||
                                                    !!props?.action?.onEdit
                                                        ? selectedColumns.length + 1
                                                        : selectedColumns.length
                                                }
                                            />
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={paging?.totalCount}
                        rowsPerPage={paging?.pageSize}
                        page={paging?.currentPage - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default CRUDTable;
