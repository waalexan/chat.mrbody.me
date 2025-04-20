'use client'
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { HomeRoute } from "@/config/dataSchema"
import Link from "next/link"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function HomeSide({ subpage }: { subpage: string }) {
    const router = useRouter();


    const Logout = () =>{
        Cookies.remove('token');
        Cookies.remove('user_id');
        Cookies.remove('user_name');
        Cookies.remove('user_email');
        Cookies.remove('user_phone');

        router.replace('/login');
    }

    return (
        <ResizablePanelGroup direction="vertical">

            <ResizablePanel defaultSize={50} minSize={50}
                className="flex flex-col">
                <div className="flex justify-center items-center h-[50px] border-b-[1px] border-b-[var(--border-line)]">
                    <Popover>
                        <PopoverTrigger>Pagina Inicial</PopoverTrigger>
                        <PopoverContent>
                            Place content for the popover here
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="p-5">
                    <h3 className="text-xl font-bold">Conta</h3>
                    <div className=" flex flex-col gap-2 py-4">
                        {
                            HomeRoute.map((item, index) => {
                                return (
                                    <Link key={index}
                                        href={item.route}
                                        className={`flex items-center gap-4  w-full p-2 pl-2 rounded-md cursor-pointer ${subpage && subpage === item.route ? "bg-[var(--button-color)]" : ""}   hover:bg-[var(--button-color)]`}>
                                        {item.icon && <item.icon size={18} className={`${subpage && subpage === item.route ? "text-[var(--primary-color)]" : ""}`} />}
                                        <label>{item.label}</label>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel 
                defaultSize={50} maxSize={50}
                className="flex flex-col justify-between">
                <div className="px-5 w-full">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Equipa</h3>
                        <button className="text-sm text-[var(--border-line)]">Ocultar detalhes</button>
                    </div>
                    <div className="mt-5 flex flex-col gap-1 text-[10pt] border-1 border-[var(--border-line)] bg-[var(--background)] p-4 rounded-[10px]">
                        <span className="text-[var(--segundary-color)] text-sm">O seu plano gratuito termina em 2 semanas</span>
                        <span>Assine os nossos pacotes e torne-se um Plus com a geneses</span>
                        <button className="bg-[var(--segundary-color)] text-[var(--backgroundTwo)] rounded-sm p-2 w-[100%] mt-2 font-bold">
                            Saiba mais no nosso blog
                        </button>
                    </div>
                </div>
                <div className="p-2 mt-5 border-t-[1px] border-t-[var(--border-line)]">
                    <div className="flex items-center">
                        <h1 className="font-bold text-xl">Walter Alexandre Santana</h1>
                        <span className="ml-3 bg-[var(--primary-color)] p-1 text-[9pt] rounded-sm">
                            Basic
                        </span>
                    </div>
                    <div className="py-1">
                        <span className="text-sm">walteralexandresantana@gmail.com</span>
                    </div>
                    <button
                        onClick={Logout}
                        className="w-full flex flex-col cursor-pointer items-center justify-center p-2 text-[var(--backgroundTwo)] rounded-md border-2 border-[var(--primary-color)]"
                    >

                        <span className="text-[12pt] font-bold text-[var(--primary-color)] mt-1">Sair da conta</span>
                    </button>
                </div>
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}