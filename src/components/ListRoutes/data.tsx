import { Settings } from "@mui/icons-material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TimelapseIcon from "@mui/icons-material/Timelapse";

export const routes = [
    {
        id: 1,
        name: "Bảng điều khiển",
        path: "/dash-boards",
        icon: <DashboardIcon />,
    },
    {
        id: 2,
        name: "Lịch sử tư vấn",
        path: "/health-checks",
        icon: <HistoryIcon />,
    },
    {
        id: 3,
        name: "Bệnh nhân",
        path: "/patients",
        icon: <AssignmentIndIcon />,
    },
    {
        id: 4,
        name: "Bác sĩ",
        path: "/doctors",
        icon: <LocalHospitalIcon />,
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
        icon: <Settings />,
        children: [
            {
                id: 6,
                name: "Bệnh viện",
                path: "/hospitals",
                icon: <LocalHospitalIcon />,
            },
            {
                id: 7,
                name: "Chứng chỉ",
                path: "/certifications",
                icon: <CardMembershipIcon />,
            },
            {
                id: 8,
                name: "Chuyên ngành",
                path: "/majors",
                icon: <CastForEducationIcon />,
            },
            {
                id: 9,
                name: "Thuốc",
                path: "/dash-board/general-setting/drug-manage",
                icon: <MedicalServicesIcon />,
            },
            {
                id: 10,
                name: "Triệu chứng",
                path: "/symptoms",
                icon: <AutoStoriesIcon />,
            },
            {
                id: 11,
                name: "Loại bệnh",
                path: "/dash-board/general-setting/disease-manage",
                icon: <AutoFixNormalIcon />,
            },
            {
                id: 12,
                name: "Khung thời gian",
                path: "/time-frames",
                icon: <TimelapseIcon />,
            },
            {
                id: 13,
                name: "Tài khoản",
                path: "/accounts",
                icon: <TimelapseIcon />,
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
