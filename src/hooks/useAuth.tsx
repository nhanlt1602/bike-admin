import { useHistory } from "react-router";
import axios from "src/axios";
import { auth } from "src/config/firebase";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import { AuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const googleProvider = new GoogleAuthProvider();

const useAuth = (provider: AuthProvider) => {
    const showSnackBar = useSnackbar();
    const history = useHistory();
    const login = async () => {
        try {
            let response = await signInWithPopup(auth, provider);
            if (response) {
                let tokenId = await response.user.getIdToken();
                let responseLogin = await axios.post("http://localhost:14599/api/v1/login", {
                    tokenId: tokenId,
                    loginType: 2,
                });
                if (responseLogin.status === 200) {
                    LocalStorageUtil.setItem("user", responseLogin?.data?.account);
                    LocalStorageUtil.setItem("token", responseLogin?.data.accessToken);
                    history.push("/");
                }
            }
        } catch (exception: any) {
            // eslint-disable-next-line no-console
            console.log(exception);
            showSnackBar({
                severity: "error",
                children: "Đăng nhập thất bại",
            });
        }
    };

    return { login };
};

export default useAuth;
