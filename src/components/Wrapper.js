import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import {config} from '../config'


const Wrapper = Child => (
  class extends Component {

    static async getInitialProps(context) {
      const {slug,apiRoute} = context.query

      // Menu Data
      const menuRes = await fetch(`${config.api.restUrl}/j2/v1/menu/2`),
            menu    = await menuRes.json()

      // Post Url
      let postUrl = `${config.api.wpRestUrl}/${apiRoute}/`
      if (slug) {postUrl += `?slug=${slug}`}
      console.log(postUrl)

      // Post Data
      const postRes = await fetch(postUrl),
            post    = await postRes.json().then(r => {
              return Array.isArray(r) ? r[0] : r
            })

      if (!post) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }

      return Child.getInitialProps({
        post: post,
        menu: menu,
        context: context.apiRoute,
        query: context.query
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