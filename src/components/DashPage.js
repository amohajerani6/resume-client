import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Logout from "./Logout"
import { useForm } from "react-hook-form"
import axios from "axios"
const axiosJWT = axios.create()
function DashPage() {
  const { register, handleSubmit } = useForm()
  var userInfo = JSON.parse(localStorage.getItem("token"))
  let { page } = useParams()
  const [pageTraffic, setPageTraffic] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await axiosJWT.get("https://api.thegagali.com/dash/" + page, {
        headers: { authorization: "Bearer " + userInfo.token },
      })
      setPageTraffic(res.data.traffic)
    }
    fetchData()
  }, [])
  const navigate = useNavigate()
  const publicPage = "/" + page

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("page", page)
    axiosJWT
      .post("https://api.thegagali.com/create-page", formData, {
        headers: {
          authorization: "Bearer " + userInfo.token,
          "Content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.created) {
          navigate("/")
        } else {
          alert("try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  function DeletePage() {
    if (window.confirm("Do you really want to leave?")) {
      axiosJWT
        .delete("https://api.thegagali.com/dash/" + page, {
          headers: {
            authorization: "Bearer " + userInfo.token,
          },
        })
        .then(function (response) {
          navigate("/")
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const trafficInfo = pageTraffic.map((item) => (
    <li key={item["_id"]}>
      {"ts: " +
        item["ts"] +
        ", time: " +
        Date(item["ts"]) +
        ", IP: " +
        item["query"] +
        ", Country: " +
        item["country"] +
        ", City:   " +
        item["city"]}
    </li>
  ))
  return (
    <div>
      <ul>
        <li>
          <Logout navigate />
        </li>
        <li>
          <Link to={publicPage}>See the page</Link>
        </li>
        <li>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" name="file" {...register("file")} />
            <button type="submit">Submit</button>
          </form>
          <button onClick={DeletePage}>Delete page</button>
        </li>
      </ul>
      <h3>Traffic</h3>
      <ul>{trafficInfo}</ul>
    </div>
  )
}
export default DashPage
