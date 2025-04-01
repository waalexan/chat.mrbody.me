// Função para converter string para JSON
export default function convertStringToJSON(jsonString: string): { success: boolean; data: any; message: string } {
    try {
        if (typeof jsonString !== 'string') {
            throw new Error('Input must be a valid string');
        }

        const cleanString = jsonString.trim();

        const jsonData = JSON.parse(cleanString);

        // Valida se o JSON é do tipo esperado
        if (typeof jsonData !== 'string') {
            throw new Error('A resposta não está no formato esperado');
        }

        return {
            success: true,
            data: jsonData,
            message: 'Sucesso ao converter a string para JSON',
        };
    } catch (error: unknown) {
        return {
            success: false,
            data: null,
            message: `Erro ao converter a string para JSON: ${(error as Error).message}`,
        };
    }
}