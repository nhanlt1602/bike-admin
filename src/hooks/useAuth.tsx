import { useHistory } from "react-router";
import axios from "src/axios";
import { auth } from "src/config/firebase";
import { API_ROOT_URL } from "src/configurations";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import {
    AuthProvider,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

const useAuth = () => {
    const showSnackBar = useSnackbar();
    const history = useHistory();
    const login = async (provider: AuthProvider) => {
        try {
            let response = await signInWithPopup(auth, provider);
            if (response) {
                let tokenId = await response.user.getIdToken();
                let responseLogin = await axios.post(`${API_ROOT_URL}/login`, {
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
