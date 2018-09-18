import {graphql} from 'gatsby'
import React from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/layout'
import Hero from '../components/Hero'
//import css from '../less/archive-blog.module.less'
import Content from '../components/Content'

const PostBody = ({markdown}) => {
  const html = markdown.childMarkdownRemark.html

  return (
    <Wrap width='small'>
      <Content html={html} />
    </Wrap>
  )
}

class BlogPostTemplate extends React.Component {
  
  render() {
    const {
      contentfulBlogPost
    } = this.props.data

    const {
      title,
      body,
      featuredImage
    } = contentfulBlogPost

    const layoutProps = {
      title,
      seo: {
        description:contentfulBlogPost.body.childMarkdownRemark.excerpt
      }
    }

    return (
      <Layout {...layoutProps}>
        <Hero title={title} background={featuredImage} />
        <PostBody markdown={body}/>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      slug
      category {
        name
        slug
      }
      featuredImage {
        title
        sizes(maxWidth: 1920) {
          ...GatsbyContentfulSizes
        }
      }
      author {
        name
        nickname
        photo {
          sizes(maxWidth: 250) {
            ...GatsbyContentfulSizes
          }
        }
      }
      body {
        childMarkdownRemark {
          excerpt
          html
        }
      }
    }
  }
`


