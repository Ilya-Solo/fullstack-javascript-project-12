import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../slices/authSlice";

const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleLogout}>
      {t("login.exit")}
    </button>
  );
};

export default LogoutButton;
