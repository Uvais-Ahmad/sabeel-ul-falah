import type { Metadata } from 'next'
import { Inter, Gulzar } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

const inter = Inter({ subsets: ['latin'] })
const gulzar = Gulzar({ weight: '400', subsets: ['arabic'] })

export const metadata: Metadata = {
  title: "Sabeel ul Falah - Best Madarsa in Muzaffarnagar | Islamic Education",
  description: "Sabeel ul Falah, led by Mufti Salim, is a top Islamic Madarsa in Muzaffarnagar, located in Madina Colony on Roorkee Road. Providing quality Quran learning and Islamic education in Uttar Pradesh.",
  keywords: "Sabeel ul Falah, Sabeelulfalah, Mufti Salim, Madarsa in Muzaffarnagar, Islamic education, Quran learning, Roorkee Road Madarsa, Madina Colony Madarsa, Madarsa near me, Best Madarsa in UP",
  openGraph: {
    title: "Sabeel ul Falah - Best Islamic Madarsa in Muzaffarnagar",
    description: "Join Sabeel ul Falah, a leading Islamic Madarsa in Muzaffarnagar, offering Quran memorization and religious education under Mufti Salim. Located in Madina Colony, Roorkee Road, Uttar Pradesh.",
    url: "https://sabeelulfalah.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://sabeelulfalah.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sabeel ul Falah - Madarsa in Muzaffarnagar",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourTwitterHandle",
  //   title: "Sabeel ul Falah - Best Islamic Madarsa in Muzaffarnagar",
  //   description: "Looking for an Islamic Madarsa in Muzaffarnagar? Sabeel ul Falah offers top-quality Quran and Islamic education in Madina Colony, Roorkee Road, UP.",
  //   images: ["https://sabeelulfalah.com/og-image.jpg"],
  // },
};


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

