'use client';

import { useEffect, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { cloudinaryProp} from '@/app/types/interfaces'

export default function UploadPage() {
  const [resource, setResource] = useState<cloudinaryProp>();

  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary"
        uploadPreset="Tcc"
        onSuccess={(result, { widget }) => {
          setResource(result?.info);
          widget.close();
        }}
        onFailure={(error) => {
          console.error('Erro no upload:', error);
        }}
      >
        {({ open }) => (
          <button onClick={open}>Carregar Imagem</button>
        )}
      </CldUploadWidget>

      {resource && (
        <div>
          <h2>Ficheiro Carregado</h2>
          <span>Nome: {resource?.display_name}</span>
          <span>Tamanho: {resource?.bytes}</span>
          <span>Create Date: {resource?.created_at}</span>
          <span>Format: {resource?.format}</span>
          <span>Imagem: {resource?.secure_url}</span>
          <img
            src={resource?.secure_url}
            alt="Imagem carregada"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
