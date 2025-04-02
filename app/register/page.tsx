'use client'

import React, { useState } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { PDFDocument } from '@/components/GenPdf';

// Função para imprimir o PDF
export const handlePrint = (docProps: { title: string; content: string }) => {
  const doc = pdf(<PDFDocument title={docProps.title} content={docProps.content} />);
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

// Função para baixar o PDF
export const handleDownload = (docProps: { title: string; content: string }) => {
  const doc = pdf(<PDFDocument title={docProps.title} content={docProps.content} />);
  doc.toBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "title.pdf"; // Fixed template literal syntax
      link.click();
  });
};

function PdfViewerApp() {
  const [showPreview, setShowPreview] = useState(false);

  // Enhanced handlers that use the current document content
  const onPrint = () => {
    handlePrint({
      title: "Titulo do documento",
      content: "lorem para o conteudo do documento gerado"
    });
  };

  const onDownload = () => {
    handleDownload({
      title: "Titulo do documento",
      content: "lorem para o conteudo do documento gerado"
    });
  };

  return (
    <div className="">
      <div className="controls">
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="toggle-preview-btn"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {showPreview && (
        <div className="n">
          <div className="">
            <button onClick={onPrint} className="">Imprimir</button>
            <button onClick={onDownload} className="">Baixar</button>
          </div>
          <div className="">
            <PDFViewer width="100%" height="100%">
              <PDFDocument 
                title={"Titulo do documento"} 
                content={"lorem para o conteudo do documento gerado"} 
              />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfViewerApp;