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
    try {
      let response = await axios.post(`${config.baseUrl}api/login`, formData);
        sessionStorage.setItem('token', response.data.data.token);
        setAccessToken(response.data.data.token)
    } catch (error) {
    }
  }



  let getAuthUserData = async () => {
    let token= sessionStorage.getItem('token')
    try {
      let response = await axios.get(`${config.baseUrl}api/auth/user`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      setUserData(response.data);

    } catch (error) {
    }
  }


  let getTasks =async () => {
    let token= sessionStorage.getItem('token')
    try {
      let response = await axios.get(`${config.baseUrl}api/task`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      setTasksResponse(response.data.data)
    } catch (error) {
    }
  }
  return (
    <Home tasksResponse={tasksResponse} onGetTasks={getTasks} userData={userData}/>
  );
}

export default App;
