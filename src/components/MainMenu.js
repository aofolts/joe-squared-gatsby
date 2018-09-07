import React from 'react'
import {withHeaderContext} from './HeaderContext'
import {Link} from 'gatsby'
import css from '../less/menu-main-desktop.module.less'
import mobileStyle from '../less/header-mobile.module.less'

const SubMenu = ({subMenu}) => {
  if (!subMenu) return null

  const items = subMenu.map(item => {
    const {
      id,
      name,
      page,
      externalLink
    } = item

    const url = page ? page.slug : externalLink
    
    const itemTitle = url
      ? (
        <Link className={css.secondaryItemTitle} to={url}>
          {name}
        </Link>
      ) 
      : (
        <div className={css.secondaryItemTitle}>
          {name}
        </div>
      )

    return (
      <div key={id} className={css.secondaryItem}>
        {itemTitle}
      </div>
    )
  })

  return (
    <ul className={css.subMenu}>
      {items}
    </ul>
  )
}

class MainMenu extends React.Component {

  getMenuItems = () => {
    const {
      menuItems
    } = this.props.headerContext
    
    return menuItems.map(item => {
      const {
        id,
        name,
        page,
        externalLink,
        subMenu
      } = item

      const url = page ? page.slug : externalLink
      
      const itemTitle = url
        ? (
          <Link className={css.primaryItemTitle} to={url}>
            {name}
          </Link>
        ) 
        : (
          <div className={css.primaryItemTitle}>
            {name}
          </div>
        )

      return (
        <div key={id} className={css.primaryItem}>
          {itemTitle}
          <SubMenu subMenu={subMenu}/>
        </div>
      )
    })
  }

  render() {
    const {isMobile,activeSubMenuId} = this.props.headerContext

    const classes = [
      css.menu,
      isMobile ? mobileStyle.menu : null,
      isMobile && activeSubMenuId ? mobileStyle.menuShowingSubMenu : null
    ].join(' ')

    return (
      <ul id='menu' className={classes}>
        {this.getMenuItems()}
      </ul>
    )
  }
}

export default withHeaderContext(MainMenu)