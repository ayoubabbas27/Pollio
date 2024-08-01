import { UI } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

function Login() {

  const {login} = useLogin();

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log('login handle submit function called')
    const formData = new FormData(event.currentTarget);
    const {email, password} = Object.fromEntries(formData.entries());
    await login(email as string, password as string, setMessage, setPending);
  }

  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <UI.Card className="flex flex-col justify-center items-center gap-2">

        <UI.CardHeader className="w-full flex flex-col justify-center items-center gap-2">
          <UI.CardTitle>
            <Link className="font-bold text-4xl" to="/">
                Poll<span className="text-[#16AF8E]">io</span>
            </Link>
          </UI.CardTitle>
          <UI.CardDescription className="text-lg">
            Welcome back !
          </UI.CardDescription>
        </UI.CardHeader>
        <form method="POST" onSubmit={handleSubmit} className="w-full">
          <UI.CardContent className="w-full flex flex-col justify-center items-start gap-4">
            <div className="w-full">
              <UI.Label htmlFor="email">Email</UI.Label>
              <UI.Input required name="email" type="email" id="email" placeholder="example@gmail.com"/>
            </div>
            <div className="w-full">
              <UI.Label htmlFor="password">Password</UI.Label>
              <UI.Input required name="password" type="password" id="password" placeholder="Enter your password"/>
            </div>
            <UI.Button type="submit" className="rounded-full" disabled={pending} >
              Login
            </UI.Button>
            <span className="text-destructive text-sm mt-2 max-w-full break-words whitespace-pre-wrap">
              {message}
            </span>
          </UI.CardContent>
        </form>

        <UI.CardFooter className="text-sm">
          <span className="text-muted-foreground">You don't have an account yet ? then please <Link to="/sign_up" className="underline text-primary font-semibold">Sign Up</Link> here</span>
        </UI.CardFooter>

      </UI.Card>

    </main>
  )
}

export default Login