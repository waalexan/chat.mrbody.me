'use client';

import { SideBar } from "@/components/Sidebar";
import HomeSide from "@/components/sidebar/home";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { employeeProp } from "@/app/types/interfaces";
import { useEffect, useState } from "react";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";



export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [employees, setEmployees] = useState<employeeProp[]>([]);
  const [filteredData, setFilteredData] = useState<employeeProp[]>([]);

  useEffect(() => {
    const employeesRef = ref(database, 'employees/');
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val();
      const employeesList = data ? Object.values(data) as employeeProp[] : [];
      setEmployees(employeesList);
      setFilteredData(employeesList); // <- Aqui corrige o erro
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    filterData(searchQuery);
  };

  const filterData = (searchQuery: string) => {
    const filtered = employees.filter((item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.BI.toLowerCase().includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery) ||
      item.phone.toLowerCase().includes(searchQuery)
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
            <HomeSide subpage="/u/files" />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80}>
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

                    <TableCell>

                    </TableCell>

                    <TableCell>

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
