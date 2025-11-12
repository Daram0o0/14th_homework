import styles from './styles.module.css'
import Carousel from './carousel'
import ProductsListComponent from './list'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import productsBannerImage from '@assets/products_banner.png'

export default function ProductsList() {
  return (
    <div className={styles.container}>
      {/* 최근 본 상품 위젯 */}
      <div className={styles.recentProductsWidget}>
        <div className={styles.recentProductsTitle}>최근 본 상품</div>
        <div className={styles.recentProductsList}>
          <Image
            src={cheongsanImage}
            alt="최근 본 상품"
            width={72}
            height={72}
            className={styles.recentProductItem}
          />
          <Image
            src={cheongsanImage}
            alt="최근 본 상품"
            width={72}
            height={72}
            className={styles.recentProductItem}
          />
          <Image
            src={cheongsanImage}
            alt="최근 본 상품"
            width={72}
            height={72}
            className={styles.recentProductItem}
          />
        </div>
      </div>

      <Carousel />
      <div className={styles.gap}></div>
      <div className={styles.banner}>
        <Image
          src={productsBannerImage}
          alt="배너"
          width={1280}
          height={240}
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.gap}></div>
      <ProductsListComponent />
      <div className={styles.gapSmall}></div>
    </div>
  )
}
