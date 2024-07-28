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

export function CreateNewUser (data: FormDataEntryValue){
  
  
  // console.log('username : ', username);
  // console.log('email : ', email);
  // console.log('password : ', password);
}