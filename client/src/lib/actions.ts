import axios from "axios";
import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAuthContext } from "@/pages/app/hooks/useAuthContext";

 interface Poll {
    id: string;
    question: string;
    options: string[];
    votes: Record<string, number>;
    url_token: string;
    creator_id: string;
    created_at: string;
    is_active: number;
  }

  interface PageData {
    totalPolls: number;
    totalVotes: number;
  }

export async function FetchData (
  setStateFunction: React.Dispatch<React.SetStateAction<PageData>>, 
  pathSuffix: string,
  userId: number
){
    console.log('page data fetching op, userId : ', userId);
    const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}${pathSuffix}`
    await axios.get(path, {params: {userId}})
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

export async function FetchPollsData (
  setStateFunction: React.Dispatch<React.SetStateAction<Poll[]>>, 
  pathSuffix: string,
  userId: number
){
    console.log('page data fetching op, userId : ', userId);
    const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}${pathSuffix}`
    await axios.get<Poll[]>(path, {params: {userId}})
    .then((res) => {
        setStateFunction(res.data);
        console.log(`
        Polls Data fetching operations - SUCCESS \n
        path: ${path}   
        response:
        `, res);
    })
    .catch((err) => {
      console.log(`
        Polls Data fetching operations - FAILURE \n
        path: ${path}  
        error:  
    `, err);
    })
}

export async function CreateNewUser (email: string, password: string, username: string, cb1: React.Dispatch<React.SetStateAction<string>>, cb2: React.Dispatch<React.SetStateAction<boolean>>){

  const { dispatch } = useAuthContext()

  const cleanedUsername: string = username.trim().split(' ').join('_');
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/sign_up`;
  const data = {username: cleanedUsername, email, password};


  await axios.post(path, data, { withCredentials: true })
  .then((res) => {
    cb2(false);
    if (res.data.success){
      console.log(res.data);
      // save the user in local storage
      localStorage.setItem('user', JSON.stringify(res.data.user, res.data.token));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: res.data.user })

      return res.data;
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

export async function createNewPoll (creatorID: string, question: string, options: string[]){
  const data = { creatorID , question, options };
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/my_polls/new`;
  console.log('create poll action')
  await axios.post(path, data, { withCredentials: true })
  .then((res) => {
    console.log('create poll - Success \n ', res.data)
  })
  .catch((err) => {
    console.log('create poll - Failure \n ', err)
  })
}

export async function togglePollState (pollID: string, newState: number){
  const data = { pollID , newState};
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/my_polls/toggleState`;

  await axios.patch(path, data, { withCredentials: true })
  .then((res) => {
    console.log('State updated : ',res.data);
  })
  .catch((err) => {
    console.log('error while updating poll state : ', err);
  })
}

export async function deletePoll (pollID: string) {
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/my_polls/delete`;

  await axios.delete(path, { params: {pollID}})
  .then((res) => {
    console.log('poll deleted');
  })
  .catch((err) => {
    console.log(err);
  })
}

export async function fetchPoll (pollId: string, setStateFunction: React.Dispatch<React.SetStateAction<Poll | undefined>>){
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/my_polls/details`;

  await axios.get(path, { params: {pollId}})
  .then((res) => {
    console.log('poll data : ', res.data);
    setStateFunction(res.data);
  })
  .catch((err) => {
    console.log(err)
  })
}

export async function fetchVotePoll (urlToken: string,setStateFunction: React.Dispatch<React.SetStateAction<Poll | undefined>>){
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/polls/vote`;

  await axios.get(path, { params: {urlToken}})
  .then((res) => {
    setStateFunction(res.data);
  })
  .catch((err) => {
    console.log(err)
  })
}

export async function vote (urlToken: string, selectedOption: string) {
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/polls/vote/action`;
  await axios.post(path, {urlToken, selectedOption}, {withCredentials: true})
  .then((res) => {
    console.log('vote counted');
  })
  .catch((err) => {
    console.log(err);
  })
} 