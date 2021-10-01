import { API_ROOT_URL } from "src/configurations";

import CRUDTable, { IColumn } from "src/components/CRUDTable";

const Accounts: React.FC = () => {
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        { field: "firstName", align: "left", title: "Tên", index: 2 },
        { field: "dob", align: "left", title: "Ngày sinh", index: 3 },
        { field: "streetAddress", align: "left", title: "Địa chỉ", index: 4 },
        { field: "city", align: "left", title: "Thành phố", index: 4 },
    ];

    return (
        <CRUDTable
            title="Quản lí tài khoản"
            enableFilter
            query={`${API_ROOT_URL}/accounts`}
            columns={colums}
            action={{
                onDelete: true,
            }}
        />
    );
};

export default Accounts;
