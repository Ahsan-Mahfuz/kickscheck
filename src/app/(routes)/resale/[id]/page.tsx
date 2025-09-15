'use client'
import { useGetResaleValueQuery } from '@/redux/snekersProfileApis'
import { usePathname } from 'next/navigation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const Resale = () => {
  const patheName = usePathname()
  const brandName = patheName.split('/').pop()
  const {
    data: resaleData,
    isLoading,
    isError,
  } = useGetResaleValueQuery({ brandName })
  const finalResaleData = resaleData?.data

  if (isLoading) return <div className="text-center py-6">Loading...</div>
  if (isError)
    return (
      <div className="text-center text-red-500 py-6">Something went wrong!</div>
    )

  const barChartData = [
    {
      category: 'Overall',
      averageValue: finalResaleData?.overall?.[0]?.averageMarketValue || 0,
      count: finalResaleData?.overall?.[0]?.totalCount || 0,
      nonZeroCount: finalResaleData?.overall?.[0]?.nonZeroCount || 0,
    },
    {
      category: 'AI Checked (True)',
      averageValue: finalResaleData?.isCheckedAI_true?.averageMarketValue || 0,
      count: finalResaleData?.isCheckedAI_true?.count || 0,
      nonZeroCount: finalResaleData?.isCheckedAI_true?.nonZeroCount || 0,
    },
    {
      category: 'AI Checked (False)',
      averageValue: finalResaleData?.isCheckedAI_false?.averageMarketValue || 0,
      count: finalResaleData?.isCheckedAI_false?.count || 0,
      nonZeroCount: finalResaleData?.isCheckedAI_false?.nonZeroCount || 0,
    },
  ]

  const pieChartData = [
    {
      name: 'AI Checked (True)',
      value: finalResaleData?.isCheckedAI_true?.count || 0,
      color: '#10b981',
    },
    {
      name: 'AI Checked (False)',
      value: finalResaleData?.isCheckedAI_false?.count || 0,
      color: '#ef4444',
    },
  ]

  const COLORS = ['#10b981', '#ef4444']

  return (
    <div className="max-w-6xl mx-auto p-6 !text-black">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Resale Analysis for <span className="text-blue-300">{brandName} </span>Brand
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Average Market Value Comparison
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value}`,
                'Average Market Value',
              ]}
              labelStyle={{ color: '#000' }}
            />
            <Bar dataKey="averageValue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Item Count Comparison
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData.filter((item) => item.category !== 'Overall')}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#8884d8"
                name="Total Count"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="nonZeroCount"
                fill="#82ca9d"
                name="Non-Zero Count"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            AI Check Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold text-center mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">
              ${finalResaleData?.overall?.[0]?.averageMarketValue}
            </div>
            <div className="text-sm text-gray-600">Overall Average Value</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">
              {finalResaleData?.overall?.[0]?.totalCount}
            </div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">
              {(
                (finalResaleData?.overall?.[0]?.nonZeroCount /
                  finalResaleData?.overall?.[0]?.totalCount) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-sm text-gray-600">Items with Value</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resale
