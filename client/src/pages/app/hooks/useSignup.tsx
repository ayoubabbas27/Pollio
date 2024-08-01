import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useSignup = () => {

    const { dispatch } = useAuthContext()
    
    async function signup (email: string, password: string, username: string, cb1: React.Dispatch<React.SetStateAction<string>>, cb2: React.Dispatch<React.SetStateAction<boolean>>){

        const cleanedUsername: string = username.trim().split(' ').join('_');
        const path: string = `${import.meta.env.VITE_SERVER_ORIGIN}/sign_up`;
        const data = {username: cleanedUsername, email, password};
      
      
        await axios.post(path, data, { withCredentials: true })
        .then((res) => {
          cb2(false);
          if (res.data.success){
            console.log(res.data);
            // save the user in local storage
            localStorage.setItem('user', JSON.stringify({userObj: res.data.user, token: res.data.token}));
      
            // update the auth context
            dispatch({ type: 'LOGIN', payload: {userObj: res.data.user, token: res.data.token} })

            console.log(`
                User creation - SUCCESS \n
                path: ${path}   
                response:
                `, res);
      
            return res.data;
          }else{
            cb1(res.data.message);
          }
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
      return { signup }
}