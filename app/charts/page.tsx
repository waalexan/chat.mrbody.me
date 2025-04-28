'use client'
import { SideBar } from "@/components/Sidebar";
import HomeSide from "@/components/sidebar/home";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useToken } from "@/config/setting";
import { useRouter } from "next/navigation";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

interface DashboardData {
  totalQuestionnaires: number;
  malariaCases: number;
  malariaPercentage: string;
  topSymptoms: { symptom: string; count: number }[];
  locationDistribution: { location: string; count: number; percentage: string }[];
  usesNet: { count: number; percentage: string };
  lastTrip: { count: number; percentage: string };
  malariaByLocation: { location: string; malariaCases: number; percentage: string }[];
}

export default function Dashboard() {
    const { id, name, email, phone } = useToken();
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulated response (replace with actual API call)
                const response = {
                    totalQuestionnaires: 4,
                    malariaCases: 2,
                    malariaPercentage: "50.00%",
                    topSymptoms: [
                        { symptom: "febre", count: 3 },
                        { symptom: "calafrios", count: 1 },
                        { symptom: "dor de cabeça", count: 1 },
                        { symptom: "fadiga", count: 1 },
                        { symptom: "dor muscular", count: 1 }
                    ],
                    locationDistribution: [
                        { location: "São Paulo", count: 2, percentage: "50.00" },
                        { location: "Rio de Janeiro", count: 1, percentage: "25.00" },
                        { location: "Manaus", count: 1, percentage: "25.00" }
                    ],
                    usesNet: { count: 2, percentage: "50.00%" },
                    lastTrip: { count: 2, percentage: "50.00%" },
                    malariaByLocation: [
                        { location: "São Paulo", malariaCases: 2, percentage: "100.00" }
                    ]
                };

                // Simulate a delay
                setTimeout(() => {
                    setData(response);
                    setLoading(false);
                }, 1000);  // Simulate an API delay

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Prepare chart data
    const chartData = data?.locationDistribution.map(location => ({
        name: location.location,
        questionnaires: location.count,
        malariaCases: data.malariaByLocation.find(m => m.location === location.location)?.malariaCases || 0
    })) || [];

    const chartConfig = {
        questionnaires: {
            label: "Questionários",
            color: "#2563eb",
        },
        malariaCases: {
            label: "Casos de Malária",
            color: "#dc2626",
        },
    } satisfies ChartConfig;

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!data) {
        return <div>Erro ao carregar dados</div>;
    }

    return (
        <div className="flex flex-row h-screen">
            <nav className="flex-shrink-0 bg-[var(--backgroundTwo)]">
                <SideBar className="h-full" page="/live" />
            </nav>

            <main className="flex-1 h-full">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                    {/* Left panel (HomeSide) */}
                    <ResizablePanel defaultSize={20} maxSize={20} minSize={10} className="bg-[var(--backgroundTwo)] contain-content border-r-[1px] border-r-[var(--border-line)]">
                        <HomeSide subpage="/u/home" />
                    </ResizablePanel>

                    <ResizableHandle />

                    {/* Main content panel */}
                    <ResizablePanel defaultSize={80} className="flex flex-col">
                        <div className="bg-[var(--backgroundFour)] h-[30%] relative contain-content border-b-2 border-b-[var(--border-line)]">
                            <div className="p-[60px]">
                                <h1 className="font-bold text-[60pt]">Live</h1>
                                <button
                                    className="hover:cursor-pointer hover:text-red-500"
                                    onClick={() => window.open("https://webrtc-app-9teq.onrender.com/", "_blank")}>
                                    Conferencia entre campos
                                </button>
                            </div>
                        </div>

                        <div className="p-20 space-y-6">
                            {/* Key statistics */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className=" p-4 rounded-lg shadow">
                                    <h3 className="font-semibold">Total de Questionários</h3>
                                    <p className="text-2xl">{data.totalQuestionnaires}</p>
                                </div>
                                <div className=" p-4 rounded-lg shadow">
                                    <h3 className="font-semibold">Casos de Malária</h3>
                                    <p className="text-2xl">{data.malariaCases} ({data.malariaPercentage})</p>
                                </div>
                                <div className=" p-4 rounded-lg shadow">
                                    <h3 className="font-semibold">Uso de Mosquiteiro</h3>
                                    <p className="text-2xl">{data.usesNet.count} ({data.usesNet.percentage})</p>
                                </div>
                            </div>

                            {/* Location distribution chart */}
                            <div className=" p-4 rounded-lg shadow">
                                <h2 className="text-xl font-bold mb-4">Distribuição por Localização</h2>
                                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="questionnaires" fill="#2563eb" name="Questionários" />
                                        <Bar dataKey="malariaCases" fill="#dc2626" name="Casos de Malária" />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            {/* Most common symptoms */}
                            <div className=" p-4 rounded-lg shadow">
                                <h2 className="text-xl font-bold mb-4">Sintomas Mais Comuns</h2>
                                <ul className="space-y-2">
                                    {data.topSymptoms.map((symptom, index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{symptom.symptom}</span>
                                            <span>{symptom.count} ocorrências</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h1>sfhhskfksjk</h1>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </div>
    );
}
