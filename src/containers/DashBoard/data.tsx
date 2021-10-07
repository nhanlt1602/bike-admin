import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import HistoryIcon from "@mui/icons-material/History";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelapseIcon from "@mui/icons-material/Timelapse";

export const mainDashBoard = [
    {
        id: 1,
        name: "Quản lí tài khoản",
        path: "/dash-board/account-manage",
        icon: AccountCircleIcon,
    },
    {
        id: 2,
        name: "Quản lí cấu hình bác sĩ",
        path: "/dash-board/doctor-manage",
        icon: LocalHospitalIcon,
    },
    {
        id: 3,
        name: "Quản lí cấu hình chung",
        path: "/dash-board/general-setting",
        icon: SettingsIcon,
    },
    {
        id: 4,
        name: "Lịch sử tư vấn",
        path: "/dash-board/consulting-history",
        icon: HistoryIcon,
    },
];

export const accountManageItems = [
    {
        id: 1,
        name: "Bác sĩ",
        path: "/accounts",
        icon: LocalHospitalIcon,
    },
    {
        id: 2,
        name: "Bệnh nhân",
        path: "/accounts",
        icon: AssignmentIndIcon,
    },
    {
        id: 3,
        name: "Tài khoản",
        path: "/accounts",
        icon: AccountCircleIcon,
    },
];

export const doctorManageItems = [
    {
        id: 1,
        name: "Bệnh viện",
        path: "/hospitals",
        icon: LocalHospitalIcon,
    },
    {
        id: 2,
        name: "Chứng chỉ",
        path: "/certifications",
        icon: CardMembershipIcon,
    },
    {
        id: 3,
        name: "Chuyên ngành",
        path: "/majors",
        icon: CastForEducationIcon,
    },
];

export const generalSettingManage = [
    {
        id: 1,
        name: "Thuốc",
        path: "/dash-board/general-setting/drug-manage",
        icon: MedicalServicesIcon,
    },
    {
        id: 2,
        name: "Triệu chứng",
        path: "/symptoms",
        icon: AutoStoriesIcon,
    },
    {
        id: 3,
        name: "Loại bệnh",
        path: "/dash-board/general-setting/disease-manage",
        icon: AutoFixNormalIcon,
    },
    {
        id: 4,
        name: "Khung thời gian",
        path: "/time-frames",
        icon: TimelapseIcon,
    },
];

export const drugManage = [
    {
        id: 1,
        name: "Thuốc",
        path: "/drugs",
        icon: MedicalServicesIcon,
    },
    {
        id: 2,
        name: "Loại thuốc",
        path: "/drug-types",
        icon: BloodtypeIcon,
    },
];

export const diseaseManage = [
    {
        id: 1,
        name: "Loại bệnh",
        path: "/disease",
        icon: AutoFixNormalIcon,
    },
    {
        id: 2,
        name: "Nhóm bệnh",
        path: "/disease-group",
        icon: AddToPhotosIcon,
    },
];
