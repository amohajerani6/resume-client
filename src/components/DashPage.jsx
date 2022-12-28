import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "../api/axios"
import TrafficTable from "./TrafficTable"
import Header from "./Header"
function DashPage() {
  const { register, handleSubmit } = useForm()
  var userInfo = JSON.parse(localStorage.getItem("token"))
  let { page } = useParams()
  const [pageTraffic, setPageTraffic] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/dash/" + page, {
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
    axios
      .post("/create-page", formData, {
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
      axios
        .delete("/dash/" + page, {
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

  return (
    <div>
      <Header />
      <ul>
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
      <TrafficTable data={pageTraffic}></TrafficTable>
    </div>
  )
}
export default DashPage
