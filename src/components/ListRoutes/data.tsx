import account from "../../assets/account.png";
import certificate from "../../assets/certificate.png";
import dashboard from "../../assets/dashboard.png";
import disease from "../../assets/disease.png";
import doctor from "../../assets/doctor.png";
import drugs from "../../assets/drugs.png";
import history from "../../assets/history.png";
import hospital from "../../assets/hospital.png";
import major from "../../assets/major.png";
import patient from "../../assets/patient.png";
import setting from "../../assets/setting.png";
import symptoms from "../../assets/symptoms.png";
import timeframe from "../../assets/timeframe.png";

export const routes = [
    {
        id: 1,
        name: "Bảng điều khiển",
        path: "/dash-boards",
        icon: dashboard,
    },
    {
        id: 2,
        name: "Lịch sử tư vấn",
        path: "/health-checks",
        icon: history,
    },
    {
        id: 3,
        name: "Bệnh nhân",
        path: "/patients",
        icon: patient,
    },
    {
        id: 4,
        name: "Bác sĩ",
        path: "/doctors",
        icon: doctor,
    },
    // {
    //     id: 5,
    //     name: "Xác nhận Bác sĩ",
    //     path: "/verify/doctors",
    //     icon: <LocalHospitalIcon />,
    // },
    {
        id: 5,
        name: "Cấu hình chung",
        icon: setting,
        children: [
            {
                id: 6,
                name: "Bệnh viện",
                path: "/hospitals",
                icon: hospital,
            },
            {
                id: 7,
                name: "Chứng chỉ",
                path: "/certifications",
                icon: certificate,
            },
            {
                id: 8,
                name: "Chuyên ngành",
                path: "/majors",
                icon: major,
            },
            {
                id: 9,
                name: "Thuốc",
                path: "/dash-board/general-setting/drug-manage",
                icon: drugs,
            },
            {
                id: 10,
                name: "Triệu chứng",
                path: "/symptoms",
                icon: symptoms,
            },
            {
                id: 11,
                name: "Loại bệnh",
                path: "/dash-board/general-setting/disease-manage",
                icon: disease,
            },
            {
                id: 12,
                name: "Khung thời gian",
                path: "/time-frames",
                icon: timeframe,
            },
            {
                id: 13,
                name: "Tài khoản",
                path: "/accounts",
                icon: account,
            },
        ],
    },
];

// export const routesControlApp = [
//     {
//         id: 15,
//         name: "About us",
//         path: "/about-us",
//         children: null,
//         icon: <Info />,
//     },
// ];
