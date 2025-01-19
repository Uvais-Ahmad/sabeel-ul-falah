import type { Metadata } from 'next'
import { Inter, Gulzar } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

const inter = Inter({ subsets: ['latin'] })
const gulzar = Gulzar({ weight: '400', subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Sabeel-Ul-Falah - Islamic Madrasa',
  description: 'Sabeel-Ul-Falah - An Islamic madrasa where knowledge and practice illuminate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${gulzar.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

