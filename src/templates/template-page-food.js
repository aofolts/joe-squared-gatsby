import {graphql} from 'gatsby'
import React from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import css from '../less/page-food.module.less'
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

const CategoriesSection = props => {
  const itemCards = props.items.map(cat => {
    const {
      id,
      name,
      featuredImage,
      slug
    } = cat

    return (
      <li key={id} className={css.card}>
        <Link to={`/food/${slug}`}>
          <div className={css.cardMedia}>
            <Image 
              outerWrapperClassName='mediaBackground' 
              className={'mediaBackground'}
              sizes={featuredImage.sizes}
            />
          </div>
          <h3 className={css.cardTitle}>{name}</h3>
        </Link>
      </li>
    )
  })

  return (
    <section className={css.archiveSection}>
      <Wrap>
        <ul className={css.grid}>
          {itemCards}
        </ul>
      </Wrap>
    </section>
  )
}

class PageTemplate extends React.Component {
  
  render() {
    const {
      contentfulPage,
      allContentfulFoodCategory
    } = this.props.data

    const foodCategories = allContentfulFoodCategory.edges.map(cat => {
      return cat.node
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
        <CategoriesSection items={foodCategories}/>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query foodPageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      ...pageFields
      layout {
        ...markdown
      }
    }
    allContentfulFoodCategory {
      edges {
        node {
          name
          id
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
          featuredImage {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`
