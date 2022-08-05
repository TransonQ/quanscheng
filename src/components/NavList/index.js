import React, { useCallback } from 'react'

import clsx from 'clsx'
import styles from './styles.module.css'

const Card = ({ title, link, note }) => {
  const handleClick = useCallback(() => window.open(link), [])
  return (
    <article className='col col--6 margin-bottom--lg'>
      <div
        onClick={handleClick}
        className={clsx(
          'card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module',
          styles.nav_card
        )}
      >
        <h2 className='text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module'>
          <a className={styles.link}>{title}</a>
        </h2>
        <p className='text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module'>
          {note}
        </p>
      </div>
    </article>
  )
}

export default function NavList({ list }) {
  return (
    <section className='row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module'>
      {list.map(({ title, link, note }, index) => (
        <Card key={index} title={title} link={link} note={note} />
      ))}
    </section>
  )
}
