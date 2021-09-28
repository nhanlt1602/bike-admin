import React, { createContext, useState } from "react";

import SnackbarBase, { AlertBase, AlertBaseProps } from "src/components/Snackbar/SnackbarBase";

export type showSnackbar = (newAlert: AlertBaseProps) => void;
export const SnackbarContext = createContext<showSnackbar>(({}) => {});

const SnackbarProvider: React.FC = ({ children }) => {
    const [alert, setAlert] = useState<AlertBaseProps>({});
    const [open, setOpen] = useState<boolean>(false);

    const showSnackbar = (newAlert: AlertBaseProps) => {
        setAlert({
            variant: "filled",
            severity: "success",
            ...newAlert,
        });
        setOpen(true);
    };

    const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        if (!open) {
            setAlert({});
        }
    };

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <SnackbarBase
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
            >
                <AlertBase variant="filled" {...alert} onClose={handleClose} />
            </SnackbarBase>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
