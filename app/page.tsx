'use client'; // Se estiver usando app router

import { useEffect, useState } from 'react';
import LeandPage from "./_leandpage/leandpage";
import Dashboard from "./charts/page";

export default function Main() {
    const [tokenData, setTokenData] = useState<{ status: number, token: string | null } | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('/api/local', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include'
                });

                const data = await response.json();
                setTokenData(data);
            } catch (error) {
                console.error(error);
                setTokenData({ status: 500, token: null });
            }
        };

        fetchToken();
    }, []);

    if (!tokenData) return <div>Carregando...</div>;

    if (tokenData.token && tokenData.status === 200)
        return <Dashboard />;
    else
        return <LeandPage />;
}
