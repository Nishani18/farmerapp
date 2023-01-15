import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = "https://farmer-6ap5.onrender.com";

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      console.log("token fetched");
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};

export const Login = (email, password) => {
  return async (dispatch) => {
    let token = null;
    axios
      .post(`${baseURL}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((Response) => {
        console.log("It enters here!!");
        console.log(Response);
        if (Response.data.accessToken == undefined) {
          console.log("Not proper");
          token = email;
        } else {
          token = Response.data.accessToken;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // here we can use login api to get token and then store it
    console.log("token", token);
    await AsyncStorage.setItem("token", token);
    console.log("token stored");
    dispatch({
      type: "LOGIN",
      payload: token,
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };
};
