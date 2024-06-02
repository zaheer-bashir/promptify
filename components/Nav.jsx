"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn , signOut, useSession , getProviders } from "next-auth/react"

const Nav = () => {
    const isUserLoggedIn = true;
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [ providers, setProviders ] = useState(null);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setProviders();
    }, []);
    
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg" alt="Promptify" width={40} height={40} className="object-contain" />
        </Link>

        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">Create Post</Link>
                    <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                    <Link href="/profile" className="flex gap-2 flex-center">
                        <Image src="/assets/images/logo.svg" alt="Profile" width={37} height={37} className="rounded-full" />
                    </Link>
                </div>
                ) : (
                    <>
                     {providers && Object.values(providers).map(provider => (
                        <button type="button" key={provider.name} onClick={()=> {signIn(provider.id)}} className="black_btn">
                            Sign In
                        </button>
                     ))}
                    </>
                )
                }
        </div>

        { /* Mobile Nav */ }

        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">Create Post</Link>
                    <Image src="/assets/images/logo.svg" 
                    alt="profile" 
                    width={37} 
                    height={37} 
                    className="rounded-full"
                    onClick={() => setToggleDropdown((prev) => !prev)}
                    />
                    {toggleDropdown && (
                        <div className="">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                            <button type="button" className="mt-5 w-full black_btn" onClick={() => {setToggleDropdown(false), signOut()}}>Sign Out</button>
                    </div>
                    )}
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map(provider => (
                   <button type="button" key={provider.name} onClick={()=> {signIn(provider.id)}} className="black_btn">
                       Sign In
                   </button>
                ))}
               </>
            )}
            
        </div>

    </nav>
  )
}

export default Nav