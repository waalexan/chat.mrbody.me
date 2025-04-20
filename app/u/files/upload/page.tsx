'use client';

import { useState } from 'react';
import { CldUploadWidget, CldUploadWidgetPropsChildren } from 'next-cloudinary';
import { cloudinaryProp } from '@/app/types/interfaces';

export default function UploadPage() {
  const [resource, setResource] = useState<cloudinaryProp | undefined>(undefined);

  const handleSuccess = (result: any, widget: any) => {
    if (result?.info) {
      const info: cloudinaryProp = {
        display_name: result.info.display_name,
        bytes: result.info.bytes,
        created_at: result.info.created_at,
        format: result.info.format,
        secure_url: result.info.secure_url,
        asset_id: result.info.asset_id,
        original_filename: result.info.original_filename,
        resource_type: result.info.resource_type,
        signature: result.info.signature,
      };
      setResource(info);
    }
    widget.close();
  };

  // Função para garantir que open seja chamado corretamente
  const handleOpen = (open: () => void) => {
    open(); // Chama o método open do widget
  };

  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary"
        uploadPreset="Tcc"
        onSuccess={handleSuccess}
      >
        {({ open }: CldUploadWidgetPropsChildren) => (
          <button onClick={() => handleOpen(open)}>Carregar Imagem</button> // Agora chamamos handleOpen
        )}
      </CldUploadWidget>

      {resource && (
        <div>
          <h2>Ficheiro Carregado</h2>
          <span>Nome: {resource.display_name}</span>
          <span>Tamanho: {resource.bytes}</span>
          <span>Create Date: {resource.created_at}</span>
          <span>Format: {resource.format}</span>
          <span>Imagem: {resource.secure_url}</span>
          <img
            src={resource.secure_url}
            alt="Imagem carregada"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
