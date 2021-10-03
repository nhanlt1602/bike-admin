import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "src/axios";

import ConsultationHistory from "./components/ConsultationHistory";
import PatientHealthInfo from "./components/PatientHealthInfo";
import PatientProfile from "./components/PatientProfile";
import { ConfirmModal } from "src/components/ConfirmModal";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import Util from "../../utils/Util";
import { Account } from "../AccountManagement/models/Account.model";
import { Patient } from "./models/Patient.model";

import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

const PatientDetail: React.FC = () => {
    const showSnackbar = useSnackbar();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [patient, setPatient] = useState<Patient>();

    const params = useParams<{ id: string }>();
    const accountId = params.id;

    const toggleBtnActive = () => {
        setIsOpenConfirmModal(true);
    };

    const handleCloseConfirmModal = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await axios.put("/accounts/change-status/" + accountId);
                if (response.status === 200) {
                    setIsActive(!isActive);
                    showSnackbar({
                        children: "Cập nhật trạng thái tài khoản thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
            } catch (error) {
                showSnackbar({
                    children: "Cập nhật trạng thái tài khoản thất bại",
                    variant: "filled",
                    severity: "error",
                });
            }
        }
        setIsOpenConfirmModal(false);
    };

    const getAccountById = useCallback(
        async (accountId) => {
            try {
                const response = await axios.get("/accounts/" + accountId);
                if (response.status === 200) {
                    const data: Account = response.data;
                    const convertedDob = Util.convertDate(data.dob);
                    const accountRes: Account = { ...data, dob: convertedDob };
                    setIsActive(accountRes.active);
                    setAccount(accountRes);

                    const res = await axios.get("/patients/email/" + accountRes.email);
                    if (res.status === 200) {
                        setPatient(res.data);
                    }
                }
            } catch (_error) {
                showSnackbar({
                    children: "Có lỗi xảy ra! Không thể lấy dữ liệu từ hệ thống!",
                    variant: "filled",
                    severity: "error",
                });
            }
        },
        [showSnackbar]
    );

    useEffect(() => {
        getAccountById(accountId);
    }, [accountId, getAccountById]);

    return (
        <React.Fragment>
            <ConfirmModal
                open={isOpenConfirmModal}
                message={`Bạn có muốn ${isActive ? "khóa" : "kích hoạt"} tài khoản này không?`}
                handleClose={handleCloseConfirmModal}
            />
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <PatientProfile
                                isMale={account?.isMale}
                                avatar={account?.avatar}
                                fullName={`${account?.firstName} ${account?.lastName}`}
                                bloodGroup={patient?.bloodGroup}
                                dob={account?.dob}
                                phone={account?.phone}
                                email={account?.email}
                                address={`${account?.streetAddress}, ${account?.locality}, ${account?.city}`}
                                isActive={isActive}
                                clicked={toggleBtnActive}
                            />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <Box>
                                <PatientHealthInfo
                                    allery={patient?.allergy}
                                    backgroundDisease={patient?.backgroundDisease}
                                />
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <ConsultationHistory healthChecks={patient?.healthChecks} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default PatientDetail;
