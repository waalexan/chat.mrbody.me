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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { database } from "@/config/firebase";
import { toast } from "sonner"
import { ref, onValue } from "firebase/database";
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from "next/navigation";

interface ReportProps {
  id: string; // Adicionado o id aqui
  id_user: string | null;
  user_name: string | null;
  user_photo: string | null;
  user_email: string | null;
  user_phone: string | null;
  title: string | null;
  description: string | null;
  address: string | null;
  photo: string | null;
  lat: number | null;
  lon: number | null;
  created_at: Date;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [filteredData, setFilteredData] = useState<ReportProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const reportsRef = ref(database, 'reports/');
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      const reportsList = data
        ? Object.entries(data).map(([id, report]) => ({
            id, // Aqui estamos pegando a chave do Firebase e atribuindo como id
            ...report as any
          }))
        : [];
      setReports(reportsList);
      setFilteredData(reportsList);

      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    filterData(searchQuery);
  };

  const filterData = (searchQuery: string) => {
    const filtered = reports.filter((item) =>
      item.address?.toLowerCase().includes(searchQuery) ||
      item.title?.toLowerCase().includes(searchQuery) ||
      item.description?.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-row h-screen">
      <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
        <SideBar className="h-full" page="/" />
      </nav>

      <main className="flex-1 h-full select-none">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel
            defaultSize={20}
            maxSize={20}
            className="bg-[var(--backgroundTwo)] border-r border-[var(--border-line)]"
          >
            <HomeSide subpage="/u/employee" />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80} className="">
            <div className="border-b-1 border-b-[var(--border-line)] h-[50px] flex flex-row justify-center items-center px-3">
              <Search size={18} className="mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Pesquisar por zonas..."
                className="p-2 w-full outline-0"
              />
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-50px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>imagem</TableHead>
                    <TableHead>Reportagem</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} onClick={() => router.push(`/u/employee/${item.id}`)}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "6px",
                            backgroundImage: `url(${item.photo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <h2 className="font-semibold">{item.title}</h2>
                      </TableCell>

                      <TableCell>{item.description}</TableCell>

                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.address}</span>
                          <span className="text-xs text-muted-foreground">
                            Lat: {item.lat} | Lon: {item.lon}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {item.created_at && !isNaN(new Date(item.created_at).getTime()) ? (
                          formatDistanceToNowStrict(new Date(item.created_at), {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        ) : (
                          "Data inválida"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </main>
    </div>
  );
}
