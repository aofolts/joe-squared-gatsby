import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import Wrap from '../components/Wrap'
import { withLayout } from '../components/layout'
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
    case 'ContentfulLayoutGallery': return <GalleryContent layout={layout}/>;
    case 'ContentfulMarkdown':      return <MarkdownLayout layout={layout}/>;
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
      layout,
      featuredImage
    } = contentfulPage

    return (
      <Fragment>
        <Hero title={title} background={featuredImage} />
        <LayoutContent layout={layout[0]}/>
      </Fragment>
    )
  }
}

export default withLayout(PageTemplate)

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
    seo {
      title
      description {
        description
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
