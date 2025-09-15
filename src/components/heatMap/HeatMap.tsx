'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  MapPin,
  Eye,
  DollarSign,
  Navigation,
  Clock,
  Ruler,
  Loader,
} from 'lucide-react'
import { useGetSneakerHeatMapQuery } from '@/redux/snekersProfileApis'

// Type definitions
interface GeoLocation {
  coordinates: [number, number]
}

interface GeoMetrics {
  distanceKm: number
  distanceInMeters: number
  estimatedDurationMin: number
  bearingDegrees: number
  routeType: string
}

interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  id: string
}

interface SneakerData {
  _id: string
  userId: User | null
  sneaker_name: string
  brand_name: string
  sneaker_code: string
  isCheckedAI: boolean
  marketvalue: number
  geolocation?: GeoLocation
  geoMetrics: GeoMetrics
}

interface ApiResponse {
  success: boolean
  message: string
  data: SneakerData[]
}

interface QueryParams {
  id: string
  params: {
    lat: number
    log: number
  }
}

interface Stats {
  total: number
  aiChecked: number
  totalValue: number
  avgValue: number
}

const DEFAULT_LAT = 23.8103
const DEFAULT_LNG = 90.4125

const SneakerHeatMap: React.FC = () => {
  const [id, setId] = useState<string>('')
  const [selectedSneaker, setSelectedSneaker] = useState<SneakerData | null>(
    null
  )
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const [leafletMap, setLeafletMap] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    const storedId = localStorage.getItem('realTimeMarketValue')
    if (storedId) {
      setId(storedId)
    }
  }, [])

  const { data: apiResponse } = useGetSneakerHeatMapQuery(
    {
      id,
      params: {
        lat: DEFAULT_LAT,
        log: DEFAULT_LNG,
      },
    } as QueryParams,
    { skip: !id }
  )

  const sneakerData: SneakerData[] = apiResponse?.data || []

  const stats: Stats = {
    total: sneakerData.length,
    aiChecked: sneakerData.filter((s) => s.isCheckedAI).length,
    totalValue: sneakerData.reduce((sum, s) => sum + s.marketvalue, 0),
    avgValue:
      sneakerData.length > 0
        ? Math.round(
            sneakerData.reduce((sum, s) => sum + s.marketvalue, 0) /
              sneakerData.length
          )
        : 0,
  }

  const brands: string[] = [...new Set(sneakerData.map((s) => s.brand_name))]

  useEffect(() => {
    const initMap = async (): Promise<void> => {
      if (typeof window !== 'undefined' && mapRef.current && !leafletMap) {
        const L = (await import('leaflet')).default

        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        const map = L.map(mapRef.current).setView(
          [DEFAULT_LAT, DEFAULT_LNG],
          13
        )

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        setLeafletMap(map)
        setMapLoaded(true)
      }
    }

    initMap()
  }, [leafletMap])

  useEffect(() => {
    if (leafletMap && mapLoaded && sneakerData.length > 0) {
      const addMarkers = async (): Promise<void> => {
        const L = (await import('leaflet')).default

        markersRef.current.forEach((marker) => leafletMap.removeLayer(marker))
        markersRef.current = []

        sneakerData.forEach((sneaker) => {
          if (sneaker.geolocation && sneaker.geolocation.coordinates) {
            const [lat, lng] = sneaker.geolocation.coordinates

            const getMarkerColor = (value: number): string => {
              if (value > 300) return '#ef4444'
              if (value > 100) return '#f59e0b'
              return '#10b981'
            }

            const getMarkerSize = (value: number): number => {
              if (value > 300) return 30
              if (value > 100) return 25
              return 20
            }

            const markerSize = getMarkerSize(sneaker.marketvalue)
            const markerColor = getMarkerColor(sneaker.marketvalue)

            const markerHtml = `
              <div style="
                background-color: ${markerColor};
                width: ${markerSize}px;
                height: ${markerSize}px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                animation: pulse 2s infinite;
              ">
                👟
              </div>
            `

            const customIcon = L.divIcon({
              html: markerHtml,
              className: '',
              iconSize: [markerSize, markerSize],
              iconAnchor: [markerSize / 2, markerSize / 2],
            })

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
              leafletMap
            )

            const popupContent = `
              <div style="font-family: system-ui; min-width: 200px;">
                <div style="border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
                  <h3 style="margin: 0; color: #1f2937; font-size: 16px; font-weight: bold;">
                    ${sneaker.sneaker_name}
                  </h3>
                  <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
                    ${sneaker.brand_name} • ${sneaker.sneaker_code}
                  </p>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="color: #059669; font-size: 18px; font-weight: bold;">
                      $${sneaker.marketvalue}
                    </span>
                    ${
                      sneaker.isCheckedAI
                        ? '<span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px;">AI Verified</span>'
                        : ''
                    }
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; color: #6b7280;">
                  <div>📏 ${sneaker.geoMetrics.distanceKm} km</div>
                  <div>⏱️ ${sneaker.geoMetrics.estimatedDurationMin} min</div>
                  <div>🧭 ${sneaker.geoMetrics.bearingDegrees}°</div>
                  <div>📍 ${sneaker.geoMetrics.routeType}</div>
                </div>
                
                ${
                  sneaker.userId
                    ? `
                  <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
                    Owner: ${sneaker.userId.name}
                  </div>
                `
                    : ''
                }
              </div>
            `

            marker.bindPopup(popupContent)

            marker.on('click', () => {
              setSelectedSneaker(sneaker)
            })

            markersRef.current.push(marker)
          }
        })
      }

      addMarkers()
    }
  }, [leafletMap, mapLoaded, sneakerData])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
      document.head.appendChild(link)

      const style = document.createElement('style')
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }
        .leaflet-popup-tip {
          background: white;
        }
      `
      document.head.appendChild(style)

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }
    }
  }, [])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50 !mb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Sneaker Heat Map
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-blue-700 text-sm">Total Sneakers</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.aiChecked}
              </div>
              <div className="text-green-700 text-sm">AI Verified</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(stats.totalValue)}
              </div>
              <div className="text-purple-700 text-sm">Total Value</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(stats.avgValue)}
              </div>
              <div className="text-orange-700 text-sm">Avg Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Sneaker Locations
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Click on markers to view details
              </p>
            </div>

            <div className="relative h-full">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-gray-600 text-center">
                    <Loader className="animate-spin w-12 h-12 mx-auto mb-4" />
                    <p>Loading Map...</p>
                  </div>
                </div>
              )}

              <div
                ref={mapRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
              />

              {/* Map Legend */}
              {mapLoaded && (
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md z-[1000]">
                  <h3 className="text-sm font-semibold mb-2 text-gray-900">
                    Price Range
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-gray-700">$300+ Premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-700">$100-300 Mid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-700">Under $100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Brands Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Brands ({brands.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-sm cursor-pointer transition-colors"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Selected Sneaker Details */}
            {selectedSneaker ? (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Selected Sneaker
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {selectedSneaker.sneaker_name}
                    </h4>
                    <p className="text-gray-600">
                      {selectedSneaker.brand_name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {selectedSneaker.sneaker_code}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-green-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold text-xl">
                      {formatCurrency(selectedSneaker.marketvalue)}
                    </span>
                    {selectedSneaker.isCheckedAI && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        AI Verified
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ruler className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.distanceKm} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {selectedSneaker.geoMetrics.estimatedDurationMin} min
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.bearingDegrees}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.routeType}</span>
                    </div>
                  </div>

                  {selectedSneaker.userId && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-gray-600 text-sm">Owner:</p>
                      <p className="text-gray-900 font-semibold">
                        {selectedSneaker.userId.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {selectedSneaker.userId.phoneNumber}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedSneaker(null)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Click on a sneaker marker to view details
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  📍 {sneakerData.length} sneakers found in your area
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SneakerHeatMap
