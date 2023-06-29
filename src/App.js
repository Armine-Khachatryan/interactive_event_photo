import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "./app/config";
import Home from './app/pages/Home/Home';
import './App.css';

function App() {

  let [accessToken, setAccessToken] = useState(sessionStorage.getItem('token'));
  let [userData, setUserData]=useState();
  let [tasksResponse, setTasksResponse]=useState([])

  useEffect(()=>{
    postLogin();
    // getAuthUserData();
    //getTasks
  },[]);

  useEffect(()=>{
    getAuthUserData();
  },[accessToken]);

  useEffect(()=> {
    getTasks()
  },[userData?.pu_id])

  let postLogin = async () => {
    let formData = new FormData();
    formData.append('key', "JDREhqKq6Vq52v2tv8h7HKef4KxsvQpv");
    console.log(formData, "values");
    try {
      let response = await axios.post(`${config.baseUrl}api/login`, formData);
      console.log(response.data, "response login");
        sessionStorage.setItem('token', response.data.data.token);
        setAccessToken(response.data.data.token)

    } catch (error) {
      console.log(error, "error")
    }
  }

  console.log(accessToken, 111111111);


  let getAuthUserData = async () => {
    let token= sessionStorage.getItem('token')
    try {
      let response = await axios.get(`${config.baseUrl}api/auth/user`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response.data, "authhhhhhhhhhhhhhhhh")
      setUserData(response.data);

    } catch (error) {
      console.log(error, 'auth request  error');
    }
  }

  console.log(userData, "idddddddd")

  let getTasks =async () => {
    let token= sessionStorage.getItem('token')
    console.log("tasksssssssssssssss")
    try {
      let response = await axios.get(`${config.baseUrl}api/task`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response.data.data)
      setTasksResponse(response.data.data)
    } catch (error) {
      console.log(error, 'auth request  error');
      console.log(error.response, 'auth request  error response');
    }
  }
console.log(tasksResponse, "tasks array")
  return (
    <Home tasksResponse={tasksResponse} onGetTasks={getTasks} userData={userData}/>
  );
}

export default App;
