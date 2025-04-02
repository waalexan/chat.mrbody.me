'use client';
import React, { useState } from 'react';

interface Message {
    text: string;
    isBot: boolean;
}

const defaultSchema = {
    type: 'object',
    properties: {
        resposta: {
            type: 'string',
            description: 'Resposta amigável e informal para o usuário'
        },
        ingredientes: {
            type: 'array',
            description: 'Lista de ingredientes relevantes para a resposta',
            items: { type: "string" },
            example: ['ovo', 'farinha', 'leite'] // Corrigido exemplo
        },
        preparo: {
            type: 'string',
            description: 'Método principal de preparo',
            enum: ['cozido', 'frito', 'assado', 'outro'] // Corrigido enum
        }
    },
    required: ['resposta', 'ingredientes', 'preparo'] // Apenas resposta é obrigatória
};

function ChatBot() {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage = inputMessage.trim();
        if (!userMessage || isLoading) return;

        setIsLoading(true);
        setInputMessage('');

        try {
            const response = await fetch('/api/ia/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages,
                    schema: defaultSchema,
                }),
            });

            if (!response.ok) throw new Error('Erro ao buscar resposta');
            const result = await response.json();
            console.log(JSON.parse(result.response));

        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Converse com o Chucks..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
                    disabled={isLoading || !inputMessage.trim()}
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
}

export default ChatBot;
