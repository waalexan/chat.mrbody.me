'use client'
import { SideBar } from "@/components/Sidebar";
import HomeSide from "@/components/sidebar/home";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useToken } from "@/config/setting";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { id, name, email, phone } = useToken();
    const router = useRouter();

    return (
        <div className="flex flex-row h-screen">
            <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
                <SideBar className="h-full" page="/live" />
            </nav>

            <main className="flex-1 h-full">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                    {/* Painel lateral esquerdo (HomeSide) */}
                    <ResizablePanel defaultSize={20} maxSize={20} minSize={10} className="bg-[var(--backgroundTwo)] contain-content border-r-[1px] border-r-[var(--border-line)]">
                        <HomeSide subpage="/u/home" />
                    </ResizablePanel>

                    <ResizableHandle />

                    {/* Painel principal com conteúdo */}
                    <ResizablePanel defaultSize={80} className="flex flex-col">
                        <div className="bg-[var(--backgroundFour)] h-[30%] relative contain-content border-b-2 border-b-[var(--border-line)]">
                            <div className="p-[60px]">
                                <h1 className="font-bold text-[60pt]">Live</h1>
                                <button
                                    className="hover:cursor-pointer hover:text-red-500"
                                    onClick={() => window.open("https://webrtc-app-9teq.onrender.com/", "_blank")}>
                                    Conferencia entre campos
                                </button>
                            </div>
                        </div>

                        {/* Adicionando iframe dentro do painel principal */}
                        <div className="flex-1 overflow-hidden">
                            <iframe 
                                src="https://webrtc-app-9teq.onrender.com/" 
                                className="w-full h-full border-none"
                                title="Dashboard Content"
                                loading="lazy"
                            />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </div>
    );
}
