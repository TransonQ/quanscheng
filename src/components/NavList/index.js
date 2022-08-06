import React, { useCallback } from 'react'

import clsx from 'clsx'
import styles from './styles.module.css'

const Card = ({ title, link, note }) => {
  const handleClick = useCallback(() => window.open(link), [])
  return (
    <article className='col col--3 margin-bottom--md'>
      <div onClick={handleClick} className={clsx('card ', styles.nav_card)}>
        <h2 className='text--truncate'>
          <a className={styles.link}>{title}</a>
        </h2>
        <p className={clsx('text--truncate', styles.note)}>{note}</p>
      </div>
    </article>
  )
}

export default function NavList({ list, title }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.card_head}>{title}</h4>
      {list.map(({ title, link, note }, index) => (
        <Card key={index} title={title} link={link} note={note} />
      ))}
    </div>
  )
}
