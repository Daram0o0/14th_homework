/**
 * URL 경로 관리
 * 모든 URL 경로를 중앙에서 관리하며, 다이나믹 라우팅과 메타데이터를 제공합니다.
 */

// 접근 가능 상태 타입
export type AccessStatus = 'public' | 'member-only'

// 노출 가능 목록 타입
export interface VisibilityConfig {
  header: boolean
  banner: boolean
  image: boolean
}

// URL 경로 메타데이터 타입
export interface RouteMetadata {
  path: string
  accessStatus: AccessStatus
  visibility: VisibilityConfig
}

// 경로별 메타데이터 정의
export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  boards: {
    path: '/boards',
    accessStatus: 'public',
    visibility: {
      header: true,
      banner: true,
      image: false,
    },
  },
  boardDetail: {
    path: '/boards/[id]',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: true,
      image: false,
    },
  },
  boardNew: {
    path: '/boards/new',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
  boardEdit: {
    path: '/boards/[id]/edit',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
  products: {
    path: '/products',
    accessStatus: 'public',
    visibility: {
      header: true,
      banner: true,
      image: false,
    },
  },
  productDetail: {
    path: '/products/[id]',
    accessStatus: 'public',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
  productNew: {
    path: '/products/new',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
  productEdit: {
    path: '/products/[id]/edit',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
  mypage: {
    path: '/mypage',
    accessStatus: 'member-only',
    visibility: {
      header: true,
      banner: false,
      image: false,
    },
  },
} as const

/**
 * 보드 목록 경로
 */
export const BOARDS_PATH = ROUTE_METADATA.boards.path

/**
 * 보드 상세 경로 생성
 * @param id - 보드 ID
 * @returns 보드 상세 경로
 */
export function getBoardDetailPath(id: string | number): string {
  return `/boards/${id}`
}

/**
 * 보드 생성 경로
 */
export const BOARD_NEW_PATH = ROUTE_METADATA.boardNew.path

/**
 * 보드 수정 경로 생성
 * @param id - 보드 ID
 * @returns 보드 수정 경로
 */
export function getBoardEditPath(id: string | number): string {
  return `/boards/${id}/edit`
}

/**
 * 상품 목록 경로
 */
export const PRODUCTS_PATH = ROUTE_METADATA.products.path

/**
 * 상품 상세 경로 생성
 * @param id - 상품 ID
 * @returns 상품 상세 경로
 */
export function getProductDetailPath(id: string | number): string {
  return `/products/${id}`
}

/**
 * 상품 등록 경로
 */
export const PRODUCT_NEW_PATH = ROUTE_METADATA.productNew.path

/**
 * 상품 수정 경로 생성
 * @param id - 상품 ID
 * @returns 상품 수정 경로
 */
export function getProductEditPath(id: string | number): string {
  return `/products/${id}/edit`
}

/**
 * 마이페이지 경로
 */
export const MYPAGE_PATH = ROUTE_METADATA.mypage.path

/**
 * 경로의 메타데이터 조회
 * @param path - 조회할 경로
 * @returns 경로 메타데이터 또는 undefined
 */
export function getRouteMetadata(path: string): RouteMetadata | undefined {
  // 정확한 경로 매칭
  const exactMatch = Object.values(ROUTE_METADATA).find((meta) => meta.path === path)
  if (exactMatch) {
    return exactMatch
  }

  // 다이나믹 라우팅 패턴 매칭
  for (const [, metadata] of Object.entries(ROUTE_METADATA)) {
    const pattern = metadata.path.replace(/\[id\]/g, '[^/]+')
    const regex = new RegExp(`^${pattern}$`)
    if (regex.test(path)) {
      return metadata
    }
  }

  return undefined
}

/**
 * 경로가 회원 전용인지 확인
 * @param path - 확인할 경로
 * @returns 회원 전용 여부
 */
export function isMemberOnlyRoute(path: string): boolean {
  const metadata = getRouteMetadata(path)
  return metadata?.accessStatus === 'member-only'
}

/**
 * 경로에서 헤더 노출 여부 확인
 * @param path - 확인할 경로
 * @returns 헤더 노출 여부
 */
export function shouldShowHeader(path: string): boolean {
  const metadata = getRouteMetadata(path)
  return metadata?.visibility.header ?? true
}

/**
 * 경로에서 배너 노출 여부 확인
 * @param path - 확인할 경로
 * @returns 배너 노출 여부
 */
export function shouldShowBanner(path: string): boolean {
  const metadata = getRouteMetadata(path)
  return metadata?.visibility.banner ?? false
}

/**
 * 경로에서 이미지 노출 여부 확인
 * @param path - 확인할 경로
 * @returns 이미지 노출 여부
 */
export function shouldShowImage(path: string): boolean {
  const metadata = getRouteMetadata(path)
  return metadata?.visibility.image ?? false
}
