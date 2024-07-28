import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { DASH_NAV_LINKS } from "@/lib/constants";
import { UI } from "..";
import { Link, useLocation } from "react-router-dom";

function DashNav() {
    const [mobileNavVisible, setMobileNavVisible] = useState(false);
    const location = useLocation();

  return (
    <>
        <nav className="fixed z-10 top-0 left-0 w-full px-5 py-3 bg-white flex flex-row justify-between items-center lg:hidden border-b-2 border-b-slate-200">

            <Link className="font-bold text-2xl" to="/dash">
                Poll<span className="text-[#16AF8E]">io</span>
            </Link>
            <UI.Button 
                variant="ghost"
                className={`z-30 rounded-full px-2 py-0 ${mobileNavVisible ? 'hidden' : 'block'} `}
                onClick={() => setMobileNavVisible(true)}
            >
            <Menu 
                size={27}
                className="m-0 p-0"
            />
            </UI.Button>
            <UI.Button 
                variant="ghost"
                className={`z-30 rounded-full px-2 py-0 ${mobileNavVisible ? 'block' : 'hidden'} `}
                onClick={() => setMobileNavVisible(false)}
            >
            <X 
                size={27}
                className="m-0 p-0"
            />
            </UI.Button>

            <div className={`fixed top-0 z-20 flex flex-col justify-between items-start bg-white h-[100vh] w-3/4 pt-14 px-3 transition-all duration-300 ease-in-out ${mobileNavVisible ? 'right-0' : '-right-full'} rounded-tl-3xl rounded-bl-3xl`}>
                <div className="mt-4 w-full">
                    
                    <div className="w-full flex flex-row justify-between items-center px-3 ">
                        <div className="flex flex-col justify-center items-start">
                            <span className="text-muted-foreground text-sm">User name</span>
                            <span className="text-muted-foreground text-sm italic">user@gmail.com</span>
                        </div>
                        <UI.Avatar>
                            <UI.AvatarImage src="https://github.com/shadcn.png" />
                            <UI.AvatarFallback>CN</UI.AvatarFallback>
                        </UI.Avatar>
                    </div>

                    <ul className="p-0 m-0 flex flex-col justify-center items-start gap-2 text-lg mb-10 mt-14">
                        {
                        DASH_NAV_LINKS.map((link) => (
                            <li 
                                key={link.key}
                                className={`w-full py-2 px-4 rounded-sm group transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-accent ${(location.pathname === link.href) ? 'font-semibold bg-accent': 'hover:bg-accent'}`}
                                onClick={() => setMobileNavVisible(false)}
                            >
                                <Link to={link.href} className="w-full h-full flex items-center">
                                    {link.label}
                                </Link>
                            </li>
                        ))
                        }
                    </ul>
                </div>

                <div className="flex flex-col justify-center items-start gap-3 px-3 w-full mb-4">
                    <UI.Button 
                        variant='outline' 
                        className="rounded-full font-semibold text-md"
                        asChild
                    >
                        <Link to="/" className="flex flex-row justify-center items-center gap-2">Log out <LogOut /></Link>
                    </UI.Button>
                </div>

            </div>

            <div 
                className={`w-full h-full fixed top-0 left-0 bg-gray-400 z-10 bg-opacity-20 transition-all duration-300 ease-in-out ${mobileNavVisible ? 'block' : 'hidden'}`}
                onClick={() => setMobileNavVisible(false)}
            ></div>
        </nav>
        
        <nav className="hidden lg:flex flex-col justify-between items-start h-[100vh] top-0 left-0 px-4 py-5 min-w-64 xl:w-80 bg-white border-r-2 border-r-slate-200">
            <div className="w-full flex flex-col justify-start items-start gap-5">
                
                <Link className="font-bold text-2xl" to="/dash">
                    Poll<span className="text-[#16AF8E]">io</span>
                </Link>

                <div className="w-full flex flex-col justify-start items-start gap-3">
                    <span className="text-muted-foreground">Logged in as</span>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        <UI.Avatar>
                            <UI.AvatarImage src="https://github.com/shadcn.png" />
                            <UI.AvatarFallback>CN</UI.AvatarFallback>
                        </UI.Avatar>
                        <div className="flex flex-col justify-center items-start ">
                            <span className="text-muted-foreground text-sm">User name</span>
                            <span className="text-muted-foreground text-sm italic">user@gmail.com</span>
                        </div>                
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-start gap-3 mt-3">
                    {
                        DASH_NAV_LINKS.map((link) => (
                            <Link 
                                key={link.key}
                                className={`w-full py-2 px-2 rounded-sm group transition-all duration-200 ease-in-out hover:cursor-pointer ${(location.pathname === link.href) ? 'font-semibold bg-accent': 'hover:bg-accent'} `}
                                onClick={() => setMobileNavVisible(false)}
                                to={link.href}
                            >
                                {link.label}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="w-full">
                <UI.Button 
                        variant='outline' 
                        className="rounded-full font-semibold text-md "
                        asChild
                    >
                        <Link to="/" className="flex flex-row justify-center items-center gap-2">Log out  <LogOut /> </Link>
                </UI.Button>
            </div>

        </nav>
    </>
  )
}

export default DashNav