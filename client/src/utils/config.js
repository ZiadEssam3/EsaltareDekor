const token = localStorage.getItem("token")?.trim() || "";
console.log(token);
export const headers = {
  Authorization: token ? `Bearer ${token}` : "",
  Accept: "application/json",
  "Cache-Control": "no-cache",
};


export const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(row => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
};