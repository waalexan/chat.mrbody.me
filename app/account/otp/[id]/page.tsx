'use client';

import React, { Suspense } from 'react';
import { use } from 'react';
import { Command } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { endpoint } from '@/config/microservice';
import { toast } from 'sonner';


const LoginPage = (promiseParams: { params: Promise<{ id: string }> }) => {
    const [code, setCode] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const searchParams = useSearchParams();

    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    const verified = searchParams.get('verified');

    const { id } = use(promiseParams.params);
    const router = useRouter();


    const handleResendOTP = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`${endpoint.api_login}/auth/resend/otp?id=${id}&method=email`, {
                method: 'GET',
            });

            const data = await response.json();

            if (response.status === 201 || response.status === 202) {
                setError(data.message);
            } else if (response.status === 200) {
                toast("Código reenviado com sucesso!", {
                    description: "vefique seu email",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                    },
                })
            } else {
                toast("Erro desconhecido", {
                    description: "Erro desconhecido",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        } catch (error: any) {
            setError('Erro interno no servidor');
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${endpoint.api_login}/auth/verify/otp?id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            // const data = await response.json();

            if (response.status === 201) {
                setError('Usuário não encontrado');
                toast("Erro", {
                    description: "Usuário não encontrado"
                })

            } else if (response.status === 202) {
                setError('Usuário já verificado');
                router.push('/')
            } else if (response.status === 203) {
                setError('Código OTP inválido');
                toast("Código OTP inválido", {
                    description: `Verifique seu Email ${email}`
                })
            } else if (response.status === 204) {
                setError('OTP expirado');
                toast("OTP expirado", {
                    description: "Clique em Reenviar codigo para reenviar o OTP",
                    action: {
                        label: "reenviar o OTP",
                        onClick: () => handleResendOTP(),
                    },
                })
            } else if (response.status === 200) {
                router.push('/login')
            } else {
                setError('Erro desconhecido');
                toast("Erro", {
                    description: "Erro desconhecido",
                    action: {
                        label: "Atualizar",
                        onClick: () => router.refresh(),
                    },
                })
            }
        } catch (error: any) {
            setError('Erro ao validar');
            toast("Erro no servidor", {
                description: "Por favor, tente novamente mais tarde.",
                action: {
                    label: "Atualizar",
                    onClick: () => router.refresh(),
                },
            });
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className='h-screen w-full flex flex-col lg:flex-row bg-[var(--backgroundTwo)]'>
                {/* Lado esquerdo - Visível apenas em desktop */}
                <div className='hidden lg:flex lg:w-1/2 flex-col justify-between p-10 lg:p-20 bg-[var(--background)] border-r border-[var(--border-line)]'>
                    <div className='flex items-center gap-3'>
                        <Command size={32} className='text-[var(--primary-color)]' />
                        <h1 className='text-xl font-semibold'>MapaZZZ</h1>
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
                            <h1 className='text-2xl sm:text-3xl font-bold mb-2'>OTP</h1>
                            <p className='text-sm text-[var(--foreground-secondary)]'>
                                If you have an account, we have sent a code to <span className='font-bold'>{email || phone}</span>
                                <span>{', '}(O codigo expira em <span className='font-bold'>5 mintus</span> )</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            {/* Campo de Email */}
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none'>
                                    M -
                                </div>
                                <input
                                    className='w-full pl-20 border border-[var(--border-line)] py-3 px-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-transparent'
                                    type='text'
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder='x x x x x x'
                                    required
                                />
                            </div>


                            <div className='flex flex-row justify-between items-center'>
                                <button
                                    onClick={handleResendOTP}
                                    type='button'
                                    className='text-sm text-[var(--primary-color)] justify-end hover:underline'
                                >
                                    Reenviar codigo
                                </button>

                                <span>
                                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                                </span>
                            </div>

                            <button
                                type='submit'
                                disabled={isLoading}
                                className='w-full p-3 rounded-md cursor-pointer bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--backgroundFour)] transition disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Verificar
                            </button>
                        </form>


                        <div className='mt-8 text-xs text-center text-[var(--foreground-secondary)]'>
                            <p>
                                Ao continuar, você concorda com nossos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};


export default LoginPage;