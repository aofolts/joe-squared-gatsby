import React from 'react'
import css from '../less/menu-main-mobile.module.less'
import {Link} from 'gatsby'
import {withHeaderContext} from './HeaderContext'

const MenuItem = props => {
  const {
    id,
    name,
    page,
    externalLink,
    subMenu
  } = props

  const {
    setActiveSubMenuById
  } = props.headerContext

  const url = page ? page.slug : externalLink

  const SubMenuToggle = () => {
    if (!subMenu) return null

    const handleClick = () => {
      setActiveSubMenuById(id)
    }

    return (
      <div className={css.subMenuToggle} onClick={handleClick}/>
    )
  }
  
  const itemTitle = url
    ? (
      <Link className={css.menuItemTitle} to={url}>
        {name}
      </Link>
    ) 
    : (
      <div className={css.menuItemTitle}>
        {name}
      </div>
    )

  return (
    <li key={id} className={css.menuItem}>
      {itemTitle}
      <SubMenuToggle/>
    </li>
  )
}

export default withHeaderContext(MenuItem)