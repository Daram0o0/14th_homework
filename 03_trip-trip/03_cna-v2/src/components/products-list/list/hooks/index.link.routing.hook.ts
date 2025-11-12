import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { getProductDetailPath, PRODUCT_NEW_PATH } from 'commons/constants/url'

export default function useLinkRouting() {
  const router = useRouter()

  const onClickProduct = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.preventDefault()
    router.push(getProductDetailPath(id))
  }

  const onClickNewProduct = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push(PRODUCT_NEW_PATH)
  }

  return {
    onClickProduct,
    onClickNewProduct,
  }
}

