import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import {config} from '../config'


const Wrapper = Child => (
  class extends Component {

    static async getInitialProps(context) {
      const {slug,apiRoute} = context.query

      // Menu Data
      const menuRes = await fetch(`${config.api.url}/wp-json/j2/v1/menu/2`),
            menu    = await menuRes.json()

      // Fetch the category term
      const taxUrl = `${config.api.wpRestUrl}/food_category/?slug=${slug}`,
            tax    = await fetch(taxUrl).then(r => r.json()).then(r => r[0])

      if (!tax) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }

      // Fetch the sub category terms
      const taxKidsUrl = `${config.api.wpRestUrl}/food_category/?parent=${tax.id}`,
            taxKids    = await fetch(taxKidsUrl).then(r => r.json())

      // Fetch the menu items
      const foodItemsUrl = await `${config.api.wpRestUrl}/food/?food_category=${tax.id}&per_page=50`
      const foodMenuItems = await fetch(foodItemsUrl).then(r => r.json()).then(
        r => r.sort((a,b) => a.title.rendered.toUpperCase() > b.title.rendered.toUpperCase() ? 1 : -1)
      )

      // Food Posts
      let postsUrl = await `${config.api.wpRestUrl}/food/?food_category=${tax.id}`,
          posts    = await fetch(postsUrl).then(r => r.json())

      return Child.getInitialProps({
        title: tax.name,
        featuredImage: tax.featured_image,
        foodMenuItems: foodMenuItems,
        menu: menu,
        category: tax,
        subCategories: taxKids,
        posts: posts,
        context: context.apiRoute,
        query: context.query,
        url: `${config.api.wpRestUrl}/food/?food_category=${tax.id}`
      })
    }

    render() {
      return (
        <Child {...this.props} />
      )
    }
  }
)

export default Wrapper