import axios from "axios";
import * as secureStore from "expo-secure-store";

const baseURL = "https://farmer-test.onrender.com/api/auth/";

const register = (name, email, password) => {
  return axios.post(baseURL + "signin", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  console.log("enters");
  console.log(email);
  console.log(password);
  axios
    .post(`${baseURL}login`, {
      email: email,
      password: password,
    })
    .then(async (Response) => {
      console.log(Response.data.accessToken);
      try {
        await secureStore.setItemAsync("access", Response.data.accessToken);
        const demoToken = await secureStore.getItemAsync("access");
        console.log("Demo token", demoToken);
      } catch (error) {
        console.log(error);
      }
      return Response.data;
    })
    .catch((error) => {
      console.log("This is the error", error);
    });
};

const logout = async () => {
  await secureStore.deleteItemAsync("access");
};

const restore = async () => {
  return await secureStore.getItemAsync("access");
};

export default authService = {
  register,
  login,
  logout,
  restore,
};
