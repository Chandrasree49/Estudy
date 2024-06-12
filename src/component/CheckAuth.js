export default function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    
    window.location.href = "/login";
  } else {
    
    return localStorage.getItem("role");
  }
}
