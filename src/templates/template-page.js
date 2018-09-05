import {graphql} from 'gatsby'
import React from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import GalleryContent from '../components/GalleryContent'

import Content from '../components/Content'

const MarkdownLayout = props => {
  const html = props.layout.markdown.childMarkdownRemark.html

  return (
    <Wrap width='small'>
      <Content html={html} />
    </Wrap>
  )
}

const LayoutContent = props => {
  const {layout} = props

  const {
    __typename: layoutType
  } = layout

  switch (layoutType) {
    case 'ContentfulLayoutGallery': return <GalleryContent layout={layout}/>; break;
    case 'ContentfulMarkdown':      return <MarkdownLayout layout={layout}/>; break;
    default: return <h2>No Layout</h2>
  }
}

class PageTemplate extends React.Component {
  
  render() {
    const {
      contentfulPage
    } = this.props.data

    const {
      title,
      slug,
      layout,
      featuredImage
    } = contentfulPage

    return (
      <Layout {...this.props}>
        <Hero title={title} background={featuredImage} />
        <LayoutContent layout={layout[0]}/>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      ...pageFields
      layout {
        ...markdownContent
        ...galleryLayoutFields
      }
    }
  }
`

export const markdownContent = graphql`
  fragment markdownContent on ContentfulMarkdown {
    markdown {
      childMarkdownRemark {
        html
      }
    }
  }
`

export const pageFields = graphql`
  fragment pageFields on ContentfulPage {
    title,
    slug,
    featuredImage {
      title
      sizes(maxWidth: 1920) {
        ...GatsbyContentfulSizes
      }
    }
  }
`

export const galleryLayoutFields = graphql`
  fragment galleryLayoutFields on ContentfulLayoutGallery {
    photos {
      id
      title
      sizes(maxWidth: 600) {
        ...GatsbyContentfulSizes
      }
    }
  }
`
