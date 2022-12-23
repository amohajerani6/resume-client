import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Logout from "./Logout"
import axios from "axios"
const axiosJWT = axios.create()

function CreatePage() {
  const navigate = useNavigate()
  var userInfo = JSON.parse(localStorage.getItem("token"))
  const { register, handleSubmit } = useForm()
  const [pageName, setPageName] = useState("")

  function onChangeFunc(event) {
    setPageName(event.target.value)
  }

  function handleCreate(event) {
    axiosJWT
      .post(
        "http://ec2-3-212-156-138.compute-1.amazonaws.com:3001/create-page",
        {
          page: pageName,
        },
        {
          headers: {
            authorization: "Bearer " + userInfo.token,
            "content-type": "multipart/form-data",
          },
        }
      )
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

    event.preventDefault()
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("page", pageName)
    console.log("formData ", formData)
    axiosJWT
      .post(
        "http://ec2-3-212-156-138.compute-1.amazonaws.com:3001/create-page",
        formData,
        {
          headers: {
            authorization: "Bearer " + userInfo.token,
            "Content-type": "multipart/form-data",
          },
        }
      )
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
  return (
    <>
      <div className="loginPage">
        <Logout />
        <h1>Create page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="page"
            type="text"
            placeholder="page name"
            className="userInput"
            onChange={onChangeFunc}
          />
          <input type="file" name="file" {...register("file")} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default CreatePage
