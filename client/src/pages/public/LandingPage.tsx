import {LANDING_PAGE_NAV_LINKS} from "@/lib/constants";
import { X , Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { UI } from "@/components";
import { Link } from "react-router-dom";

function LandingPage() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center p-4 gap-10">

      <nav className="fixed z-10 top-0 left-0 w-full px-5 py-3 bg-white flex flex-row justify-between items-center ">

        <span className="font-bold text-2xl">
          Poll<span className="text-[#16AF8E]">io</span>
        </span>

        <UI.Button 
            variant="ghost"
            className={`z-30 rounded-full px-2 py-0 ${mobileNavVisible ? 'hidden' : 'block'} lg:hidden`}
            onClick={() => setMobileNavVisible(true)}
        >
        <Menu 
            size={27}
            className="m-0 p-0"
        />
        </UI.Button>
        <UI.Button 
            variant="ghost"
            className={`z-30 rounded-full px-2 py-0 ${mobileNavVisible ? 'block' : 'hidden'} lg:hidden`}
            onClick={() => setMobileNavVisible(false)}
        >
        <X 
            size={27}
            className="m-0 p-0"
        />
        </UI.Button>

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
            <UI.Button 
              variant='outline' 
              className="rounded-full font-semibold text-md"
              asChild
            >
              <Link to="/login" className="flex flex-row justify-center items-center gap-2">Log in</Link>
            </UI.Button>
            <UI.Button 
              variant='default'
              className="rounded-full font-semibold text-lg flex justify-between items-center gap-2"
              asChild
            >
              <Link to="/sign_up">Sign up <ArrowRight /></Link>
            </UI.Button>
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
            <UI.Button 
              variant='outline' 
              className="rounded-full font-semibold text-md"
              asChild
            >
              <Link to="/login" className="flex flex-row justify-center items-center gap-2">Log in</Link>
            </UI.Button>
            <UI.Button 
              variant='default'
              className="rounded-full font-semibold text-lg flex justify-between items-center gap-2"
              asChild
            >
              <Link to="/sign_up">Sign up <ArrowRight /></Link>
            </UI.Button>
          </div>

      </nav>

      {/* <section id="#features" className="relative rounded-xl w-full mt-14 border border-red-400 flex flex-col justify-center items-center gap-6 max-h-[600px]">

        <img src="/images/cool-background.png" alt="background hero section" className="object-cover"/>

        <div className="absolute inset-0 flex flex-col justify-center items-center gap-5 text-white">
          <span className="text-xl lg:text-2xl xl:4-xl font-bold">Create, Share, and Discover Polls with Pollio</span>
          <span className="text-lg lg:text-xl text-center max-w-xl">Engage your audience with interactive polls. Collect valuable insights and make informed decisions. Join Pollio today and start creating polls that matter!</span>
          <UI.Button className="flex justify-center items-center gap-2" size="lg">
            Get Started Now <ArrowRight size={18} />
          </UI.Button>
        </div>
      </section> */}
      <section id="#features" className="relative rounded-xl w-full mt-14 flex justify-center items-center min-h-[450px] max-h-[600px] xl:h-[800px] border border-red-400 overflow-hidden">
        <img src="/images/cool-background.png" alt="background hero section" className="absolute top-0 left-0 w-full h-full object-cover"/>
        <div className="absolute left-0 top-0 w-full h-full bg-gray-600 bg-opacity-35"></div>
        <div className="relative flex flex-col justify-center items-center gap-5 xl:gap-8 text-white text-center p-6">
          <span className="text-xl lg:text-2xl xl:text-4xl font-bold">Create, Share, and Discover Polls with Pollio</span>
          <span className="text-lg lg:text-xl max-w-xl">Engage your audience with interactive polls. Collect valuable insights and make informed decisions. Join Pollio today and start creating polls that matter!</span>
          <UI.Button className="flex justify-center items-center gap-2" size="lg" asChild>
            <Link to="/sign_up">
              Get Started Now <ArrowRight size={18} />
            </Link>
          </UI.Button>
        </div>
      </section>

      <section id="#about" className="w-full mt-10 border border-green-400">
          Features section
      </section>

      <section id="#testimonials" className="w-full mt-10 border border-blue-400">
          Testimonials section
      </section>

      <section id="#contact_us" className="w-full mt-10 border border-purple-400">
          Contact Us section
      </section>

      <footer className="w-full mt-10 border border-purple-400">
          Footer section
      </footer>

    </main>
  )
}

export default LandingPage
