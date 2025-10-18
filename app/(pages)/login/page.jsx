import { CardDemo } from "@/components/CardDemo"

const Page = ({ }) => {
    return (
        <>
            <div className="flex h-screen justify-center w-full items-center">
                <div className="form bg-slate-100 rounded-lg shadow-lg w-full max-w-md">
                    <CardDemo />
                </div>
            </div>
        </>
    )
}

export default Page