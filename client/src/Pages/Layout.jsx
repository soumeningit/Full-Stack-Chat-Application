import React, { useState } from "react";
import MyChat from "../component/Chat/MyChat";
import ChatSection from "../component/Chat/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../redux/Slices/ProfileSlice";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import LogoutModal from "../component/common/LogoutModal";
import { useNavigate } from "react-router-dom";

const LayoutPage = () => {
  const { token } = useSelector((state) => state.auth);
  const { view } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSearchClick = () => {
    dispatch(setView(true));
  };

  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function logoutHandle() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4 justify-between items-ce">
        {/* <h1 className="text-xl font-bold">Fixed Header</h1> */}
        <div className="flex flex-1">
          <div className="flex items-center">
            <button
              onClick={handleSearchClick}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              <FaSearch />
            </button>
            <p>Search User Here</p>
          </div>
          <>
            <button
              onClick={handleLogoutClick}
              class="group flex items-center justify-start max-w-28 max-h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <AiOutlineLogout />
              </div>
              <div class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </>
        </div>
      </header>

      {/* Offset for Fixed Header */}
      <div className="flex-1 mt-16 flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-4">
            <MyChat />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-200 p-4 overflow-y-auto h-[calc(100vh-4rem)] ">
          <div className="">
            <ChatSection />
          </div>
        </div>
      </div>

      <LogoutModal
        showModal={showModal}
        onClose={handleCloseModal}
        onLogout={logoutHandle}
      />
    </div>
  );
};

export default LayoutPage;
