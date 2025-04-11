'use client';

import { SideBar } from "@/components/Sidebar";
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { PDFDocument } from '@/service/GenPdf';
import HomeSide from "@/components/sidebar/home";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BrainCog, Ellipsis, Eye, Search } from "lucide-react";
import { employeeProp } from "@/app/@types/interfaces";
import { data } from "@/config/dataSchema";
import { useState } from "react";

// Função para imprimir PDF
export const handlePrint = ({ data }: { data: employeeProp }) => {
  const doc = pdf(<PDFDocument data={data} />);
  doc.toBlob().then((blob) => {
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.visibility = 'hidden';
    iframe.src = url;
    document.body.appendChild(iframe);
    iframe.contentWindow?.print();
  });
};

// Função para baixar PDF
export const handleDownload = ({ data }: { data: employeeProp }) => {
  const doc = pdf(<PDFDocument data={data} />);
  doc.toBlob().then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.name} Inicio de funções.pdf`;
    link.click();
  });
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    filterData(searchQuery);
  };

  const filterData = (searchQuery: string) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.BI.toLowerCase().includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery) ||
      item.phone.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Barra lateral principal */}
      <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
        <SideBar className="h-full" page="/" />
      </nav>

      {/* Conteúdo principal */}
      <main className="flex-1 h-full select-none">
        <ResizablePanelGroup direction="horizontal" className="h-full">

          {/* Sidebar secundária */}
          <ResizablePanel
            defaultSize={20}
            maxSize={20}
            className="bg-[var(--backgroundTwo)] border-r border-[var(--border-line)]"
          >
            <HomeSide subpage="/u/employee" />
          </ResizablePanel>

          <ResizableHandle />

          {/* Painel principal */}
          <ResizablePanel defaultSize={80}>
            {/* Search Input */}
            <div className="border-b-1 border-b-[var(--border-line)] h-[50px] flex flex-row justify-center items-center px-3">
  <Search size={18} className="mr-2" />
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Pesquisar por nome, BI, email, telefone..."
    className="p-2 w-full outline-0"
  />
  

</div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>BI</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Agente Nº</TableHead>
                  <TableHead>Ações</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.BI}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.cargo}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.AgenteNumber}</TableCell>

                    {/* Preview PDF */}
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-sm text-blue-600 flex items-center gap-2">
                            <Eye size={18} />
                            <span>Visualizar</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="w-[90vw] h-[90vh] flex flex-col">
                          <DialogHeader>
                            <DialogTitle>Visualização do PDF</DialogTitle>
                            <DialogDescription>
                              Pré-visualização do relatório do funcionário.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex-grow w-full">
                            <PDFViewer width="100%" height="100%" className="rounded-md">
                              <PDFDocument data={item} />
                            </PDFViewer>
                          </div>
                          <DialogFooter />
                        </DialogContent>
                      </Dialog>
                    </TableCell>

                    {/* Dropdown Ações */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis size={18} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handlePrint({ data: item })}>
                            Imprimir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload({ data: item })}>
                            Baixar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Detalhes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
