import jwtDecode from 'jwt-decode';

export const authUser={
  setToken:(token)=>{
    localStorage.setItem("token",token);
  },
  getToken:()=>{
    const token=localStorage.getItem("token");
    try {
      return jwtDecode(token);
    } catch (error) {
      return {};
    }
  },
  getTokenString:()=>localStorage.getItem("token"),
  clearToken:()=>{
    localStorage.clear();
  },
}