export default function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    // Remove the local storage items
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // Redirect to login page
    window.location.href = "/login";
  } else {
    // Return the current role
    return localStorage.getItem("role");
  }
}
