import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import React from 'react'
import clsx from 'clsx'
import profile from '@site/static/img/profile.png'
import styles from './index.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className='container'>
        <img
          src={profile}
          style={{ width: 280, borderRadius: '50%' }}
        />
        <h1 className='hero__title'>{siteConfig.title}</h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles['mutiple-button-box']}>
          <div className={styles.buttons}>
            <Link
              className='button button--secondary button--lg'
              to='/docs/intro'
            >
              {'笔记'}
            </Link>
          </div>
          <div style={{ width: 16 }} />
          <div className={styles.buttons}>
            <Link
              className='button button--secondary button--lg'
              to='/blog'
            >
              {'博客'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
