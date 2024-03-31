import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

const MenuItems = ({to, label}) => {

	const { user, setUser } = useContext(UserContext);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
		await axios.post("/logout");
		setUser(null);
    navigate('/');
	};

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleLogoutConfirm = (e) => {
    e.preventDefault();
    handleLogout();
    closeLogoutDialog();
  };

  return (
    <>
      {label === "Logout" && (
        <Link onClick={openLogoutDialog} className="px-4 py-3 bg-white hover:bg-neutral-100 transition border-t-2">
          {label}
        </Link>
      )}
      {isLogoutDialogOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-10">
            <div className="bg-white p-7 rounded-md">
              <p className="text-xl">Are you sure you want to logout?</p>
              <div className="mt-4 flex justify-end">
                <button onClick={handleLogoutConfirm} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">Yes</button>
                <button onClick={closeLogoutDialog} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">No</button>
              </div>
            </div>
          </div>
      )}
      {label !== "Logout" && (
        <Link to={to} className="px-4 py-3 bg-white hover:bg-neutral-100 transition">
          {label}
        </Link>
      )}
    </>
  )
}

export default MenuItems