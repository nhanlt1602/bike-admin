import logoGoogle from "../../../assets/googleLogo.svg";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface GoogleButtonProps extends ButtonBaseProps {}

const googleIconWrapper = {
    width: "1.5em",
    height: "1.5em",
    borderRadius: "50%",
    marginTop: "1px",
    marginLeft: "1px",
};

const GoogleLogo = () => (
    <div style={googleIconWrapper}>
        <img src={logoGoogle} />
    </div>
);
const GoogleButton = (props: GoogleButtonProps) => {
    const { children } = props;
    return (
        <ButtonBase startIcon={<GoogleLogo />} {...props}>
            {children}
        </ButtonBase>
    );
};
export default GoogleButton;
