'use client'
import { useState } from 'react'
import styles from './styles.module.css'
import ProductsDetailComponent from './detail'
import QnAComponent from './qna'

export default function ProductsDetail() {
  const [activeTab, setActiveTab] = useState<'detail' | 'qna'>('detail')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {activeTab === 'detail' ? (
          <ProductsDetailComponent onTabChange={setActiveTab} />
        ) : (
          <QnAComponent onTabChange={setActiveTab} />
        )}
      </div>
      <div className={styles.gap}></div>
    </div>
  )
}
