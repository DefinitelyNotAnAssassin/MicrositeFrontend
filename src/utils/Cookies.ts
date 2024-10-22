export const getJwt = () => {
  const accessToken = localStorage.getItem("user")
  if (!accessToken) {
    window.location.href = "/program_chair_login"
    return
  } else {
    return accessToken
  }
}
