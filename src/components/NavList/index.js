import React from 'react'

const Card = ({ title, link, note }) => {
  return (
    <article className='col col--6 margin-bottom--lg'>
      <a
        href={link}
        target="_blank"
        className='card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module'
      >
        <h2 className='text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module'>
          {title}
        </h2>
        <p className='text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module'>
          {note}
        </p>
      </a>
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
