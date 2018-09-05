import React from 'react'
import {withHeaderContext} from './HeaderContext'
//import MenuItem from './MenuItem'
import css from '../less/header.module.less'
import mobileStyle from '../less/header-mobile.module.less'

class MainMenu extends React.Component {

  constructor(props) {
    super(props)

    console.log(props)
  }

  // getMenuItems = () => {
  //   return this.props.items.map(item => {
  //     return (
  //       <MenuItem 
  //         item={item} 
  //         key={item.ID}
  //       />
  //     )
  //   })
  // }

  render() {
    const {isMobile,activeSubMenuId} = this.props.headerContext

    const classes = [
      css.menu,
      isMobile ? mobileStyle.menu : null,
      isMobile && activeSubMenuId ? mobileStyle.menuShowingSubMenu : null
    ].join(' ')

    return (
      <ul id='menu' className={classes}>
        {/* {this.getMenuItems()} */}
      </ul>
    )
  }
}

export default MainMenu