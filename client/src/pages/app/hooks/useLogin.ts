import { useAuthContext } from "./useAuthContext"

import axios from "axios";

export const useLogin = () => {

    const { dispatch } = useAuthContext()
    
    async function login (email: string, password: string, cb1: React.Dispatch<React.SetStateAction<string>>, cb2: React.Dispatch<React.SetStateAction<boolean>>){

        const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/login`;
        const data = { email, password };
      
        await axios.post(path, data, { withCredentials: true })
        .then((res) => {
          if (res.status === 200){
            // save the user in local storage
            localStorage.setItem('user', JSON.stringify({userObj: res.data.user, token: res.data.token}));
      
            // update the auth context
            dispatch({ type: 'LOGIN', payload: {userObj: res.data.user, token: res.data.token} })
            console.log(`
                User login - SUCCESS \n
                path: ${path}   
                response:
                `, res);
            cb2(false);
          }
        })
        .catch((err) => {
          cb2(false);
          cb1(err.response.data);
          console.log(`
            User login - FAILURE \n
            path: ${path}  
            error:  
        `, err);
        })
    }

    return { login }
}