import { IFilterTable, IColumn } from "../Models";

import { FilterList } from "@mui/icons-material";
import { TableRow, TableCell, TextField, InputAdornment } from "@mui/material";

export const FilterTable: React.FC<IFilterTable> = (props: IFilterTable) => {
    return (
        <TableRow>
            {props.columns?.map((column: IColumn, index: number) => {
                if (column.disableFilter) {
                    return <TableCell width={column.width || undefined} key={index}></TableCell>;
                }
                return (
                    <TableCell key={index} width={column.width || undefined}>
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
            {props.isHaveAction && <TableCell width={160}></TableCell>}
        </TableRow>
    );
};
