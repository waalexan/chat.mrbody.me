'use client';
import React, { useState } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

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

    // Adiciona mensagem do usuário e indicador de digitação
    setMessages(prev => [
      ...prev,
      { text: userMessage, isBot: false },
      { text: '▌', isBot: true },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.body) throw new Error('Sem corpo de resposta');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        botResponse += chunk;

        // Atualiza resposta em tempo real
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.isBot) {
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              text: botResponse + '▌',
            };
          }
          return newMessages;
        });
      }

      // Remove indicador de digitação
      setMessages(prev => prev.map((msg, index) => 
        index === prev.length - 1 ? { ...msg, text: botResponse } : msg
      ));

    } catch (error) {
      console.error('Erro:', error);
      setMessages(prev => prev.map((msg, index) => 
        index === prev.length - 1 ? { ...msg, text: '❌ Erro ao processar' } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-lg ${
              message.isBot
                ? 'bg-blue-50 ml-auto border border-blue-100'
                : 'bg-gray-50 mr-auto border border-gray-100'
            }`}
            style={{ maxWidth: '90%' }}
          >
            <div className={`text-sm ${message.isBot ? 'text-blue-600' : 'text-gray-600'}`}>
              {message.isBot ? (
                <div className="prose" dangerouslySetInnerHTML={{ 
                  __html: message.text.replace(/\n/g, '<br/>') 
                }} />
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>

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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:bg-gray-400 transition-colors duration-200"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default ChatBot;