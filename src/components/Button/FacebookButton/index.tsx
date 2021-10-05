import facebookLogo from "../../../assets/facebookLogo.svg";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface FacebookButtonProps extends ButtonBaseProps {}

const facebookIconWrapper = {
    width: "1.5em",
    height: "1.5em",
    borderRadius: "50%",
    marginTop: "1px",
    marginLeft: "1px",
};

const FacebookLogo = () => (
    <div style={facebookIconWrapper}>
        <img src={facebookLogo} />
    </div>
);
const FacebookButton = (props: FacebookButtonProps) => {
    const { children } = props;
    return (
        <ButtonBase startIcon={<FacebookLogo />} {...props}>
            {children}
        </ButtonBase>
    );
};
export default FacebookButton;
