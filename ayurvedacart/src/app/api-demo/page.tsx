'use client'

import { useState, useEffect } from 'react'
import { 
  Database, 
  Server, 
  Code2, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Play,
  Copy,
  ExternalLink
} from 'lucide-react'

interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export default function ApiDemoPage() {
  const [activeDemo, setActiveDemo] = useState('overview')
  const [demoData, setDemoData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState('')

  const demos = [
    { id: 'overview', name: 'API Overview', icon: Database },
    { id: 'products', name: 'Product Management', icon: Server },
    { id: 'search', name: 'Search System', icon: Code2 },
    { id: 'orders', name: 'Order Management', icon: CheckCircle }
  ]

  useEffect(() => {
    fetchDemo(activeDemo)
  }, [activeDemo])

  const fetchDemo = async (demo: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/demo?demo=${demo}`)
      const result = await response.json()
      setDemoData(result)
    } catch (error) {
      setDemoData({
        success: false,
        error: 'Failed to fetch demo data'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AyuraVeda Royale API Integration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive backend API integration showcasing our complete e-commerce platform
              with Supabase, TypeScript, and modern React patterns.
            </p>
            <div className="flex justify-center items-center mt-6 space-x-6">
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Production Ready</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Database className="h-5 w-5 mr-2" />
                <span className="font-medium">Supabase Backend</span>
              </div>
              <div className="flex items-center text-purple-600">
                <Code2 className="h-5 w-5 mr-2" />
                <span className="font-medium">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Demos</h3>
              <nav className="space-y-2">
                {demos.map((demo) => {
                  const Icon = demo.icon
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setActiveDemo(demo.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeDemo === demo.id
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {demo.name}
                    </button>
                  )
                })}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <a 
                    href="/api/products" 
                    target="_blank"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Products API
                  </a>
                  <a 
                    href="/api/search?q=ashwagandha" 
                    target="_blank"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Search API
                  </a>
                  <a 
                    href="/products" 
                    className="flex items-center text-emerald-600 hover:text-emerald-800"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Live Frontend
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {demos.find(d => d.id === activeDemo)?.name}
                  </h2>
                  <button
                    onClick={() => fetchDemo(activeDemo)}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {loading ? 'Loading...' : 'Run Demo'}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                  </div>
                ) : demoData?.success ? (
                  <div className="space-y-6">
                    {/* Title */}
                    {demoData.data?.title && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {demoData.data.title}
                        </h3>
                        {demoData.data.version && (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {demoData.data.version}
                          </span>
                        )}
                      </div>
                    )}

                    {/* API Response */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">API Response</h4>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(demoData.data, null, 2), 'response')}
                          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          {copied === 'response' ? 'Copied!' : 'Copy JSON'}
                        </button>
                      </div>
                      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {JSON.stringify(demoData.data, null, 2)}
                      </pre>
                    </div>

                    {/* Features Overview */}
                    {demoData.data?.features && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(demoData.data.features).map(([key, value]: [string, any]) => (
                            <div key={key} className="border border-gray-200 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">{key}</h5>
                              {typeof value === 'object' ? (
                                <div className="space-y-1 text-sm text-gray-600">
                                  {value.endpoints && (
                                    <div>
                                      <strong>Endpoints:</strong> {value.endpoints.join(', ')}
                                    </div>
                                  )}
                                  {value.features && (
                                    <div>
                                      <strong>Features:</strong> {value.features.join(', ')}
                                    </div>
                                  )}
                                  {value.status && (
                                    <div className="font-medium text-green-600">
                                      {value.status}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-600">{value}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Example API Calls */}
                    {demoData.data?.example_calls && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Example API Calls</h4>
                        <div className="space-y-3">
                          {Object.entries(demoData.data.example_calls).map(([name, endpoint]: [string, any]) => (
                            <div key={name} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{name}</h5>
                                <button
                                  onClick={() => copyToClipboard(endpoint, name)}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  {copied === name ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                              <code className="text-sm text-gray-700">{endpoint}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Demo Failed
                      </h3>
                      <p className="text-gray-600">
                        {demoData?.error || 'Unable to load demo data'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-4">
              <strong>AyuraVeda Royale</strong> - Complete E-commerce API Integration
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <span>✅ Supabase Backend</span>
              <span>✅ TypeScript Types</span>
              <span>✅ Error Handling</span>
              <span>✅ Authentication</span>
              <span>✅ Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 