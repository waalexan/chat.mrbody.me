import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

import {
    Expand,
    ArrowDownToLine,
    ChevronLeft,
    Code,
    Airplay
} from "lucide-react"

// Component type definitions
interface MarkdownRendererProps {
    response: string;
}

// Custom type for ordered list to fix the 'type' attribute issue
type OlProps = Omit<React.HTMLProps<HTMLOListElement>, 'type'> & {
    type?: 'a' | 'i' | '1' | 'A' | 'I';
}

type CodeProps = {
    inline?: boolean;
} & React.HTMLProps<HTMLElement>;

// Component style mappings - each markdown element to its styled React component
const components = {
    // Headings
    h1: ({ ...props }: React.HTMLProps<HTMLHeadingElement>) =>
        <h1 className="text-2xl font-bold mt-6 mb-4 text-slate-800" {...props} />,
    h2: ({ ...props }: React.HTMLProps<HTMLHeadingElement>) =>
        <h2 className="text-xl font-bold mt-5 mb-3 text-slate-700" {...props} />,
    h3: ({ ...props }: React.HTMLProps<HTMLHeadingElement>) =>
        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-700" {...props} />,

    // Text elements
    p: ({ ...props }: React.HTMLProps<HTMLParagraphElement>) =>
        <div className="my-2 leading-7 text-[var(--foreground)]" {...props} />,
    a: ({ ...props }: React.HTMLProps<HTMLAnchorElement>) =>
        <a className="text-blue-600 hover:underline font-medium" {...props} />,

    // Lists
    ul: ({ ...props }: React.HTMLProps<HTMLUListElement>) =>
        <ul className="list-disc pl-5 my-4 text-slate-600" {...props} />,
    ol: ({ ...props }: OlProps) =>
        <ol className="list-decimal pl-5 my-4 text-slate-600" {...props} />,
    li: ({ ...props }: React.HTMLProps<HTMLLIElement>) =>
        <li className="mb-1" {...props} />,

    // Blockquotes
    blockquote: ({ ...props }: React.HTMLProps<HTMLQuoteElement>) =>
        <blockquote className="border-l-4 border-slate-300 pl-4 italic my-4 text-slate-500" {...props} />,

    // Code blocks
    code: ({ inline, className, children, ...props }: CodeProps) => {
        // If it's an HTML block, render with code/preview toggle
        if (className?.includes('language-html')) {
            return (
                <HtmlCodePreview code={children} />
            );
        }
        if (inline) {
            return <code className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-rose-600" {...props}>{children}</code>;
        }
        return (
            <div className="my-4 rounded-md overflow-hidden bg-slate-800">
                <code className={`block p-4 overflow-auto font-mono text-sm ${className}`} {...props}>
                    {children}
                </code>
            </div>
        );
    },
    pre: ({ ...props }: React.HTMLProps<HTMLPreElement>) =>
        <pre className="bg-transparent" {...props} />,

    // Tables
    table: ({ ...props }: React.HTMLProps<HTMLTableElement>) =>
        <div className="overflow-auto my-4">
            <table className="min-w-full divide-y divide-slate-200" {...props} />
        </div>,
    th: ({ ...props }: React.HTMLProps<HTMLTableHeaderCellElement>) =>
        <th className="px-3 py-2 bg-slate-100 text-left text-sm font-semibold text-slate-600" {...props} />,
    td: ({ ...props }: React.HTMLProps<HTMLTableDataCellElement>) =>
        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500 border-b border-slate-100" {...props} />,

    // Horizontal rule
    hr: ({ ...props }: React.HTMLProps<HTMLHRElement>) =>
        <hr className="my-6 border-t border-slate-200" {...props} />,
};


const HtmlCodePreview: React.FC<{ code: React.ReactNode }> = ({ code }) => {
    const [view, setView] = useState<'code' | 'preview'>('code');
    const [viewCode, setViewCode] = useState<boolean>(false);
    const codeRef = useRef<HTMLPreElement>(null);  // Referência para o <pre><code>

    // Função para pegar o código dentro do <pre><code> com o useRef
    const getCodeFromRef = () => {
        if (codeRef.current) {
            return codeRef.current.textContent || '';
        }
        return '';
    };

    useEffect(()=>{
        if(!codeRef.current)
        {
            setView('code')
            setViewCode(false)
        }
    },[code])

    const HeaderCode = () => {
        return (
            <>
                <div className="mb-2 flex justify-between">
                    <div className='flex'>
                        <button
                            onClick={() => { setViewCode(false); setView('code') }}
                            className={`px-4  mr-2 rounded flex items-center ${view === 'code' ? 'bg-blue-500 text-white' : 'bg-border'}`}
                        >
                            <ChevronLeft />
                            <span>hide</span>
                        </button>
                        {
                            view === 'code' ? (
                                <button className='flex' onClick={() => { setView('preview'); setViewCode(!true) }}>
                                    <Airplay />
                                    <span>preview</span>
                                </button>
                            ) : (
                                <button className='flex' onClick={() => { setViewCode(!viewCode); setView('code') }}>
                                    <Code />
                                    <span>code</span>
                                </button>
                            )
                        }
                    </div>
                    <div>
                        <button title='expand'>
                            <Expand />
                        </button>
                        <button title='download'>
                            <ArrowDownToLine />
                        </button>
                    </div>
                </div></>
        )
    }

    return (
        <div className="my-4">
            {view === 'code' ? (
                <>
                    {viewCode && <HeaderCode />}
                    <div className='flex justify-center'>
                        <pre ref={codeRef} className={`bg-border text-foreground p-4 rounded-md ${!viewCode && "hidden"}`}>
                            <code>{code}</code>
                        </pre>
                        <div>
                            {!viewCode && (
                                <button
                                    onClick={() => setView('preview')}
                                    className={`px-4 py-2 rounded bg-blue-500 text-white`}>
                                    WelwitschIA BI
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <HeaderCode />
                    <iframe
                        srcDoc={getCodeFromRef()}  // Passando o conteúdo diretamente para o iframe
                        title="HTML Preview"
                        className="w-full h-[25rem] border-2 rounded-md bg-white"
                        sandbox="allow-scripts allow-same-origin"  // Adicionando sandbox para maior segurança
                    />
                </>
            )}

        </div>
    );
};

// Main component
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ response }) => {
    return (
        <Markdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
        >
            {response}
        </Markdown>
    );
};
