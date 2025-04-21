'use client';

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { endpoint } from "@/config/microservice";

type Report = {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string | number;
  comments?: any[];
  fakes?: any[];
  verified?: any[];
  [key: string]: any;
};

const ReportDetail = (promiseParams: { params: Promise<{ id: string }> }) => {
  const { id } = use(promiseParams.params);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await fetch(`${endpoint.api_register}/report/${id}`);
        if (!response.ok) {
          toast.error("Erro ao buscar relatório.");
          return;
        }

        const result = await response.json();
        console.log(result)
        setReport(result);
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Erro ao carregar relatório.");
      } finally {
        setLoading(false);
      }
    };

    getReport();
  }, [id]);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (!report) return <div className="p-4">Relatório não encontrado.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Relatório</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>ID:</strong> {report.id}</p>
        <p><strong>Título:</strong> {report.title || 'Sem título'}</p>
        <p><strong>Descrição:</strong> {report.description || 'Sem descrição'}</p>
        <p>
          <strong>Criado em:</strong>{" "}
          {report.createdAt
            ? format(new Date(report.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })
            : "Data não disponível"}
        </p>
      </div>

      {/* Comentários */}
      <Section title="Comentários" items={report.comments} emptyMessage="Nenhum comentário." renderItem={(item) => (
        <li className="border-b py-2">{item.text || 'Comentário vazio'}</li>
      )} />

      {/* Falsos */}
      <Section title="Sinalizações Falsas" items={report.fakes} emptyMessage="Nenhuma sinalização falsa." renderItem={(item) => (
        <li className="border-b py-2">{item.reason || 'Sem motivo especificado'}</li>
      )} />

      {/* Verificações */}
      <Section title="Verificações" items={report.verified} emptyMessage="Nenhuma verificação." renderItem={(item) => (
        <li className="border-b py-2">{item.verifier || 'Usuário desconhecido'}</li>
      )} />
    </div>
  );
};

type SectionProps = {
  title: string;
  items?: any[];
  emptyMessage: string;
  renderItem: (item: any, index: number) => React.ReactNode;
};

const Section = ({ title, items, emptyMessage, renderItem }: SectionProps) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">{title} ({items?.length || 0})</h2>
    {items && items.length > 0 ? (
      <ul className="bg-gray-50 rounded-lg p-4">
        {items.map((item, index) => renderItem(item, index))}
      </ul>
    ) : (
      <p className="text-gray-500">{emptyMessage}</p>
    )}
  </div>
);

export default ReportDetail;
