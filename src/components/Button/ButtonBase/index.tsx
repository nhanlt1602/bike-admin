import { ReactNode } from "react";

import {
    Button as MaterialButton,
    ButtonProps as MaterialButtonProps,
    CircularProgress,
} from "@mui/material";

export interface ButtonBaseProps extends MaterialButtonProps {
    isLoading?: boolean;
}

const buttonStyle = {
    borderRadius: "calc(1rem + 6px)",
};

const ButtonBase = (props: ButtonBaseProps) => {
    const { isLoading, color, startIcon, size, disabled, ...rest } = props;
    const circularProgressBaseColor = color === "primary" ? "secondary" : "primary";
    let startButtonIcon: JSX.Element | ReactNode;

    let circularProgressBaseSize: number;
    switch (size) {
        case "small":
            circularProgressBaseSize = 20;
            break;
        case "medium":
            circularProgressBaseSize = 24;
            break;
        case "large":
            circularProgressBaseSize = 28;
            break;
        default:
            circularProgressBaseSize = 24;
            break;
    }

    if (isLoading) {
        startButtonIcon = (
            <CircularProgress size={circularProgressBaseSize} color={circularProgressBaseColor} />
        );
    } else {
        startButtonIcon = startIcon;
    }
    const buttonBaseDisabled = disabled || isLoading;

    return (
        <MaterialButton
            startIcon={startButtonIcon}
            color={color}
            style={buttonStyle}
            disabled={buttonBaseDisabled}
            {...rest}
        />
    );
};

export default ButtonBase;
