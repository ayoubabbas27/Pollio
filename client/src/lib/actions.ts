import axios from "axios";

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

export async function CreateNewUser (email: string, password: string, username: string){
  const cleanedUsername: string = username.trim().split(' ').join('_');
  const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/sign_up`;
  const data = {username: cleanedUsername, email, password};
  await axios.post(path, data)
  .then((res) => {
    console.log(res.data);
    console.log(`
      User creation - SUCCESS \n
      path: ${path}   
      response:
      `, res);
  })
  .catch((err) => {
    console.log(`
      User creation - FAILURE \n
      path: ${path}  
      error:  
  `, err);
  })
}