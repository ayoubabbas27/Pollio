import { UI } from "@/components"
import { Link } from "react-router-dom"
function Login() {
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

        <UI.CardContent className="w-full flex flex-col justify-center items-start gap-4">
          <div className="w-full">
            <UI.Label htmlFor="email">Email</UI.Label>
            <UI.Input required name="email" type="email" id="email" placeholder="example@gmail.com"/>
          </div>
          <div className="w-full">
            <UI.Label htmlFor="password">Password</UI.Label>
            <UI.Input required name="password" type="password" id="password" placeholder="Enter your password"/>
          </div>
          <UI.Button className="rounded-full">
            Login
          </UI.Button>
        </UI.CardContent>

        <UI.CardFooter className="text-sm">
          <span className="text-muted-foreground">You don't have an account yet ? then please <Link to="/sign_up" className="underline text-primary font-semibold">Sign Up</Link> here</span>
        </UI.CardFooter>

      </UI.Card>

    </main>
  )
}

export default Login