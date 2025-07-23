import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return; // ✅ Already authenticated, no need to fetch again

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO); // ✅ Corrected: API_PATHS not API_PATH
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (err) {
        console.error("User fetch error:", err);
        if (isMounted) {
          clearUser();
          navigate("/login"); // ✅ Always use leading slash
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]); // ✅ Added `user` to deps
};
