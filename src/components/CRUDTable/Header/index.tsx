import { ITableHeader, IColumn } from "../Models";

import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export const TableHeader: React.FC<ITableHeader> = (props: ITableHeader) => {
    const { columns, isHaveAction, enableSort = false, orderBy, createSortHandler } = props;

    return (
        <TableHead>
            <TableRow>
                {columns.map((column: IColumn, index: number) => {
                    return (
                        <TableCell
                            sortDirection={orderBy.field === column.field ? orderBy.order : "asc"}
                            key={index}
                            align={column.align || "left"}
                        >
                            {enableSort && !column.disableSort ? (
                                <TableSortLabel
                                    active={orderBy.field === column.field}
                                    direction={
                                        orderBy.field === column.field ? orderBy.order : "asc"
                                    }
                                    onClick={() => createSortHandler(column.field, orderBy.order)}
                                >
                                    {column.title}
                                    {orderBy.field === column.field ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {orderBy.order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                column.title
                            )}
                        </TableCell>
                    );
                })}
                {isHaveAction && <TableCell>Thao tác</TableCell>}
            </TableRow>
        </TableHead>
    );
};
