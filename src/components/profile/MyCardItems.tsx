'use client'
import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import PassCard from './PassCard'
import RecentPosts from './RecentPosts'
import NotPassCard from './NotPassCard'
import RealTimeMarketValueChecking from './RealTimeMarketValueChecking'
import SneakerHeatMap from '../heatMap/HeatMap'

const MyCardItems = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div className="font-bold text-white text-xl">Recent Posts</div>,
      children: <RecentPosts />,
    },
    {
      key: '2',
      label: <div className="font-bold text-white text-xl">Pass</div>,
      children: <PassCard />,
    },
    {
      key: '3',
      label: <div className="font-bold text-white text-xl">Not Pass</div>,
      children: <NotPassCard />,
    },
    {
      key: '4',
      label: <div className="font-bold text-white text-xl">Market Value</div>,
      children: <RealTimeMarketValueChecking />,
    },
    {
      key: '5',
      label: <div className="font-bold text-white text-xl ">Heat Map</div>,
      children: <SneakerHeatMap />,
    },
  ]

  return <Tabs defaultActiveKey="1" items={items} />
}

export default MyCardItems
