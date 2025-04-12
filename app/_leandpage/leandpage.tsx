import Link from "next/link";
import { Map, Shield, Clock, AlertTriangle, Globe, Smartphone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="landing-page font-mono">
            {/* Hero Section */}
            <div className="h-screen min-h-[600px] flex items-center contain-content relative overflow-hidden">
                <header className="absolute px-4 sm:px-6 lg:px-8 z-30 top-0 w-full flex items-center justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-20">
                        <div className="flex items-center gap-2">
                            <Map className="text-primary" size={24}/>
                            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">MapaZZZ</h1>
                        </div>
                        <div className="hidden md:flex gap-4 lg:gap-6 xl:gap-9">
                            <Link href={""} className="hover:text-primary transition-colors">Documentação</Link>
                            <Link href={""} className="hover:text-primary transition-colors">Serviços</Link>
                            <Link href={""} className="hover:text-primary transition-colors">Mapeamento</Link>
                            <Link href={""} className="hover:text-primary transition-colors">Produtos</Link>
                        </div>
                    </div>
                    <div className="flex gap-3 sm:gap-4 lg:gap-6 items-center">
                        <Link href={"/login"} className="hover:text-primary transition-colors text-sm sm:text-base">Log in</Link>
                        <Link href={"/register"}
                            className="bg-white text-black py-1 px-3 sm:py-2 sm:px-5 rounded-full font-bold hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
                        >
                            Criar conta
                        </Link>
                    </div>
                </header>
                
                <video autoPlay muted loop className="absolute w-full h-full object-cover">
                    <source src="/YouTube - YouTube (720p, h264).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                <div className="absolute w-full h-full bg-[#000000d8]" />
                <div className="absolute z-20 w-full h-full bottom-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)/80%] to-transparent" />
                
                <div className="absolute z-30 px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row justify-center lg:justify-around items-center gap-8 lg:gap-0 pt-16 pb-8 lg:py-0">
                    <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl px-4 sm:px-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2]">
                            Junte-se a nós, Proteja-se e Salve Vidas
                        </h1>
                        <span className="text-base sm:text-lg max-w-[90%] leading-[1.5]">
                            Com o MapaZZZ veja as áreas mais afetadas e tome decisões mais seguras. Dados atualizados em tempo real com inteligência artificial.
                        </span>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <Link href={"/register"}
                                className="bg-white text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full font-bold hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
                            >
                                Crie já sua conta
                            </Link>
                            <span className="max-w-[200px] text-xs sm:text-sm flex items-center gap-2">
                                <Shield size={14}  /> Proteja-se e Salve Vidas
                            </span>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block">
                        <Link href={"/about"}
                            className="relative -bottom-7 text-white py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-full font-bold hover:bg-white/25 active:bg-white active:text-black transition-all duration-200 ease-in-out cursor-pointer shadow-md hover:shadow-lg active:shadow-inner text-sm sm:text-base"
                        >
                            Porque Macrofacoos
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 flex items-center justify-center gap-2 sm:gap-3">
                    <Shield size={24}  /> Por que escolher o MapaZZZ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {[
                        { 
                            title: 'Atualizações em Tempo Real', 
                            icon: <Clock size={40}  className="mx-auto mb-3 sm:mb-4 text-primary" />,
                            description: 'Nossos dados são atualizados constantemente para fornecer informações precisas quando você mais precisa.'
                        },
                        { 
                            title: 'Inteligência Artificial', 
                            icon: <AlertTriangle size={40}  className="mx-auto mb-3 sm:mb-4 text-primary" />,
                            description: 'Algoritmos avançados preveem riscos e sugerem rotas seguras baseadas em dados históricos e em tempo real.'
                        },
                        { 
                            title: 'Cobertura Nacional', 
                            icon: <Globe size={40}  className="mx-auto mb-3 sm:mb-4 text-primary" />,
                            description: 'Monitoramento completo de todas as regiões do país com relatórios detalhados por área.'
                        }
                    ].map((feature) => (
                        <div key={feature.title} className="p-6 sm:p-8 rounded-lg hover:bg-gray-700 transition-colors">
                            {feature.icon}
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Como Funciona</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                                <span className="text-xl sm:text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Cadastre-se</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Crie sua conta gratuitamente em menos de 2 minutos.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                                <span className="text-xl sm:text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Explore o Mapa</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Visualize áreas de risco e rotas seguras em tempo real.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                                <span className="text-xl sm:text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Receba Alertas</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Ative notificações para ser avisado sobre perigos próximos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">O que dizem nossos usuários</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg">
                            <p className="text-base sm:text-lg italic mb-3 sm:mb-4">"O MapaZZZ salvou minha família durante a última enchente. Recebemos o alerta com tempo suficiente para evacuar."</p>
                            <div className="flex items-center">
                                <div className="bg-gray-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4"></div>
                                <div>
                                    <h4 className="font-bold text-sm sm:text-base">Carlos Silva</h4>
                                    <p className="text-gray-400 text-xs sm:text-sm">São Paulo</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg">
                            <p className="text-base sm:text-lg italic mb-3 sm:mb-4">"Como motorista de caminhão, o MapaZZZ me ajuda a planejar rotas mais seguras e evitar áreas perigosas."</p>
                            <div className="flex items-center">
                                <div className="bg-gray-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4"></div>
                                <div>
                                    <h4 className="font-bold text-sm sm:text-base">Ana Oliveira</h4>
                                    <p className="text-gray-400 text-xs sm:text-sm">Rio de Janeiro</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App CTA */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
                    <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Baixe nosso app</h2>
                        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">Leve o MapaZZZ com você para onde for e receba alertas em tempo real.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                                <Smartphone size={16}  />
                                App Store
                            </button>
                            <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                                <Smartphone size={16}  />
                                Google Play
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="bg-gray-800 rounded-xl w-48 h-72 sm:w-56 sm:h-80 lg:w-64 lg:h-96 flex items-center justify-center">
                            <Smartphone size={48}   className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <Map size={20}   className="text-primary" />
                            <h3 className="font-bold text-xl sm:text-2xl">MapaZZZ</h3>
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base">Protegendo vidas através da tecnologia e informação em tempo real.</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Links Rápidos</h4>
                        <ul className="space-y-1 sm:space-y-2">
                            <li><Link href={""} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Início</Link></li>
                            <li><Link href={""} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Sobre Nós</Link></li>
                            <li><Link href={""} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Serviços</Link></li>
                            <li><Link href={""} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contato</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contato</h4>
                        <ul className="space-y-1 sm:space-y-2 text-gray-400">
                            <li className="flex items-center gap-2 text-sm sm:text-base">
                                <Mail size={14}  />
                                info@mapazzz.tech
                            </li>
                            <li className="flex items-center gap-2 text-sm sm:text-base">
                                {/* <Smartphone size={14}  /> */}
                                (+244) 930-626-436
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Redes Sociais</h4>
                        <div className="flex gap-3 sm:gap-4">
                            {/* <Link href={""} className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Facebook size={16} sm:size={20} />
                            </Link>
                            <Link href={""} className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Twitter size={16} sm:size={20} />
                            </Link>
                            <Link href={""} className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Instagram size={16} sm:size={20} />
                            </Link> */}
                        </div>
                        <div className="mt-6 sm:mt-8">
                            <Link href={"/register"}
                                className="bg-primary text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-bold inline-block hover:bg-primary/80 transition-colors text-sm sm:text-base"
                            >
                                Comece Agora
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-6xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-xs sm:text-sm">
                    <p>© {new Date().getFullYear()} MapaZZZ. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}