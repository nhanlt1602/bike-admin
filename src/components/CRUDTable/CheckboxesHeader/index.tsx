import useSnackbar from "src/components/Snackbar/useSnackbar";

import { ICheckBoxHeader } from "../Models";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

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
