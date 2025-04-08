import { Home, Layers, Settings } from "lucide-react";
import Link from 'next/link';  // Importando o Link do Next.js

const sideData = [
    {
        icon: Home,
        label: "Home",
        route: "/home"
    },
    {
        icon: Layers,
        label: "Estatistica",
        route: "/estatistica"
    },
    {
        icon: Settings,
        label: "Definições",
        route: "/setting"
    }
];

// Adicionando a tipagem para o className
export function SideBar({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div>
                <h1>Logo</h1>
            </div>
            <div className="flex flex-col items-center gap-4">
                {sideData.map((item, index) => (
                    <Link
                        key={index} 
                        href={item.route}  // Navegação usando Link
                        passHref
                    >
                        <button 
                            className="flex flex-col items-center justify-center space-x-2 p-2 hover:bg-gray-200"
                        >
                            {item.icon && <item.icon />}
                            <span className="text-[8pt] font-bold">{item.label}</span>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
