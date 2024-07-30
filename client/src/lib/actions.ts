import axios from "axios";
import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export async function FetchData (
  setStateFunction: React.Dispatch<React.SetStateAction<{}>>, 
  pathSuffix: string
){
    const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}${pathSuffix}`
    await axios.get(path)
    .then((res) => {
        setStateFunction(res.data);
        console.log(`
        Data fetching operations - SUCCESS \n
        path: ${path}   
        response:
        `, res);
    })
    .catch((err) => {
      console.log(`
        Data fetching operations - FAILURE \n
        path: ${path}  
        error:  
    `, err);
    })
  }

export async function CreateNewUser (email: string, password: string, username: string, cb1: React.Dispatch<React.SetStateAction<string>>, cb2: React.Dispatch<React.SetStateAction<boolean>>){
  const cleanedUsername: string = username.trim().split(' ').join('_');
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/sign_up`;
  const data = {username: cleanedUsername, email, password};
  await axios.post(path, data, { withCredentials: true })
  .then((res) => {
    cb2(false);
    if (res.data.success){
      console.log(res.data);
    }else{
      cb1(res.data.message);
    }
    console.log(`
      User creation - SUCCESS \n
      path: ${path}   
      response:
      `, res);
  })
  .catch((err) => {
    cb2(false);
    console.log(`
      User creation - FAILURE \n
      path: ${path}  
      error:  
  `, err);
  })
}

export async function login (email: string, password: string, cb1: React.Dispatch<React.SetStateAction<string>>, cb2: React.Dispatch<SetStateAction<boolean>>, cb3: NavigateFunction) {
  const data = {email , password};
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/login`;
  cb2(true);
  await axios.post(path, data, { withCredentials: true })
  .then((res) => {
    console.log('user id : ', res.data.user);
    console.log('jwt token: ', res.data.token);
    cb3('/dash');
  })
  .catch((error) => {
    console.log(error)
    cb1(`Error : ${error.response.data}`);
    cb2(false);
  })
}