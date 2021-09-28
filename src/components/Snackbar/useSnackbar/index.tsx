import { useContext } from "react";

import { SnackbarContext } from "src/context/SnackbarProvider.context";

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
