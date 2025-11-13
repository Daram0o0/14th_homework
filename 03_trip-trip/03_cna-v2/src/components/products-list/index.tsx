import styles from './styles.module.css'
import Carousel from './carousel'
import ProductsListComponent from './list'
import RecentProducts from './recent-products'
import Image from 'next/image'
import productsBannerImage from '@assets/products_banner.png'

export default function ProductsList() {
  return (
    <div className={styles.container}>
      <RecentProducts />

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
