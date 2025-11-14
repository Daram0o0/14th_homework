'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface ProductsListContextValue {
  activeTab: 'available' | 'closed'
  searchKeyword: string
  currentPage: number
  pickedProductIds: Set<string>
  pickedCountSum: number
  setActiveTab: Dispatch<SetStateAction<'available' | 'closed'>>
  setSearchKeyword: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setPickedProductIds: Dispatch<SetStateAction<Set<string>>>
  setPickedCountSum: Dispatch<SetStateAction<number>>
  togglePickedProduct: (productId: string, isPicked: boolean) => void
}

const ProductsListContext = createContext<ProductsListContextValue | undefined>(undefined)

export function ProductsListProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pickedProductIds, setPickedProductIds] = useState<Set<string>>(new Set())
  const [pickedCountSum, setPickedCountSum] = useState<number>(0)

  const togglePickedProduct = (productId: string, isPicked: boolean) => {
    setPickedProductIds((prev) => {
      const newSet = new Set(prev)
      if (isPicked) {
        newSet.add(productId)
      } else {
        newSet.delete(productId)
      }
      return newSet
    })
  }

  return (
    <ProductsListContext.Provider
      value={{
        activeTab,
        searchKeyword,
        currentPage,
        pickedProductIds,
        pickedCountSum,
        setActiveTab,
        setSearchKeyword,
        setCurrentPage,
        setPickedProductIds,
        setPickedCountSum,
        togglePickedProduct,
      }}
    >
      {children}
    </ProductsListContext.Provider>
  )
}

export function useProductsListContext() {
  const context = useContext(ProductsListContext)
  if (context === undefined) {
    throw new Error('useProductsListContext must be used within a ProductsListProvider')
  }
  return context
}
