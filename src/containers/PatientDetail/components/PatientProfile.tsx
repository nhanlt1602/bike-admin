import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";

export interface IPatientInfo {
    isMale?: boolean;
    avatar?: string;
    fullName?: string;
    bloodGroup?: string;
    dob?: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive: boolean;
    clicked: VoidFunction;
}

const PatientProfile: React.FC<IPatientInfo> = (props: IPatientInfo) => {
    let genderIcon = (
        <Icon color="primary" sx={{ fontSize: 30 }}>
            male_outlined_icon
        </Icon>
    );
    if (!props.isMale) {
        genderIcon = <Icon sx={{ color: pink[500], fontSize: 30 }}>female_outlined_icon</Icon>;
    }
    return (
        <Card>
            <CardContent sx={{ height: 557 }}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={props.avatar}
                        sx={{
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {genderIcon}
                        <Typography color="textPrimary" gutterBottom variant="h5">
                            {props.fullName}
                        </Typography>
                    </Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <BloodtypeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.bloodGroup} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CakeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.dob} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.phone} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EmailOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.address} />
                        </ListItem>
                    </List>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color={props.isActive ? "error" : "success"}
                    fullWidth
                    variant="text"
                    onClick={props.clicked}
                >
                    {props.isActive ? "Khóa tài khoản" : "Kích hoạt tài khoản"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default PatientProfile;
