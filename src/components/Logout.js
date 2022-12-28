import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import "./styles.css"

function Logout() {
  const navigate = useNavigate()
  const LogOutAction = async () => {
    var userInfo = JSON.parse(localStorage.getItem("token"))
    await axios.post("/logout", {
      refreshToken: userInfo.refreshToken,
    })
    localStorage.removeItem("token")

    navigate("/login", { replace: true })
  }
  return (
    <div>
      <button onClick={LogOutAction} className="logOutbutton">
        Log out
      </button>
    </div>
  )
}
export default Logout
