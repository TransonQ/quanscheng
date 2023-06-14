import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'GitHub',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/TransonQ'
        >
          {'TransonQ'}
        </a>
      </>
    ),
  },
  {
    title: '关于',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <>Front-end Engineer in Fastlane</>,
  },
  {
    title: '联系',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <>quanscheng@hotmail.com</>,
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>{/* <Svg className={styles.featureSvg} role='img' /> */}</div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature
              key={idx}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
