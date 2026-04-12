'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StatChartProps {
  data: { date: string; [key: string]: any }[]
  dataKeys: { key: string; color: string; label: string }[]
  title: string
}

export function StatChart({ data, dataKeys, title }: StatChartProps) {
  return (
    <div className="card-gaming p-4">
      <h4 className="font-gaming text-xs font-bold text-gray-300 mb-4">{title}</h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#242438" />
            <XAxis
              dataKey="date"
              stroke="#4B5563"
              tick={{ fontSize: 10 }}
            />
            <YAxis stroke="#4B5563" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #242438',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            {dataKeys.map((dk) => (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={dk.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                name={dk.label}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
