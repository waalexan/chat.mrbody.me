'use client';

import React from 'react';
import { GoogleLogin } from '@/service/google.auth';
import { Command, Eye, EyeOff, Key, Mail, User } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await GoogleLogin();
        } catch (error) {
            console.error('Google login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Simulação da lógica de autenticação
        try {
            // Substitua com sua lógica real de login
            const mockToken = 'walter'; // aqui você usaria o token real da resposta do login
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect') || 'myapp://chatbot';
    
            console.log({ email, password });
    
            // Redireciona com o token na URL
            window.location.href = `${redirect}?token=${mockToken}`;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Aqui você pode exibir uma mensagem de erro ao usuário
        }
    };
    

    return (
        <div className='h-screen w-full flex flex-col lg:flex-row bg-[var(--backgroundTwo)]'>
            {/* Lado esquerdo - Visível apenas em desktop */}
            <div className='hidden lg:flex lg:w-1/2 flex-col justify-between p-10 lg:p-20 bg-[var(--background)] border-r border-[var(--border-line)]'>
                <div className='flex items-center gap-3'>
                    <Command size={32} className='text-[var(--primary-color)]' />
                    <h1 className='text-xl font-semibold'>Acme Inc</h1>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <blockquote className='text-lg italic'>
                        "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
                    </blockquote>
                    <span className='font-medium'>Sofia Davis</span>
                    <span className='text-sm text-[var(--foreground-secondary)]'>CTO at Acme</span>
                </div>
            </div>

            {/* Lado direito - Formulário de Login */}
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-20'>
                <div className='w-full max-w-md'>
                    <div className='mb-8 text-center lg:text-left'>
                        <h1 className='text-2xl sm:text-3xl font-bold mb-2'>Bem-vindo de volta</h1>
                        <p className='text-sm text-[var(--foreground-secondary)]'>
                            Entre com seu email ou continue com o Google
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Campo de Email */}
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <User size={18} className='text-[#333]' />
                            </div>
                            <input
                                className='w-full pl-10 border border-[var(--border-line)] py-3 px-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-transparent'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='seuemail@example.com or numero'
                                required
                            />
                        </div>


                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <Key size={18} className='text-[#333]' />
                            </div>
                            <input
                                className='w-full pl-10 border border-[var(--border-line)] py-3 px-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-transparent'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Digite sua senha'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-1 flex items-center pr-3 text-[#333] hover:text-[var(--foreground)]'
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div>
                            <Link href={"/reset"}
                            className='text-sm text-[var(--primary-color)] justify-end hover:underline'
                            >
                                Esquece a minha palavra-passe
                            </Link>
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full p-3 rounded-md cursor-pointer bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--backgroundFour)] transition disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Entrando...' : 'Entrar com e-mail'}
                        </button>
                    </form>


                    <div className='mt-8 text-sm text-center text-[var(--foreground-secondary)]'>
                        <span>
                            Eu não tenho uma conta? <Link href={"/register"} className='text-[var(--primary-color)] hover:underline'>Sign up</Link>
                        </span>
                    </div>

                    <div className='flex items-center my-6'>
                        <div className='flex-grow border-t border-[var(--border-line)]'></div>
                        <span className='mx-4 text-sm text-[var(--foreground-secondary)]'>OU</span>
                        <div className='flex-grow border-t border-[var(--border-line)]'></div>
                    </div>


                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className='w-full flex items-center justify-center gap-3 border border-[var(--border-line)] px-4 py-3 rounded-md hover:bg-[var(--background)] transition disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <GoogleIcon />
                        <span>Continuar com Google</span>
                    </button>

                    <div className='mt-8 text-xs text-center text-[var(--foreground-secondary)]'>
                        <p>
                            Ao continuar, você concorda com nossos{' '}
                            <Link href="/terms" className='underline hover:text-[var(--primary-color)]'>Termos de Serviço</Link> e{' '}
                            <Link href="/privacy" className='underline hover:text-[var(--primary-color)]'>Política de Privacidade</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path
            d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.033s2.701-6.033 6.033-6.033c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.676-6.735-2.676-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z"
            fill="#4285F4"
        />
        <path
            d="M3.264 7.714l3.049 2.235c0.857-2.558 3.232-4.306 5.887-4.306 1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.676-6.735-2.676-4.107 0-7.686 2.322-9.436 5.708z"
            fill="#EA4335"
        />
        <path
            d="M12.545 22c2.582 0 4.93-1.012 6.704-2.676l-3.149-2.635c-0.905 0.6-2.055 0.944-3.355 0.944-2.798 0-5.142-1.657-5.853-3.972h-5.987v3.091c1.75 3.386 5.329 5.708 9.436 5.708z"
            fill="#34A853"
        />
        <path
            d="M19.249 16.068c0.182-0.545 0.286-1.129 0.286-1.745 0-0.616-0.104-1.2-0.286-1.745l0.001-0.002 3.149-2.635v6.768l-3.149-2.635z"
            fill="#FBBC05"
        />
    </svg>
);

export default LoginPage;