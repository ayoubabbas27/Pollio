import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./pages/app/hooks/useAuthContext"
import { pages } from "@/pages"

function App() {
  const context = useAuthContext();
  const user = context.state.user;

  return (
    <Routes>
      <Route path="/" element={<pages.Layout />}>
        <Route index element={<pages.LandingPage />}/> 

        <Route path="login" element={ !user ? <pages.Login /> : <Navigate to="/dash" />}/>

        <Route path="sign_up" element={ !user ? <pages.SignUp /> : <Navigate to="/dash" />} />

          {/*Start dash Routes - Routes to protect*/}
          <Route path="dash" element={
            user ? <pages.DashLayout /> : <Navigate to="/login" />
          }>
            <Route index element={<pages.Dashboard />} />

            <Route path="my_polls" >
              <Route index element={<pages.MyPolls />} />

              <Route path="new" element={<pages.NewPoll />} />
            </Route>

          </Route>{/*End dash Routes */}

      </Route>

    </Routes>
  )
}

export default App
