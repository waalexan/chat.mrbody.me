'use client';

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { endpoint } from "@/config/microservice";

interface ReportProps {
  id: string;
  title: string;
  description: string;
  address: string;
  photo: string;
  created_at: string;
  lat: number;
  lon: number;
  user_name: string;
  user_email: string;
}

const ReportDetail = (promiseParams: { params: Promise<{ id: string }> }) => {
  const { id } = use(promiseParams.params);
  const [report, setReport] = useState<ReportProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Chama a API para buscar o relatório
  useEffect(() => {
    if (id) {
      fetch(`${endpoint.api_register}/report?id=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Relatório não encontrado');
          } 
          return response.json();
        })
        .then((data) => {
          setReport(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao carregar o relatório", error);
          toast.error("Erro ao carregar o relatório");
          setLoading(false);
        });
    }
  }, [id]);

  // Enquanto os dados estão sendo carregados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Exibe os dados do relatório
  if (!report) {
    return <div>Relatório não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">{report.title}</h1>
      <div className="mt-2 text-sm text-muted-foreground">
        <span>{report.user_name}</span> |{" "}
        {/* <span>{formatDistanceToNowStrict(new Date(report.created_at), { addSuffix: true, locale: ptBR })}</span> */}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Descrição</h2>
        <p>{report.description}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Endereço</h2>
        <p>{report.address}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Localização</h2>
        <p>Latitude: {report.lat}, Longitude: {report.lon}</p>
      </div>
      {report.photo && (
        <div className="mt-4">
          <h2 className="text-xl">Foto</h2>
          <img
            src={report.photo}
            alt="Foto do relatório"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ReportDetail;
