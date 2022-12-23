import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
function Page() {
  let { page } = useParams()

  return (
    <div>
      <iframe
        src={"http://localhost:3001/" + page + "#view=fitH"}
        width="100%"
        height={1000}
        margin={0}
        padding={0}
        border="none"
      ></iframe>
    </div>
  )
}
export default Page
