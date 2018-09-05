import React from 'react'
import MainMenu from '../parts/MainMenu'
import {withHeaderContext} from '../parts/HeaderContext'
import css from '.../less/less/header-mobile.less'

/**
 * Icon
 * 
 * Closes mobile menu
 * OR
 * Exits current mobile sub menu
 */
const MobileMenuExit = withHeaderContext(props => {
  const {activeSubMenuId,setActiveSubMenuById,closeMobileMenu} = props.headerContext

  const exitClasses = [
    css.exit,
    activeSubMenuId ? css.exitSubMenu : css.exitMobileMenu
  ].join(' ')

  return (
    <div 
      className={exitClasses} 
      onClick={() => {
        if (activeSubMenuId) {
          setActiveSubMenuById(false)
        } else {
          closeMobileMenu()
        }
      }}
      >
    </div>
  )
})

/**
 * Mobile Menu
 * 
 * Show on mobile devices
 */
class MobileMenu extends React.Component {
  constructor(props) {
    super(props);

    const boundMethods = [
    ]
      
    boundMethods.forEach(method => this[method] = this[method].bind(this))
    
    this.state = {
      openClass: props.openClass
    }
  }
  
  render() {
    const {headerContext} = this.props

    const classes = [
      headerContext.mobileMenuIsOpen ? css.openMobileMenu : null,
      css.menuMobile
    ].join(' ')

    return (
      <div id='menuMobile' className={classes}>
        <MainMenu items={this.props.menu} />
        {this.state.activeMenu}
        <MobileMenuExit/>
      </div>
    )
  }
}

export default withHeaderContext(MobileMenu)