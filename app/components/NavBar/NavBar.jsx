import Image from "next/image"
import Link from "next/link"

const NavBar = ({}) => {
    const links = [
        {name: 'Dashboard', path: '/'},
        {name: 'SRD', path: '/srd'},
        {name: 'Reports', path: '/reports'},
        {name: 'Analytics', path: '/analytics'},
        {name: 'Settings', path: '/settings'},  
    ]
  return(
    <>
    <div className="flex bg-black justify-between text-white px-4 p-2 items-center">
        <div className="logo">
            <Image src="/logo.png" alt="Logo" width={120} height={40} className="w-15" />
        </div>
        <div className="links flex gap-4">
            {links.map((link) => (
                <Link key={link.name} href={link.path} className="hover:underline">{link.name}</Link>
            ))}
        </div>
        <div className="actions flex gap-4">
            <button className="bg-white text-red-950 px-4 py-2 rounded hover:bg-gray-200">Login</button>
            <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default NavBar