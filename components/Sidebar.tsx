import { sideData } from "@/config/dataSchema";
import { Gem, Plus } from "lucide-react";
import Link from 'next/link';  // Importando o Link do Next.js


// Adicionando a tipagem para o className
export function SideBar({ className, page }: { className?: string, page?: string }) {
    return (
        <div className={`flex flex-col items-center justify-between border-r-[1px] border-r-[var(--border-line)] ${className} `}>
            <div className="flex items-center flex-col">
                <div className="h-[50px] flex items-center justify-center mb-2">
                    <h1>Logo</h1>
                </div>
                <div className="flex flex-col items-center">
                    {sideData.map((item, index) => (
                        <Link
                            key={index}
                            href={item?.route || ""}  // Navegação usando Link
                            passHref
                            className="flex flex-col items-center justify-center p-2"
                        >
                            <div className={`p-3 border-[1px] rounded-md ${page === item?.route ? 'bg-[var(--primary-color)] border-[var(--primary-color)]' : 'border-[var(--border-line)]'}`}>
                                {item?.icon && <item.icon size={18} className={`${page === item.route ? 'text-[var(--backgroundTwo)]' : ''}`} />}
                            </div>
                            <span
                                className={`text-[8pt] font-bold ${page === item?.route ? 'text-[var(--primary-color)]' : ''}`}>
                                {item?.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <Link
                    href={""}  // Navegação usando Link
                    passHref
                    className="flex flex-col items-center justify-center p-2"
                >
                    <div className="p-3 border-[1px] border-[var(--tertiary-color)] rounded-md">
                        <Gem size={18} className="text-[var(--tertiary-color)]" />
                    </div>
                    <span className="text-[8pt] font-bold text-[var(--tertiary-color)]">Primium</span>
                </Link>

                <Link
                    href={""}  // Navegação usando Link
                    passHref
                    className="flex flex-col items-center justify-center p-2"
                >
                    <div className="p-3 bg-[var(--primary-color)] rounded-md">
                        <Plus size={18} className="text-[var(--backgroundTwo)]" />
                    </div>
                    <span className="text-[8pt] font-bold text-[var(--primary-color)] mt-1">Novo og</span>
                </Link>
            </div>
        </div>
    );
}
