import { useCallback, useEffect, useState } from "react";

import axios from "src/axios";

import { Autocomplete, TextField } from "@mui/material";
import { DiseaseGroup } from "src/containers/DiseaseGroupManagement/models/DiseaseGroup.model";

export interface T {
    groupName: string;
    options: Readonly<DiseaseGroup[]>;
}
export interface ICustomizeAuto {
    query: string;
    limit: number;
}

const CustomizeAutocomplete: React.FC<ICustomizeAuto> = (props: ICustomizeAuto) => {
    const { query, limit } = props;
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);
    const [mode, setMode] = useState<"BE" | "FE">("FE");

    const callbackLoadData = useCallback(
        async (query: string, limit: number, search: string) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${query}?group-name=${search}&page-offset=1&limit=${limit}`
                );
                if (response.status === 200) {
                    const totalAccount = response.data.totalCount;
                    // eslint-disable-next-line no-console
                    console.log(response.data.content);
                    if (totalAccount <= limit) {
                        setMode("FE");
                        setData(response.data.content);
                    }
                    if (totalAccount < limit) {
                        setMode("BE");
                        setData(response.data.content);
                    }
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [query]
    );

    useEffect(() => {
        callbackLoadData(query, limit, search);
    }, [callbackLoadData, query, limit, search]);

    const onChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (mode === "FE") {
        } else {
            setSearch(e.target.value);
        }
    };

    return (
        <Autocomplete
            id="country-select-demo"
            options={data}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.groupName}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={data}
                    label="Nhóm dịch bệnh"
                    placeholder="Nhóm dịch bệnh"
                />
            )}
            onChange={onChange}
        />
    );
};

export default CustomizeAutocomplete;
