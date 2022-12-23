import axios from "axios";
// READ ME: fix the expiry date of the new token

async function GetRefreshToken(refreshToken) {
  try {
    const res = await axios.post(
      "https://keeper-server-amir.herokuapp.com/refresh",
      {
        refreshToken: refreshToken,
      }
    );
    console.log("res.data, ", res.data);
    console.log("res.data, ", res.data.token);
    localStorage.setItem("token", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log(err);

    return null;
  }
}

export default GetRefreshToken;
