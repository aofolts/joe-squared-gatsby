import React,{Component} from 'react'
import css from '../less/menu-main-mobile.module.less'
import {withHeaderContext} from './HeaderContext'
import {Link} from 'gatsby'

const MenuItem = props => {
  const {
    id,
    name,
    page,
    externalLink,
    subMenu
  } = props

  const url = page ? page.slug : externalLink

  const SubMenuToggle = () => {
    if (!subMenu) return null

    return (
      <div className={css.subMenuToggle}/>
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

class MobileMainMenu extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      activeSubMenu: false
    }
  }

  render() {
    const {
      menuItems
    } = this.props.headerContext

    const primaryItems = menuItems.map(item => {
      return <MenuItem key={item.id} {...item}/>
    })

    return (
      <div className={css.container}>
        <ul className={css.mainMenu}>
          {primaryItems}
        </ul>
      </div>
    )
  }
}

export default withHeaderContext(MobileMainMenu)