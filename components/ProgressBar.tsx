'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    // Espera um pouco antes de dar o done (simula o tempo de carregamento)
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 300) // pode ajustar esse delay se quiser

    return () => {
      clearTimeout(timeout)
      NProgress.done()
    }
  }, [pathname])

  return null
}
