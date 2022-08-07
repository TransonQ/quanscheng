import { cheatsheet, course, website } from '@site/src/data/nav'

import Layout from '@theme/Layout'
import NavList from '@site/src/components/NavList'
import React from 'react'

const About = () => {
  return (
    <Layout>
      <NavList list={website} title='website' />
      <NavList list={cheatsheet} title='小抄' />
      <NavList list={course} title='教程' />
    </Layout>
  )
}

export default About
