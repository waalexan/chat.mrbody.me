'use client';

import { SideBar } from "@/components/Sidebar";
import dynamic from 'next/dynamic';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const MapComponent = dynamic(() => import('@/components/Mapa'), { ssr: false });
export default function App() {
    return (
        <div className="flex flex-row h-screen">
            <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
                <SideBar className="h-full" page="/map" />
            </nav>
            <main className="flex-1 h-full">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                    <ResizablePanel defaultSize={20} maxSize={20} className="bg-[var(--backgroundTwo)] contain-content border-r-[1px] border-r-[var(--border-line)]">
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={80} className="flex flex-col flex-1">
                        <div className="flex justify-center items-center h-[50px] border-b-[1px] border-b-[var(--border-line)]">
                            dhjadhldhaaa
                        </div>
                        <MapComponent className="flex flex-1" />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </div>
    );
}
