'use client'
import { usePathname } from 'next/navigation'
import BannerComponent from './banner'
import Navigation from './navigation'
import styles from './styles.module.css'

const HIDDEN_HEADERS = ['new', 'edit']

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActiveHeader = HIDDEN_HEADERS.some((val) => pathname.includes(val))

  return (
    <div className={styles.layout}>
      <Navigation />
      {!isActiveHeader && <BannerComponent />}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
