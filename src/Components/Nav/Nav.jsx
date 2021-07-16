import React, { useEffect, useState } from "react";
import "./nav.css";
import { useHistory } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { useAuth } from "../../Contexts";
import axios from "axios";
import { API } from "../../api";

export function Nav() {
  const [openProfile, setOpenProfile] = useState("open-modal");
  const [user, setUser] = useState({});
  const { authState, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const {
        data: { result },
      } = await axios.get(`${API}/api/get_user_data`, {
        headers: { authorization: authState.token },
      });
      setUser(result);
    })();
  }, [authState]);

  return (
    <>
      <nav>
        <div className="header">
          <h1>
            Code<span className="it">Stream</span>
          </h1>
        </div>
        <div className="nav-bar">
          <div>
            <div className="profile-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU"
                alt="avtaar"
                className="avtaar sm"
                onClick={() => {
                  setOpenProfile("profile-modal");
                }}
              />
            </div>
            <div className={openProfile}>
              <div className="profile-content">
                <RiCloseFill
                  style={{
                    float: "right",
                    margin: "0.25rem 0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpenProfile("open-modal");
                  }}
                />
                {authState.isUserLoggedIn ? (
                  <div className="modal-div">
                    <div className="profile-header">
                      <h2>{user.name}</h2>
                    </div>
                    <div className="profile-desc">
                      <div>
                        <p className="profile-field">Email</p>
                        <p className="profile-data">{user.email}</p>
                      </div>
                      <div>
                        <p className="profile-field">Username</p>
                        <p className="profile-data">{user.username}</p>
                      </div>
                      <div>
                        <button
                          className="logout-btn"
                          onClick={() => {
                            logout();
                          }}
                        >
                          <IoLogOutOutline className="logout-icon" />
                          LogOut
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="login-content">
                    <div>
                      <p>Login to continue.</p>
                    </div>
                    <div>
                      <button
                        className="logout-btn"
                        onClick={() => {
                          history.push("/login");
                        }}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
