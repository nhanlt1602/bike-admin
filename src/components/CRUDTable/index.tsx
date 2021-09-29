import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { IPagingSupport } from "src/common/types";

import { ConfirmModal } from "../ConfirmModal";
import useSnackbar from "../Snackbar/useSnackbar";

import {
    AddBoxRounded,
    CheckCircle,
    Clear,
    Delete,
    FilterList,
    ModeEdit,
} from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TablePagination,
    TextField,
    CircularProgress,
    InputAdornment,
    Typography,
    Toolbar,
    Tooltip,
    IconButton,
    Autocomplete,
    Checkbox,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

const bgColor = {
    backgroundColor: grey[300],
};

interface ITable {
    enableSelection?: boolean;
    enableFilter?: boolean;
    sort?: boolean;
    title?: string | React.ReactElement;
    headerColor?: "primary" | "secondary" | "standard";
    query: string;
    action?: {
        onAdd?: (rowData: Record<string, string>, callback: Function) => void;
        onEdit?: (rowData: Record<string, string>, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
    columns: IColumn[];
}

export interface IColumn {
    align?: "left" | "right" | "center";
    title: string;
    field: string;
    render?: (data?: Record<number, string | number>) => React.ReactElement;
    disableSort?: boolean;
    disableFilter?: boolean;
    customSort?: (data?: Record<number, string | number>) => React.ReactElement;
    customFilter?: (data?: Record<number, string | number>) => React.ReactElement;
    type?: "index";
    editable?: "never" | "onAdd" | "onEdit";
    index: number;
}

export interface ITableHeader {
    headerColor?: "primary" | "secondary" | "standard";
    columns: IColumn[];
    isHaveAction: boolean;
}
export const TableHeader: React.FC<ITableHeader> = (props: ITableHeader) => {
    const { columns, isHaveAction } = props;
    return (
        <TableHead>
            <TableRow>
                {columns.map((column: IColumn, index: number) => {
                    return (
                        <TableCell key={index} align={column.align || "left"}>
                            {column.title}
                        </TableCell>
                    );
                })}
                {isHaveAction && <TableCell>Thao tác</TableCell>}
            </TableRow>
        </TableHead>
    );
};

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
        onAdd?: (rowData: Record<string, string>, callback: Function) => void;
        onEdit?: (rowData: Record<string, string>, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
}

export const TableData = <T extends Record<string, any>>(
    props: ITableData<T> & { children?: React.ReactNode }
) => {
    const showSnackbar = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [selectedToDeleteId, setSelectedToDeleteId] = useState<number>(0);

    const handleClose = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await fetch(`${props.query}/${selectedToDeleteId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.ok) {
                    props.loadData(1, props.rowPerPage);
                    showSnackbar({
                        children: "Xóa thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
            } catch (ex) {
                showSnackbar({
                    children: "Xóa đối tượng thất bại",
                    variant: "filled",
                    severity: "error",
                });
            } finally {
                setSelectedToDeleteId(0);
            }
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
            <ConfirmModal
                open={open}
                message="Bạn có muốn thực hiện thay đổi?"
                handleClose={handleClose}
            />
            {props.mode === "ADD" && (
                <MutationRow
                    setMode={props.setMode}
                    setInMutation={props.setMutationMode}
                    columns={props.columns}
                    mode="ADD"
                    action={props.action}
                    loadData={props.loadData}
                    pageSize={props.rowPerPage}
                    page={1}
                />
            )}
            {props.rows?.map((row: T, indexRow: number) => {
                if (selectedId === row.id) {
                    return (
                        <MutationRow
                            setMode={props.setMode}
                            setInMutation={props.setMutationMode}
                            columns={props.columns}
                            mode="EDIT"
                            setSelectedItem={setSelectedId}
                            action={props.action}
                            loadData={props.loadData}
                            pageSize={props.rowPerPage}
                            page={props.page}
                            rowData={row}
                        />
                    );
                }
                return (
                    <TableRow
                        style={selectedId !== row.id && props.inMutaionMode ? bgColor : undefined}
                        key={row.id}
                    >
                        {props.columns.map((column: IColumn, index: number) => {
                            if (column.type === "index") {
                                return <TableCell key={index}>{indexRow + 1}</TableCell>;
                            }
                            const { render } = column;
                            return (
                                <TableCell key={index}>
                                    {render !== undefined
                                        ? render(row[column.field])
                                        : row[column.field]}
                                </TableCell>
                            );
                        })}
                        {(props.isHaveActionDelete || props.isHaveActionEdit) && (
                            <TableCell>
                                {props.isHaveActionEdit && (
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton
                                            size="large"
                                            onClick={() => {
                                                props.setMutationMode(true);
                                                setSelectedId(row.id);
                                                props.setMode("EDIT");
                                            }}
                                        >
                                            <ModeEdit />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {props.isHaveActionDelete && (
                                    <Tooltip title="Xóa">
                                        <IconButton
                                            size="large"
                                            onClick={() => {
                                                setOpen(true);
                                                setSelectedToDeleteId(row.id);
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                );
            })}
        </React.Fragment>
    );
};

export interface ICheckBoxHeader {
    columns: IColumn[];
    selectedColumns: IColumn[];
    setSelectedColumns: any;
    setStringFilter: any;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxesHeader: React.FC<ICheckBoxHeader> = (props: ICheckBoxHeader) => {
    const showSnackbar = useSnackbar();
    return (
        <Autocomplete
            multiple
            id="checkbox header"
            options={props.columns}
            disableCloseOnSelect
            value={props.selectedColumns}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
                if (newValue.length !== 0) {
                    newValue = newValue.sort((a, b) => {
                        return a.index - b.index;
                    });
                    props.setSelectedColumns([...newValue]);
                    let stringFilter = newValue
                        .map((column) => column.field)
                        .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
                        .join(",");
                    stringFilter = `&filtering=${stringFilter}`;
                    props.setStringFilter(stringFilter);
                } else {
                    showSnackbar({
                        severity: "warning",
                        children: "Phải chọn ít nhất một cột hiển thị",
                    });
                }
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </li>
            )}
            style={{ width: 500 }}
            renderTags={() => null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    variant="standard"
                    value={`${props.selectedColumns.length} hàng được chọn`}
                    placeholder={`${props.selectedColumns.length} hàng được chọn`}
                />
            )}
        />
    );
};

export interface IFilterTable {
    columns: IColumn[];
    filters: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isHaveAction: boolean;
    inMutaionMode: boolean;
}
export const FilterTable: React.FC<IFilterTable> = (props: IFilterTable) => {
    return (
        <TableRow style={props.inMutaionMode ? bgColor : undefined}>
            {props.columns?.map((column: IColumn, index: number) => {
                if (column.disableFilter) {
                    return <TableCell key={index}></TableCell>;
                }
                return (
                    <TableCell key={index}>
                        <TextField
                            size="small"
                            variant="standard"
                            type="text"
                            name={column.field}
                            value={props.filters[column.field]}
                            onChange={props.onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FilterList />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </TableCell>
                );
            })}
            {props.isHaveAction && <TableCell></TableCell>}
        </TableRow>
    );
};

export interface IMutaionRow<T> {
    columns: IColumn[];
    mode: "ADD" | "EDIT";
    rowData?: T;
    setMode: any;
    setInMutation: any;
    setSelectedItem?: any;
    action?: {
        onAdd?: (rowData: Record<string, string>, callback: Function) => void;
        onEdit?: (rowData: Record<string, string>, callback: Function) => void;
        onDelete?: boolean;
        onDeleteWithGroup?: boolean;
    };
    page: number;
    pageSize: number;
    loadData: (page: number, pageSize: number) => void;
}

export const MutationRow = <T extends Record<string, any>>(
    props: IMutaionRow<T> & { children?: React.ReactNode }
) => {
    const { columns, mode } = props;

    const generateForm = () => {
        let fields: string[] = props.columns.map((column) => column.field);
        let obj: Record<string, string> = {};
        fields.forEach((field) => {
            obj[field] = "";
        });
        if (props.rowData) {
            const { rowData } = props;
            fields.forEach((field) => {
                obj[field] = rowData !== undefined ? rowData[field] : "";
            });
        }
        return obj;
    };
    const [form, setForm] = useState(generateForm());
    const submitHandler = () => {
        if (props.mode === "ADD") {
            if (props?.action?.onAdd) {
                props?.action?.onAdd(form, () => {
                    props.loadData(1, props.pageSize);
                    props.setMode("NORMAL");
                    props.setInMutation(false);
                    if (props.setSelectedItem) {
                        props.setSelectedItem(0);
                    }
                });
            }
        } else if (props.mode === "EDIT") {
            if (props?.action?.onEdit) {
                props?.action?.onEdit(form, () => {
                    props.loadData(props.page, props.pageSize);
                    props.setMode("NORMAL");
                    props.setInMutation(false);
                    if (props.setSelectedItem) {
                        props.setSelectedItem(0);
                    }
                });
            }
        }
    };

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            submitHandler();
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
            <ConfirmModal
                open={open}
                message="Bạn có muốn thực hiện thay đổi?"
                handleClose={handleClose}
            />
            <TableRow>
                {columns?.map((column: IColumn, index: number) => {
                    switch (mode) {
                        case "ADD":
                            return (
                                <TableCell key={index}>
                                    <TextField
                                        name={column.field}
                                        value={form[column.field]}
                                        size="small"
                                        disabled={
                                            column.editable &&
                                            (column.editable === "onEdit" ||
                                                column.editable === "never")
                                        }
                                        variant="standard"
                                        onChange={onHandleChange}
                                    />
                                </TableCell>
                            );
                        case "EDIT":
                            return (
                                <TableCell key={index}>
                                    <TextField
                                        name={column.field}
                                        value={form[column.field]}
                                        size="small"
                                        disabled={
                                            column.editable &&
                                            (column.editable === "onAdd" ||
                                                column.editable === "never")
                                        }
                                        variant="standard"
                                        onChange={onHandleChange}
                                    />
                                </TableCell>
                            );
                        default:
                            break;
                    }
                })}
                <TableCell>
                    <Tooltip title="Xác nhận">
                        <IconButton size="large" onClick={() => setOpen(true)}>
                            <CheckCircle />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton
                            size="large"
                            onClick={() => {
                                props.setMode("NORMAL");
                                props.setInMutation(false);
                                if (props.setSelectedItem) {
                                    props.setSelectedItem(0);
                                }
                            }}
                        >
                            <Clear />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
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
    const loadData = async (offset: number, limit: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${query}?offset=${offset}&limit=${limit}${stringFilter}`);
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
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const callbackLoadData = useCallback(
        async (offset: number, limit: number, queryStr: string, stringFilter: string) => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${query}?offset=${offset}&limit=${limit}${stringFilter}${queryStr}`
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
        callbackLoadData(1, 5, param, stringFilter);
    }, [callbackLoadData, param, stringFilter]);

    const handleChangePage = (event: unknown, newPage: number) => {
        loadData(newPage + 1, paging.pageSize);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        loadData(1, parseInt(event.target.value, 10));
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

    const emptyRows =
        paging.currentPage > 1
            ? Math.max(0, paging.currentPage * paging.pageSize - paging.totalCount)
            : 0;

    return (
        <TableContainer component={Paper}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
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
                            <IconButton
                                size="large"
                                onClick={() => {
                                    setMutationMode(true);
                                    setMode("ADD");
                                }}
                            >
                                <AddBoxRounded />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                )}
            </Toolbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHeader
                    columns={selectedColumns}
                    isHaveAction={!!props?.action?.onDelete || !!props?.action?.onEdit}
                />
                <TableBody>
                    {props.enableFilter && (
                        <FilterTable
                            onChange={onHandleChange}
                            filters={filters}
                            columns={selectedColumns}
                            isHaveAction={!!props?.action?.onDelete || !!props?.action?.onEdit}
                            inMutaionMode={isInMutaionMode}
                        />
                    )}
                    {loading ? (
                        <Box
                            style={{
                                height: 53 * (paging.pageSize || 5),
                            }}
                            width={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CircularProgress />
                        </Box>
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
                                            !!props?.action?.onDelete || !!props?.action?.onEdit
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
    );
};

export default CRUDTable;
