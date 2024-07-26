import {LANDING_PAGE_NAV_LINKS} from "@/lib/constants";
import { X , Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center p-4 gap-10">

      <nav className="fixed z-10 top-0 left-0 w-full px-5 py-3 bg-white flex flex-row justify-between items-center ">

        <span className="font-bold text-2xl">
          Poll<span className="text-[#16AF8E]">io</span>
        </span>

        <Menu 
          size={27}
          className={`z-30 ${mobileNavVisible ? 'hidden' : 'block'} lg:hidden`}
          onClick={() => setMobileNavVisible(true)}
        />

        <X 
          size={27}
          className={`z-30 ${mobileNavVisible ? 'block' : 'hidden'} lg:hidden`}
          onClick={() => setMobileNavVisible(false)}
        />

        <div className={`fixed top-0 z-20 bg-white h-[100vh] w-3/4 pt-14 px-3 transition-all duration-300 ease-in-out ${mobileNavVisible ? 'right-0' : '-right-full'} rounded-tl-3xl rounded-bl-3xl lg:hidden`}>
          <ul className="p-0 m-0 flex-col justify-center items-start gap-4 text-lg mb-10 mt-5">
            {
              LANDING_PAGE_NAV_LINKS.map((link) => (
                <li 
                  key={link.key}
                  className="w-full py-2 px-4 rounded-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-accent "
                >
                  <a href={link.href}>{link.label}</a>
                </li>
              ))
            }
          </ul>
          <div className="flex flex-col justify-center items-start gap-3 px-3 w-full">
            <Button 
              variant='outline' 
              className="rounded-full font-semibold text-md"
              onClick={() => {}}
            >
              Log in
            </Button>
            <Button 
              variant='default'
              className="rounded-full font-semibold text-lg flex justify-between items-center gap-2"
              onClick={() => {}}
            >
              Sign up <ArrowRight />
            </Button>
          </div>
        </div>

        <div 
          className={`w-full h-full fixed top-0 left-0 bg-gray-400 z-10 bg-opacity-20 transition-all duration-300 ease-in-out ${mobileNavVisible ? 'block' : 'hidden'} lg:hidden`}
          onClick={() => setMobileNavVisible(false)}
        ></div>


        <ul className="p-0 m-0 flex-row justify-center items-center gap-6 hidden lg:flex">
          {
            LANDING_PAGE_NAV_LINKS.map((link) => (
              <li key={link.key} className="py-2 px-4 text-lg transition-all duration-300 ease-in-out rounded-sm hover:bg-accent hover:cursor-pointer">
                <a href={link.href}>{link.label}</a>
              </li>
            ))
          }
        </ul>

        <div className="flex-row justify-center items-start gap-3 px-3 hidden lg:flex">
            <Button 
              variant='outline' 
              className="rounded-full font-semibold text-md"
              onClick={() => {}}
            >
              Log in
            </Button>
            <Button 
              variant='default'
              className="rounded-full font-semibold text-lg flex justify-between items-center gap-2"
              onClick={() => {}}
            >
              Sign up <ArrowRight />
            </Button>
          </div>

      </nav>

      <section className="w-full mt-10 border border-red-400">
        Hero section
      </section>

      <section className="w-full mt-10 border border-green-400">
          Features section
      </section>

      <section className="w-full mt-10 border border-blue-400">
          Testimonials section
      </section>

      <section className="w-full mt-10 border border-purple-400">
          Contact Us section
      </section>

      <footer className="w-full mt-10 border border-purple-400">
          Footer section
      </footer>

    </main>
  )
}

export default App
