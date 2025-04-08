import { SideBar } from "@/components/sidebar";

export default function App()
{
    return(
        <div className="">
            <div className="flex flex-row w-[300px] bg-[var(--backgroundTwo)] h-screen">
                <SideBar />
                <div className=" ">
                    <span>teste</span>
                </div>
            </div>
        </div>
    )
}