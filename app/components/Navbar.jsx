import Image from "next/image";

const Navbar = ({}) => {
    const links =[
        {name: "Dashboard", path: "/"},
        {name: "About", path: "/about"},
        {name: "Contact", path: "/contact"},
        {name: "Blog", path: "/blog"},
        {name: "Help", path: "/help"},
    ]
  return (
    <>
    <div className="flex bg-red-100 text-red-600 items-center font-bold px-3">
        <div className="w-1/4 p-4 font-bold text-lg">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-13"/>
        </div>
        <div className="w-3/4 p-4 flex justify-end space-x-4">
            {links.map((link) => (
                <a key={link.name} href={link.path} className="hover:underline">
                    {link.name}
                </a>
            ))}
        </div>
    </div>
    </>
  );
}

export default Navbar