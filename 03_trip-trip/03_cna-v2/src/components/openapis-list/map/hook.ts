import { useState, useEffect } from 'react'
import { OpenWeatherResponse, GeoGeometry } from './types'
import { fetchWeather } from 'api/weather/fetchWeather'

export function useWeather(city: string | null) {
  const [data, setData] = useState<OpenWeatherResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) {
      setData(null)
      return
    }

    const getWeather = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchWeather(city)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    getWeather()
  }, [city])

  return { data, isLoading, error }
}

export const toLatLng = ([lng, lat]: number[]) => ({ lat, lng })

export const geomToPolygons = (geom: GeoGeometry | null | undefined) => {
  if (!geom) return []
  if (geom.type === 'Polygon') {
    return [geom.coordinates.map((ring: number[][]) => ring.map(toLatLng))]
  }
  if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map((poly: number[][][]) =>
      poly.map((ring: number[][]) => ring.map(toLatLng))
    )
  }
  return []
}

export const getWeatherIconUrl = (icon: string) => {
  return icon ? `https://openweathermap.org/img/wn/${icon}.png` : ''
}
