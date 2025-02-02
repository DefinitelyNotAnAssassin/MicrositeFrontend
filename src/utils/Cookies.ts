import { BASE_URL } from "@/constants/UrlConstants"

export const getJwt = () => {
  const accessToken = JSON.parse(localStorage.getItem("user") || "{}").access

  if (!accessToken) {
    window.location.href = "/program_chair_login"
    return
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }

    fetch(`${BASE_URL}/API/verifyAuth`, { headers }).then((response) => {
      if (!response.ok) {
        window.location.href = "/program_chair_login"
      }
    })

    return accessToken
  }
}
