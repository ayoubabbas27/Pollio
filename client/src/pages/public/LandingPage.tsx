import {LANDING_PAGE_NAV_LINKS} from "@/lib/constants";
import { X , Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CUSTOM, UI } from "@/components";
import { Link } from "react-router-dom";

function LandingPage() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center gap-10">

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

      <section id="#hero" className="relative w-full mt-20 flex justify-center items-center min-h-[450px] max-h-[600px] xl:h-[800px] overflow-hidden">
        <img src="/images/cool-background.png" alt="background hero section" className="absolute top-0 left-0 w-full h-full object-cover"/>
        <div className="absolute left-0 top-0 w-full h-full bg-gray-600 bg-opacity-35"></div>
        <div className="relative flex flex-col justify-center items-center gap-5 xl:gap-8 text-white text-center p-6">
          <span className="text-xl lg:text-2xl xl:text-4xl font-bold">Create, Share, and Discover Polls with Pollio</span>
          <span className="text-lg lg:text-xl max-w-xl">Engage your audience with interactive polls. Collect valuable insights and make informed decisions. Join Pollio today and start creating polls that matter!</span>
          <UI.Button className="flex justify-center items-center gap-2 rounded-full" size="lg" asChild>
            <Link to="/sign_up">
              Get Started Now <ArrowRight size={18} />
            </Link>
          </UI.Button>
        </div>
      </section>

      <section id="#about" className="w-full mt-10  flex flex-col justify-center items-center gap-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-4 xl:mb-14">About Pollio</h2>
          <div className="flex flex-row flex-wrap justify-center items-center gap-6 xl:gap-14">
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Introduction</span>
              <span className="text-muted-foreground text-center text-lg">Pollio is dedicated to providing a user-friendly platform for creating, sharing, and analyzing polls. Our goal is to help individuals and organizations gather valuable feedback and make informed decisions.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Our Mission</span>
              <span className="text-muted-foreground text-center text-lg">We aim to make polling accessible and straightforward for everyone, regardless of technical expertise.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Our Vision</span>
              <span className="text-muted-foreground text-center text-lg">To be the leading platform for interactive polling, empowering global connections and insights.</span>
            </div>
          </div>
      </section>

      <section id="#features" className="w-full mt-10  flex flex-col justify-center items-center gap-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-4 xl:mb-14">Unlock the Power of Polling with Pollio</h2>
          <div className="flex flex-row flex-wrap justify-center items-center gap-6 xl:gap-14">
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Easy Poll Creation</span>
              <span className="text-muted-foreground text-center text-lg">Create polls quickly and effortlessly with our intuitive interface. Customize your polls with various options and settings to suit your needs.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Engage Your Audience</span>
              <span className="text-muted-foreground text-center text-lg">Share your polls across social media, email, or embed them on your website. Engage your audience and gather valuable feedback in real-time.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">Analyze Results Instantly</span>
              <span className="text-muted-foreground text-center text-lg">Access detailed analytics to understand the opinions and trends of your respondents. Make informed decisions based on real-time data and insights.</span>
            </div>
          </div>
      </section>

      <section id="#how_it_works" className="w-full mt-10  flex flex-col justify-center items-center gap-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-4 xl:mb-10">How Pollio Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10 mx-auto">
            <div className="flex flex-col justify-center items-center  gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">1. Sign Up and Get Started</span>
              <span className="text-muted-foreground text-center text-lg">Create your free Pollio account in minutes. Start by signing up with your email or social media accounts.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">2. Create Your Polls</span>
              <span className="text-muted-foreground text-center text-lg">Use our simple poll creation tool to design your poll. Choose from multiple question types, customize options, and set your preferences.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">3. Share Your Poll</span>
              <span className="text-muted-foreground text-center text-lg">Once your poll is ready, share it via a unique link, embed it on your website, or distribute it through social media and email.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">4. Collect Responses</span>
              <span className="text-muted-foreground text-center text-lg">Watch the responses roll in real-time. Engage with your audience and encourage participation to gather valuable feedback.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">5. Analyze the Data</span>
              <span className="text-muted-foreground text-center text-lg">Access comprehensive analytics to visualize the results. Understand trends, patterns, and insights to make informed decisions.</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 max-w-xl xl:w-[400px]">
              <span className="text-primary text-xl font-semibold text-center">6. Take Action</span>
              <span className="text-muted-foreground text-center text-lg">Use the insights gained from your polls to improve your business, projects, or educational programs. Make data-driven decisions with confidence.</span>
            </div>
          </div>
          <UI.Button className="flex justify-center items-center gap-2 rounded-full" size="lg" asChild>
            <Link to="/sign_up">
              Get Started Now <ArrowRight size={18} />
            </Link>
          </UI.Button>
      </section>

      <section id="#contact_us" className="w-full mt-10 bg-[#16b18f] flex flex-row flex-wrap justify-center items-center gap-6 px-4 py-7">
        <div className="flex flex-col justify-start items-start max-w-[500px]">
          <h2 className="text-2xl font-bold mb-4 xl:mb-10 text-white">Get in Touch with Us</h2>
          <span className="text-primary-foreground text-base">We're here to help you with any questions or feedback you may have. Reach out to us and our team will get back to you as soon as possible.</span>
        </div>
        <form action="POST" className="w-[500px] flex flex-col justify-center items-center gap-5 p-5 border-2 border-slate-50 rounded-lg"> 
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <UI.Label htmlFor="email" className="text-white text-md">Email</UI.Label>
            <UI.Input type="email" id="email" name="email" placeholder="example@gmail.com"/>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <UI.Label htmlFor="subject" className="text-white text-md">Subject</UI.Label>
            <UI.Input type="text" id="subject" name="subject" placeholder="What is the subject of your message ?"/>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <UI.Label htmlFor="message" className="text-white text-md">Message</UI.Label>
            <UI.Textarea id="message" name="message" placeholder="Write your message here..."/>
          </div>
        </form>
      </section>

      <CUSTOM.Footer />

    </main>
  )
}

export default LandingPage
