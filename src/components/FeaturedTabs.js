import React from 'react'
import Content from '../components/Content'
import css from '../less/tabSorter.module.less'

const Tabs = props => {

  const tabItems = props.tabs.map(tab => {
    const itemClasses = [
            css.item,
            tab.id == props.activeTabId ? css.selectedItem : null
          ].join(' ')

    return (
      <li className={itemClasses} key={tab.id}>
        <Content html={tab.content}/>
      </li>
    )
  })

  return (
    <ul className={css.tabs}>
      {tabItems}
    </ul>
  )
}

const Nav = props => {
  const {activeTabId,setActiveTabById} = props

  const items = props.tabs.map((tab,i) => {
    const {id,title} = tab

    const itemClasses = [
      css.navItem,
      id == activeTabId ? css.selectedNavItem : null
    ].join(' ')

    return (
      <li className={itemClasses} key={id} onClick={() => setActiveTabById(id)}>
        {title}
      </li>
    )
  })

  return (
    <nav className={css.nav}>
      <ul className='items'>
        {items}
      </ul>
    </nav>
  )
}

export default class FeaturedTabs extends React.Component {

  constructor(props) { 
    super(props)

    const tabs = this.tabs = props.tabs.map(tab => {
      return {
        id: tab.id,
        title: tab.title,
        content: tab.content.reduce((html,markdown) => {
          return html + markdown.markdown.childMarkdownRemark.html
        },'')
      }
    })

    this.state = {
      activeTabId: tabs[0].id
    }

    // const dotw = [
    //   'monday',
    //   'tuesday',
    //   'wednesday',
    //   'thursday',
    //   'friday',
    //   'saturday',
    //   'sunday'
    // ]

    // const date     = new Date(),
    //       todayKey = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

    // const HoursText = props => {
    //   const fields = props.fields,
    //         day    = fields.day.charAt(0).toUpperCase() + fields.day.slice(1)

    //   if (fields.is_open) {
    //     return (
    //       <div className='day'>
    //         {`${day}: ${fields.opens} - ${fields.closes}.`}
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>{day}: Closed.</div>
    //     )
    //   }
    // }

    // const hours = dotw.map(key => (
    //   <div key={key} className='day'>
    //     <HoursText fields={props.hours[key]} />
    //   </div>
    // ))

    // const openTable = (
    //   <p>Book on <a target='__blank' href={this.props.location.open_table_link}>Open Table</a></p>
    // )

    // const visit = (
    //   <p>
    //     <span>{this.props.location.address}</span><br/>
    //     <span>Phone: {this.props.location.phone}</span><br/>
    //     <span>Fax: {this.props.location.fax}</span><br/>
    //     <span>
    //       More <Link href='/visit'>
    //         <a target='__blank'>Location Info</a>
    //       </Link>
    //     </span>
    //   </p>
    // )

    // const items = [
    //   {
    //     title: 'Today',
    //     content: <HoursText fields={props.hours[todayKey]} />
    //   },
    //   {
    //     title: 'Hours',
    //     content: hours
    //   },
    //   {
    //     title: 'Visit',
    //     content: visit
    //   },
    //   {
    //     title: 'Reserve a Table',
    //     content: openTable
    //   }
    // ]

    // this.state = {
    //   items: items,
    //   activeTab: 0,
    //   todayKey: todayKey
    // }
  }

  setActiveTabById = id => {
    this.setState({
      activeTabId: id
    })
  }

  render() {
    // return (
    //   <div className={css.sorter}>
    //     <nav className={css.nav}>
    //       {this.state.items.map((item,i) => {
    //         const itemClasses = [
    //           css.navItem,
    //           i == this.state.activeTab ? css.selectedNavItem : null
    //         ].join(' ')

    //         return (
    //           <div className={itemClasses} key={i} onClick={() => this.changeTab(i)}>
    //             {item.title}
    //           </div>
    //         )
    //       })}
    //     </nav>
    //     <div className={css.items}>
    //       {this.state.items.map((item,i) => {
    //         const itemClasses = [
    //           css.item,
    //           i == this.state.activeTab ? css.selectedItem : null
    //         ].join(' ')

    //         return (
    //           <div className={itemClasses} key={i}>
    //             {item.content}
    //           </div>
    //         )
    //       })}
    //     </div>
    //   </div>
    // )

    return (
      <div id='featuredTabs'>
        <Nav 
          activeTabId={this.state.activeTabId} 
          setActiveTabById={this.setActiveTabById}
          tabs={this.tabs}
        />
        <Tabs activeTabId={this.state.activeTabId} tabs={this.tabs}/>
      </div>
    )
  }

}