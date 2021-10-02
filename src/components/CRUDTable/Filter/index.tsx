import { IFilterTable, IColumn } from "../Models";

import { FilterList } from "@mui/icons-material";
import { TableRow, TableCell, TextField, InputAdornment } from "@mui/material";
import { grey } from "@mui/material/colors";

const bgColor = {
    backgroundColor: grey[300],
};

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
