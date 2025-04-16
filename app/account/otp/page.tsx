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
                        <h1 className='text-2xl sm:text-3xl font-bold mb-2'>OTP</h1>
                        <p className='text-sm text-[var(--foreground-secondary)]'>
                            If you have an account, we have sent a code to <span className='font-bold'>{"walteralexandresantana6@gmail.com"}</span>
                            <span>{', '}(O codigo expira <span className='font-bold'>5 mintus</span> )</span>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='x x x x x x'
                                required
                            />
                        </div>


                        <div>
                            <Link href={"/reset"}
                            className='text-sm text-[var(--primary-color)] justify-end hover:underline'
                            >
                                Reenviar codigo
                            </Link>
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
    );
};


export default LoginPage;