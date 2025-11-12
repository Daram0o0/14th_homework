import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { getProductDetailPath } from 'commons/constants/url'

export default function useLinkRouting() {
  const router = useRouter()

  const onClickProduct = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.preventDefault()
    router.push(getProductDetailPath(id))
  }

  return {
    onClickProduct,
  }
}
