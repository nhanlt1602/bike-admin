import { useCallback, useEffect, useState } from "react";

import { FieldError } from "react-hook-form";
import axios from "src/axios";

import { Autocomplete, TextField } from "@mui/material";

export interface ICustomizeAuto<T> {
    query: string;
    limit: number;
    field: keyof T;
    searchField: string;
    errors?: FieldError;
    inputRef: React.Ref<HTMLInputElement>;
    errorMessage: string;
    changeValue: (newValue: number) => void;
}

const CustomizeAutocomplete = <T extends Record<string, string>>(props: ICustomizeAuto<T>) => {
    const { query, limit, field, searchField, errors, inputRef, errorMessage, changeValue } = props;
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);

    const callbackLoadData = useCallback(
        async (query: string, limit: number, search: string) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${query}?${searchField}=${search}&page-offset=1&limit=${limit}`
                );
                if (response.status === 200) {
                    setData(response?.data?.content);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [searchField]
    );

    useEffect(() => {
        callbackLoadData(query, limit, search);
    }, [callbackLoadData, query, limit, search]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <Autocomplete
            id="select-customize"
            options={data}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option[field]}
            loading={loading}
            onChange={(_, newValue) => {
                if (newValue) {
                    changeValue(Number(newValue["id"]));
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={data}
                    label="Nhóm dịch bệnh"
                    placeholder="Nhóm dịch bệnh"
                    onChange={onChange}
                    inputRef={inputRef}
                    helperText={errors && errorMessage}
                    error={!!errors}
                />
            )}
        />
    );
};

export default CustomizeAutocomplete;
