import React from 'react'
import MainMenu from './MainMenu'
import {Link} from 'gatsby'
import {HeaderContext} from './HeaderContext'
//import MobileMenu from './MobileMenu'
import css from '../less/header.module.less'
import desktopStyle from '../less/header-desktop.module.less'
import mobileStyle from '../less/header-mobile.module.less'
import logoSrc from '../../static/img/logo-inline.svg'

/**
 * HEADER
 */
class Header extends React.Component {

  constructor(props) {
    super(props)
  
    const boundMethods = [
      'checkIsDocked',
      'checkIsMobile',
      'closeMobileMenu',
      'getHeaderClass',
      'getMobileMenu',
      'openMobileMenu',
      'setActiveSubMenuById',
      'watchScroll',
      'watchWindow'
    ]
      
    boundMethods.forEach(method => this[method] = this[method].bind(this))

    this.state = {
      activeSubMenuId: false,
      isDocked: true,
      isMobile: false,
      mobileMenuIsOpen: false,
      closeMobileMenu: this.closeMobileMenu,
      openMobileMenu: this.openMobileMenu,
      setActiveSubMenuById: this.setActiveSubMenuById
    }
  }

  checkIsDocked() {

  }

  checkIsMobile() {
    const width    = window.outerWidth,
          isMobile = (width < 1280) || false

    if (isMobile !== this.state.isMobile) {
      this.setState({
        isMobile: isMobile
      })
    }
  }

  componentDidMount() {
    this.checkIsDocked()
    this.checkIsMobile()
    this.watchScroll()
    this.watchWindow()
  }

  checkIsDocked() {
    const docked = window.pageYOffset === 0

    if (docked !== this.state.isDocked) {
      this.setState({
        isDocked: window.pageYOffset === 0 ? true : false
      })
    }
  }

  closeMobileMenu() {
    this.setState({
      activeSubMenuId: false,
      mobileMenuIsOpen: false
    })
  }

  getHeaderClass() {
    if (this.state.isMobile) {
      return 'is-mobile'
    } else {
      return 'not-mobile'
    }
  }

  getMobileMenu() {
    if (this.state.isMobile) {
      // return (
      //   <HeaderContext.Provider value={this.state}>
      //     <MobileMenu menu={this.props.menu} closeMobileMenu={() => this.closeMobileMenu()}/>
      //     <div id='mobileMenuToggle' className={mobileStyle.mobileMenuToggle} onClick={this.openMobileMenu}>
      //       <div className={mobileStyle.topBar}></div>
      //       <div className={mobileStyle.middleBar}></div>
      //       <div className={mobileStyle.bottomBar}></div>
      //     </div>
      //   </HeaderContext.Provider>
      // )
      return <h1>Modile</h1>
    } else {
      return (
        <HeaderContext.Provider value={this.state}>
           <MainMenu/>
        </HeaderContext.Provider>
      )
    }
  }

  openMobileMenu() {
    this.setState({
      mobileMenuIsOpen: true
    })
  }
  
  setActiveSubMenuById(id) {
    this.setState({
      activeSubMenuId: id
    })
  }

  watchScroll() {
    window.addEventListener('scroll',e => {
      this.checkIsDocked()
    })
  }

  watchWindow() {
    window.addEventListener('resize',e => {
      this.checkIsMobile()
    })
  }

  render() {
    const headerClasses = [
      css.header,
      this.state.isDocked ? null : css.scrollingHeader
    ].join(' ')

    const navClasses = [
      css.nav,
      this.state.isMobile ? mobileStyle.nav : desktopStyle.nav
    ].join(' ')

    return (
      <header id='header' className={headerClasses}>
        <nav id='nav' className={navClasses}>
          <Link to='/' id='site_name' className={css.siteName}>
            <img id='siteLogo' className={css.siteLogo} src={logoSrc}/>
          </Link>
          {this.getMobileMenu()}
        </nav>
      </header>
    )
  }
}

export default Header