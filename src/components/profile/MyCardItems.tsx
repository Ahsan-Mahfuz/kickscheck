import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import PassCard from './PassCard'
import RecentPosts from './RecentPosts'
import NotPassCard from './NotPassCard'
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
  ]
  return <Tabs defaultActiveKey="1" items={items} />
}

export default MyCardItems
