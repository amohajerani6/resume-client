import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"
import axios from "../api/axios"

function Home() {
  const [pages, setPages] = useState(["1", "2", "3"])
  var userInfo = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("", {
        headers: { authorization: "Bearer " + userInfo.token },
      })
      setPages(res.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Header />
      <h1>Welcome home</h1>
      <Link to="/createpage">Create a new page</Link>
      <h1>Existing pages</h1>
      {pages.map(function (page, idx) {
        return (
          <div key={idx}>
            <Link to={"/dash/" + page.page}>{page.page}</Link>
          </div>
        )
      })}
    </div>
  )
}
export default Home
