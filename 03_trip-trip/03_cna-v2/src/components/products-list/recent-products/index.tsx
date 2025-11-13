'use client'

import styles from './styles.module.css'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'

export default function RecentProducts() {
  return (
    <div className={styles.widget}>
      <div className={styles.title}>최근 본 상품</div>
      <div className={styles.list}>
        <Image
          src={cheongsanImage}
          alt="최근 본 상품"
          width={72}
          height={72}
          className={styles.item}
        />
        <Image
          src={cheongsanImage}
          alt="최근 본 상품"
          width={72}
          height={72}
          className={styles.item}
        />
        <Image
          src={cheongsanImage}
          alt="최근 본 상품"
          width={72}
          height={72}
          className={styles.item}
        />
      </div>
    </div>
  )
}

