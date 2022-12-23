import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const axiosJWT = axios.create()

function Logout() {
  const navigate = useNavigate()
  const LogOutAction = async () => {
    var userInfo = JSON.parse(localStorage.getItem("token"))
    await axiosJWT.post(
      "http://ec2-3-212-156-138.compute-1.amazonaws.com:3001/logout",
      {
        refreshToken: userInfo.refreshToken,
      }
    )
    localStorage.removeItem("token")

    navigate("/login", { replace: true })
  }
  return (
    <div>
      <button onClick={LogOutAction}>Log out</button>
    </div>
  )
}
export default Logout
