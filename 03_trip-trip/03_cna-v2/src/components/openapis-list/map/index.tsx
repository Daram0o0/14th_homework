'use client'
import { CustomOverlayMap, Map, Polygon, useKakaoLoader } from 'react-kakao-maps-sdk'
import geo from 'commons/map/SIDO_MAP_2022.json'
import { useState } from 'react'
import { geomToPolygons, getWeatherIconUrl, useWeather } from './hook'
import { GeoFeatureCollection } from './types'
import styles from './styles.module.css'
import Image from 'next/image'

const COLORS = [
  '#7F5A83',
  '#2E9CCA',
  '#D90429',
  '#5A3921',
  '#89ABE3',
  '#aa9030',
  '#A3628B',
  '#6A0572',
  '#F95700',
  '#1e7d74',
  '#3A89C9',
  '#194440',
  '#D00000',
  '#FF61A6',
  '#5C2751',
  '#00798C',
  '#5ce433',
  '#FFD523',
  '#7B2C3F',
  '#ADBDFF',
]

const MAP_CENTER = { lat: 35.9, lng: 127.5 }

export default function MapComponent() {
  useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY!, libraries: [] })

  const [hoverId, setHoverId] = useState<string | null>(null)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const { data: weatherData, isLoading, error } = useWeather(hoveredCity)

  return (
    <Map center={MAP_CENTER} level={13} className={styles.mapLayout}>
      {(geo as GeoFeatureCollection).features.map((f, idx: number) => {
        const id = f.properties.CTPRVN_CD
        const en_name = f.properties.CTP_ENG_NM
        const k_name = f.properties.CTP_KOR_NM
        const polys = geomToPolygons(f.geometry)
        const color = COLORS[idx % COLORS.length]
        const hovered = hoverId === id

        const position =
          polys.length > 0 && polys[0].length > 0 ? polys[0][0][0] : { lat: 0, lng: 0 }
        return (
          <div key={id}>
            {polys.map((ring, pIdx: number) => {
              return (
                <>
                  <Polygon
                    key={`${id}-${pIdx}`}
                    path={ring}
                    strokeWeight={2}
                    strokeColor={color}
                    strokeOpacity={0.9}
                    fillColor={hovered ? color : '#ffffff'}
                    fillOpacity={hovered ? 0.55 : 0.35}
                    onMouseover={() => {
                      setHoverId(id)
                      setHoveredCity(en_name)
                    }}
                    onMouseout={() => {
                      setHoverId((cur) => (cur === id ? null : cur))
                      setHoveredCity(null)
                    }}
                  />
                  {hovered && (
                    <CustomOverlayMap
                      key={`${id}-${Boolean(!isLoading && weatherData)}`}
                      position={position}
                      xAnchor={0.5}
                      yAnchor={1}
                    >
                      <div className={styles.mapTooltip}>
                        {isLoading && <p>날씨 정보 로딩 중...</p>}
                        {error && <div className="text-red-500">{error}</div>}
                        {!isLoading && weatherData && (
                          <div className={styles.tooltipContent}>
                            <Image
                              src={getWeatherIconUrl(weatherData?.weather?.[0]?.icon)}
                              alt="weather icon"
                              width={50}
                              height={50}
                              className={styles.tooltipImg}
                            />
                            <div className={styles.tooltipTexts}>
                              <p className={styles.tooltipTitle}>{k_name}</p>
                              <p>{weatherData?.main?.temp}°C</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CustomOverlayMap>
                  )}
                </>
              )
            })}
          </div>
        )
      })}
    </Map>
  )
}
