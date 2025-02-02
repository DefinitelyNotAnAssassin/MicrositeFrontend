export const GetSubdomain = () => {
  const Subdomain = window.location.hostname.split(".")[0]
  return Subdomain
}
