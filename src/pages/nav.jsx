import Layout from '@theme/Layout'
import NavList from '@site/src/components/NavList'
import React from 'react'

const NavPage = () => {
  return (
    <Layout>
      <NavList
        list={[
          {
            title: '开源项目指南',
            link: 'https://opensource.guide/zh-hans/',
            note: '了解一下如何启动和发展开源项目。',
          },
        ]}
        title='website'
      />
    </Layout>
  )
}

export default NavPage
