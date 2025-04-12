import { SideBar } from "@/components/Sidebar";
import HomeSide from "@/components/sidebar/home";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Dashboard() {
    return (
        <div className="flex flex-row h-screen">
            <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
                <SideBar className="h-full" page="/" />
            </nav>

            <main className="flex-1 h-full">
                <ResizablePanelGroup direction="horizontal" className="h-full">

                    <ResizablePanel defaultSize={20} maxSize={20} className="bg-[var(--backgroundTwo)] contain-content border-r-[1px] border-r-[var(--border-line)]">
                        <HomeSide subpage="/" />
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={80} className="">
                        <div className="bg-[var(--backgroundFour)] h-[40%] relative contain-content border-b-2 border-b-[var(--border-line)]">
                            <h1 className="text-[150px] font-bold absolute -bottom-18 ml-5 text-[var(--text-header)] select-none">IPIKK ADMIN</h1>
                            <div className="p-[60px]">
                                <h1 className="font-bold text-[60pt]">Bem-vindo</h1>
                                <span className="text-sm max-w-[50px]">
                                    Sistema de gestao de recusos humanos
                                </span>
                            </div>
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </main>
        </div>
    );
}
