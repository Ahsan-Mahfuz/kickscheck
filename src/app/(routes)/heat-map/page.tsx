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

const SneakerHeatMap = () => {
  const [selectedSneaker, setSelectedSneaker] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [leafletMap, setLeafletMap] = useState(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  // Your API data
  const sneakerData = [
    {
      _id: '6851cfa475c324e8bfa2a656',
      userId: null,
      sneaker_name: 'Reebok Classic Leather',
      brand_name: 'Reebok',
      sneaker_code: 'RCL#004',
      isCheckedAI: false,
      marketvalue: 0,
      geolocation: {
        coordinates: [23.8103, 90.4125],
      },
      geoMetrics: {
        distanceKm: 0.42,
        distanceInMeters: 421,
        estimatedDurationMin: 0.5,
        bearingDegrees: 224.5,
        routeType: 'very_close',
      },
    },
    {
      _id: '6851d04f413e0c37c83516f0',
      userId: null,
      sneaker_name: 'Asics Gel-Kayano 27',
      brand_name: 'Asics',
      sneaker_code: 'AGK27#006',
      isCheckedAI: true,
      marketvalue: 140,
      geolocation: {
        coordinates: [23.8103, 90.4125],
      },
      geoMetrics: {
        distanceKm: 0.42,
        distanceInMeters: 421,
        estimatedDurationMin: 0.5,
        bearingDegrees: 224.5,
        routeType: 'very_close',
      },
    },
    {
      _id: '6851d29834b267937aab9870',
      userId: null,
      sneaker_name: 'Saucony Shadow 6000',
      brand_name: 'Saucony',
      sneaker_code: 'SS6000#010',
      isCheckedAI: true,
      marketvalue: 120,
      geolocation: {
        coordinates: [23.8103, 90.4125],
      },
      geoMetrics: {
        distanceKm: 0.42,
        distanceInMeters: 421,
        estimatedDurationMin: 0.5,
        bearingDegrees: 224.5,
        routeType: 'very_close',
      },
    },
    {
      _id: '686055420d4101d647b4e07b',
      userId: null,
      sneaker_name: 'Adidas Yeezy Boost 350 V2 Zebra',
      brand_name: 'Adidas',
      sneaker_code: 'ADYBZ#002',
      isCheckedAI: false,
      marketvalue: 420,
      geolocation: {
        coordinates: [23.813, 90.4154],
      },
      geoMetrics: {
        distanceKm: 0,
        distanceInMeters: 0,
        estimatedDurationMin: 0,
        bearingDegrees: 0,
        routeType: 'very_close',
      },
    },
    {
      _id: '68a97c2fb0261697deaac0d3',
      userId: {
        _id: '6890984149e0ad8cc864a1de',
        name: 'manik sorkar',
        email: 'fapoli9428@efpaper.com',
        phoneNumber: '01722305054',
      },
      sneaker_name: 'Nike Air Jordan 1',
      brand_name: 'Nike',
      sneaker_code: 'NAJ1',
      isCheckedAI: false,
      marketvalue: 250,
      geolocation: {
        coordinates: [23.815, 90.42],
      },
      geoMetrics: {
        distanceKm: 0.8,
        distanceInMeters: 800,
        estimatedDurationMin: 1.2,
        bearingDegrees: 45,
        routeType: 'close',
      },
    },
  ]

  // Calculate statistics
  const stats = {
    total: sneakerData.length,
    aiChecked: sneakerData.filter((s) => s.isCheckedAI).length,
    totalValue: sneakerData.reduce((sum, s) => sum + s.marketvalue, 0),
    avgValue: Math.round(
      sneakerData.reduce((sum, s) => sum + s.marketvalue, 0) /
        sneakerData.length
    ),
  }

  const brands = [...new Set(sneakerData.map((s) => s.brand_name))]

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      if (typeof window !== 'undefined' && mapRef.current && !leafletMap) {
        // Dynamically import Leaflet
        const L = (await import('leaflet')).default

        // Fix Leaflet default markers
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        // Create map centered on Dhaka (based on your coordinates)
        const map = L.map(mapRef.current).setView([23.8103, 90.4125], 13)

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        setLeafletMap(map)
        setMapLoaded(true)
      }
    }

    initMap()
  }, [leafletMap])

  // Add markers when map is loaded
  useEffect(() => {
    if (leafletMap && mapLoaded) {
      const addMarkers = async () => {
        const L = (await import('leaflet')).default

        // Clear existing markers
        markersRef.current.forEach((marker) => leafletMap.removeLayer(marker))
        markersRef.current = []

        // Add new markers
        sneakerData.forEach((sneaker) => {
          if (sneaker.geolocation && sneaker.geolocation.coordinates) {
            const [lat, lng] = sneaker.geolocation.coordinates

            // Create custom marker based on price
            const getMarkerColor = (value) => {
              if (value > 300) return '#ef4444' // red
              if (value > 100) return '#f59e0b' // yellow
              return '#10b981' // green
            }

            const markerHtml = `
              <div style="
                background-color: ${getMarkerColor(sneaker.marketvalue)};
                width: ${
                  sneaker.marketvalue > 300
                    ? '30px'
                    : sneaker.marketvalue > 100
                    ? '25px'
                    : '20px'
                };
                height: ${
                  sneaker.marketvalue > 300
                    ? '30px'
                    : sneaker.marketvalue > 100
                    ? '25px'
                    : '20px'
                };
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
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            })

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
              leafletMap
            )

            // Create popup content
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

            // Add click event
            marker.on('click', () => {
              setSelectedSneaker(sneaker)
            })

            markersRef.current.push(marker)
          }
        })
      }

      addMarkers()
    }
  }, [leafletMap, mapLoaded])

  // Load Leaflet CSS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
      document.head.appendChild(link)

      // Add custom styles for animations
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
        document.head.removeChild(link)
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            🔥 Sneaker Heat Map
          </h1>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-blue-100 text-sm">Total Sneakers</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white">
                {stats.aiChecked}
              </div>
              <div className="text-green-100 text-sm">AI Verified</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white">
                ${stats.totalValue}
              </div>
              <div className="text-purple-100 text-sm">Total Value</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white">
                ${stats.avgValue}
              </div>
              <div className="text-orange-100 text-sm">Avg Value</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          {/* Map Container */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Sneaker Locations
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Click on markers to view details
              </p>
            </div>

            {/* Real Map */}
            <div className="relative h-full">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
                  <div className="text-white text-center">
                    <Loader className="animate-spin w-12 h-12 mx-auto mb-4" />
                    <p>Loading Map...</p>
                  </div>
                </div>
              )}

              <div
                ref={mapRef}
                className="w-full h-full rounded-b-2xl"
                style={{ minHeight: '400px' }}
              />

              {/* Map Legend */}
              {mapLoaded && (
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white z-[1000]">
                  <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>$300+ Premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>$100-300 Mid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Under $100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Brand Filter */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Brands ({brands.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 cursor-pointer transition-colors"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Selected Sneaker Details */}
            {selectedSneaker ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 transform animate-in slide-in-from-right duration-300">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Selected Sneaker
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      {selectedSneaker.sneaker_name}
                    </h4>
                    <p className="text-gray-300">
                      {selectedSneaker.brand_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedSneaker.sneaker_code}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-green-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold text-xl">
                      ${selectedSneaker.marketvalue}
                    </span>
                    {selectedSneaker.isCheckedAI && (
                      <span className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs">
                        AI Verified
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Ruler className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.distanceKm} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>
                        {selectedSneaker.geoMetrics.estimatedDurationMin} min
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Navigation className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.bearingDegrees}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedSneaker.geoMetrics.routeType}</span>
                    </div>
                  </div>

                  {selectedSneaker.userId && (
                    <div className="bg-white/10 rounded-lg p-3 mt-3">
                      <p className="text-gray-300 text-sm">Owner:</p>
                      <p className="text-white font-semibold">
                        {selectedSneaker.userId.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {selectedSneaker.userId.phoneNumber}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedSneaker(null)}
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300">
                  Click on a sneaker marker to view details
                </p>
                <p className="text-gray-400 text-sm mt-2">
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
