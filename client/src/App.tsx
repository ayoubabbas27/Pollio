import { Routes, Route } from "react-router-dom"
import { pages } from "@/pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<pages.Layout />}>
        <Route index element={<pages.LandingPage />}/> 

        <Route path="login" element={<pages.Login />}/>

        <Route path="sign_up" element={<pages.SignUp />} />

        {/*Start dash Routes - Routes to protect*/}
        <Route path="dash" element={<pages.DashLayout />}>
          <Route index element={<pages.Dashboard />} />

          <Route path="my_polls" >
            <Route index element={<pages.MyPolls />} />
          </Route>

          <Route path="teams" >
            <Route index element={<pages.Teams />} />
          </Route>

          <Route path="polling_requests" >
            <Route index element={<pages.PollingRequests />} />
          </Route>

        </Route>{/*End dash Routes */}

      </Route>

    </Routes>
  )
}

export default App
