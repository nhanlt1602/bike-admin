import React from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StarBorder from "@mui/icons-material/StarBorder";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Collapse,
    Divider,
    Icon,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Account } from "src/containers/AccountManagement/models/Account.model";

// export interface AccountProps {
//     account: Account;
//     accountData: [];
//     setAccountData: [];
// }
const imgLink =
    "https://afamilycdn.com/150157425591193600/2020/10/19/base64-16030963538052065905430.png";

const account: Account = {
    id: 13,
    email: "taylor13@gmail.com",
    firstName: "Phạm",
    lastName: "Thu Hà",
    streetAddress: "21 W.",
    locality: "46th St.",
    city: "New York",
    postalCode: "10001",
    phone: "0891213001",
    avatar: imgLink,
    dob: "13/12/1989",
    isMale: false,
    active: true,
    registerTime: "01/10/2021",
    role: {
        id: 2,
        name: "patient",
    },
};

// const AccountProfile: React.FC<Account> = (props: Account) => {
const AccountProfile = () => {
    // const { account, accountData } = props;
    // const { account } = props;
    const [openInfo, setOpenInfo] = React.useState(true);
    const [open, setOpen] = React.useState(true);
    const handleClickInfo = () => {
        setOpenInfo(!openInfo);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    let genderIcon = (
        <Icon color="primary" sx={{ fontSize: 50 }}>
            male_outlined_icon
        </Icon>
    );
    if (!account.isMale) {
        genderIcon = <Icon sx={{ color: pink[500], fontSize: 40 }}>female_outlined_icon</Icon>;
    }

    // / const [account, setAccount] = useState<Account>();
    // const [patient, setPatient] = useState<Doc>();

    // const params = useParams<{ id: string }>();

    // useEffect(() => {
    //     // const accountId = props.match.params.id;
    //     const accountId = params.id;
    //     axios
    //         .get("/accounts/" + accountId)
    //         .then((response) => {
    //             console.log(response.data);
    //             // const account = response.data;
    //             // setAccount(account);
    //         })
    //         .catch((error) => {
    //             alert(error);
    //         });

    //     axios
    //         .get("/patients/" + accountId)
    //         .then((response) => {
    //             // const patient = response.data;
    //             // setPatient(patient);
    //         })
    //         .catch((error) => {
    //             alert(error);
    //         });
    // });
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Avatar
                            src={account.avatar}
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                        />
                        <Typography>Bs. {`${account.firstName} ${account.lastName}`}</Typography>
                        <Rating
                            name="half-rating-read"
                            defaultValue={4.5}
                            precision={0.5}
                            readOnly
                        />
                        <List
                            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={handleClickInfo}>
                                <ListItemIcon>
                                    <PermIdentityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Thông tin" />
                                {openInfo ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openInfo} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Tên: ${account.firstName}`} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Họ: ${account.lastName}`} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Ngày sinh: ${account.dob}`} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={genderIcon} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Ngày đăng ký: ${account.registerTime}`}
                                        />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Địa chỉ" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Ngày đăng ký: ${account.locality}`}
                                        />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Thành phố: ${account.city}`} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Postal code: ${account.registerTime}`}
                                        />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <ContactsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Liên hệ" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Số điện thoại: ${account.phone}`} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={`Email: ${account.email}`} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Stack direction="row" spacing={1}>
                        <Chip label="success" color="success" />
                    </Stack>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default AccountProfile;
