import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authHelper } from "../helpers/authHelper";
import { clearUser } from "../store/slices/userSlice";
import { taskApi } from "../store/api/taskApi";
import { categoryApi } from "../store/api/categoryApi";
import { accountApi } from "../store/api/accountApi";

/**
 * Hook returning a logout function that:
 * 1. Removes the auth token
 * 2. Clears user slice
 * 3. Resets all RTK Query API caches (task, category, account)
 * 4. Navigates to /login (unless prevented via options)
 */
export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useCallback(
    (options?: { redirect?: boolean }) => {
      // Remove token & clear user data
      authHelper.removeUserToken();
      dispatch(clearUser());

      // Reset RTK Query caches so the next user doesn't see stale data
      dispatch(taskApi.util.resetApiState());
      dispatch(categoryApi.util.resetApiState());
      dispatch(accountApi.util.resetApiState());

      if (options?.redirect !== false) {
        navigate("/login");
      }
    },
    [dispatch, navigate]
  );
}
