// 'use client'
import './globals.css'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import ApiProvider from 'commons/settings/apollo-setting'
// import Layout from 'commons/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trip Trip',
  description: 'Trip Trip',
  icons: {
    icon: '/assets/triptrip.svg',
  },
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${inter.className}`}>
        <ApiProvider>{children}</ApiProvider>
      </body>
    </html>
  )
}
