import { UI } from "@/components"
import { Link } from "react-router-dom"
import { useState } from "react";
import { CreateNewUser } from "@/lib/actions";

function SignUp() {

  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(true);

  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  function handleSubmit (event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const {email, password, username} = Object.fromEntries(formData.entries());
    CreateNewUser(email as string, password as string, username as string);
    {/*Handle creating a new user */}
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    if (event.target.value.length === 0 || password_regex.test(event.target.value)) {
      setError('');
      !(event.target.value.length === 0) && setPending(false);
    } else {
      setError('The password must contain at least 6 characters, including at least one letter and one number,without any spaces or special characters');
      setPending(true);
    }
  }


  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <UI.Card className="flex flex-col justify-center items-center gap-2 mx-4 max-w-[500px]">

        <UI.CardHeader className="w-full flex flex-col justify-center items-center gap-2">
          <UI.CardTitle>
            <Link className="font-bold text-4xl" to="/">
                Poll<span className="text-[#16AF8E]">io</span>
            </Link>
          </UI.CardTitle>
          <UI.CardDescription className="text-lg">
            Let's Get Started !
          </UI.CardDescription>
        </UI.CardHeader>
        <form method="POST" onSubmit={handleSubmit} className="w-full">
          <UI.CardContent className="w-full flex flex-col justify-center items-start gap-4">
            <div className="w-full">
              <UI.Label htmlFor="username">Username</UI.Label>
              <UI.Input required name="username" type="text" id="username" placeholder="Enter your username..."/>
            </div>
            <div className="w-full">
              <UI.Label htmlFor="email">Email</UI.Label>
              <UI.Input required name="email" type="email" id="email" placeholder="example@gmail.com"/>
            </div>
            <div className="w-full">
              <UI.Label htmlFor="password">Password</UI.Label>
              <UI.Input required name="password" type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => {handlePasswordChange(e)} }/>
              {password.length > 0 && error && (
                <span className="text-destructive text-sm mt-2 max-w-full break-words whitespace-pre-wrap">
                  {error}
                </span>
              )}
            </div>
            <UI.Button 
              className="rounded-full" 
              type="submit" 
              disabled={pending}
            >
              Sign Up
            </UI.Button>
          </UI.CardContent>
        </form>

        <UI.CardFooter className="text-sm">
          <span className="text-muted-foreground">You already have an account yet ? then please <Link to="/login" className="underline text-primary font-semibold">Login</Link> here</span>
        </UI.CardFooter>

      </UI.Card>

    </main>
  )
}

export default SignUp