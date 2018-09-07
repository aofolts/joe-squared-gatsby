import {graphql} from 'gatsby'
import React from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import css from '../less/archive-blog.module.less'
import Image from 'gatsby-image'
import {Link} from 'gatsby'
import Content from '../components/Content'

const BasicContent = props => {
  const html = props.layout[0].markdown.childMarkdownRemark.html

  return (
    <Wrap width='small' style={{textAlign: 'center'}}>
      <Content html={html} />
    </Wrap>
  )
}

const ArchiveSection = props => {
  const cards = props.posts.map(post => {
    const {
      id,
      title,
      featuredImage,
      slug,
      body,
      category
    } = post

    const excerpt = body.childMarkdownRemark.excerpt

    return (
      <article key={id} className={css.card}>
        <Link to={`/community/${slug}`}>
          <div className={css.cardMedia}>
            <Image 
              outerWrapperClassName='mediaBackground' 
              className={'mediaBackground'}
              sizes={featuredImage.sizes}
            />
          </div>
          <div className={css.cardContent}>
            <div className={css.cardCategory}>
              {category.name}
            </div>
            <h3 className={css.cardTitle}>{title}</h3>
            <div className={css.cardExcerpt}>
              {excerpt}
            </div>
          </div>
        </Link>
      </article>
    )
  })

  return (
    <section className={css.archiveSection}>
      <Wrap width='small'>
        {cards}
      </Wrap>
    </section>
  )
}

class CommunityPageTemplate extends React.Component {
  
  render() {
    const {
      contentfulPage,
      allContentfulBlogPost
    } = this.props.data

    const posts = allContentfulBlogPost.edges.map(post => {
      return post.node
    })

    const {
      title,
      layout,
      featuredImage
    } = contentfulPage

    return (
      <Layout {...this.props}>
        <Hero title={title} background={featuredImage} />
        <BasicContent layout={layout}/>
        <ArchiveSection posts={posts}/>
      </Layout>
    )
  }
}

export default CommunityPageTemplate

export const pageQuery = graphql`
  {
    contentfulPage(slug: {eq: "community"}) {
      ...pageFields
      layout {
        ...markdown
      }
    }
    allContentfulBlogPost(limit:9) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes
            }
          }
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          category {
            name
            slug
          }
        }
      }
    }
  }
`


