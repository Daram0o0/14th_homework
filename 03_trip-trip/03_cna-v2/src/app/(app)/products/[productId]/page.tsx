'use client'

import ProductsDetail from 'components/products-detail'
import { ProductsListProvider } from 'components/products-list/context/products-list.context'

export default function ProductDetailPage() {
  return (
    <ProductsListProvider>
      <ProductsDetail />
    </ProductsListProvider>
  )
}
