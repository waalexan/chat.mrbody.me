import { BrainCog, CircleHelp, CircleUser, Globe, Home, Key, Layers, Library, Lightbulb, ListVideo, Map, MapPin, Pin, Rocket, Settings, Users } from "lucide-react";

export const sideData = [
    {
        icon: Home,
        label: "Home",
        route: "/"
    },
    {
        icon: Layers,
        label: "Estatistica",
        route: "/estatistica"
    },
    {
        icon: BrainCog,
        label: "GenesesIA",
        route: "/genesis"
    },
    {
        icon: Map,
        label: "Mapa",
        route: "/map"
    },
    {
        icon: ListVideo,
        label: "live",
        route: "/live"
    },
    {
        icon: Settings,
        label: "Definições",
        route: "/setting"
    }
];


export const HomeRoute = [
    {
        icon: Globe,
        label: "geral",
        route: "/u/home",
    },
    {
        icon: Users,
        label: "Funcionarios",
        route: "/u/employee",
    },
    {
        icon: Pin,
        label: "Anexos",
        route: "/u/files",
    },
    {
        icon: Lightbulb,
        label: "Dicas",
        route: "/setting/feeds",
    },
    {
        icon: CircleHelp,
        label: "Ajuda",
        route: "/setting/help",
    }
]
