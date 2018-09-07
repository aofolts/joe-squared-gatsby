import React, { Component } from 'react';
import Content from '../components/Content'
import Wrap from '../components/Wrap'
import Section from '../components/Section'
import Slider from '../components/Slider'
import FeaturedTabs from '../components/FeaturedTabs'
import Video from '../components/Video'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

import css from '../less/home.module.less'

const IntroSection = props => {
  const {headline,copy,tabs} = props

  return (
    <Section name='intro' className={css.introSection}>
      <Wrap width='small'>
        <h2>{headline}</h2>
        <Content html={copy.childMarkdownRemark.html}/>
        <FeaturedTabs tabs={tabs} />
      </Wrap>
    </Section>
  )
}

const VideoSection = props => (
  <Section name='video' className={css.videoSection}>
    <Wrap width='medium'>
      <article className={css.videoContainer}>
        <Video videoUrl={props.videoUrl} className={css.video}/>
      </article>
    </Wrap>
  </Section>
)

const MenusSection = props => {
  const {headline,copy,menus} = props

  const menuItems = menus.map(menu => {
    const {id,title} = menu

    return (
      <li className={css.menuCard} key={id}>
        {title}
      </li>
    )
  })

  const menusList = (
    <ul className={css.menusList}>
      {menuItems}
    </ul>
  )

  return (
    <Section name='menus' className={css.menusSection}>
      <div className={css.menusContent}>
        <Wrap width='small'>
          <h2>{headline}</h2>
          <Content html={copy.childMarkdownRemark.html}/>
        </Wrap>
        <Wrap width='medium' className={css.menusContainer}>
          {menusList}
        </Wrap>
      </div>
    </Section>
  )
}

const BlogSection = props => {
  const {posts} = props

  const postCards = posts.map(post => (
    <BlogCard key={post.id} post={post}/>
  ))

  return (
    <Section name='community' className={css.communitySection}>
      {/* <Wrap width='small'>
        <h2>{fields.headline}</h2>
        <div className='copy' dangerouslySetInnerHTML={{__html: fields.copy}}></div>
      </Wrap> */}
      <Wrap>
        <div className={[css.communityGrid,css.thirdsGrid].join(' ')}>
          {postCards}
        </div>
      </Wrap>
    </Section>
  )
}

class Index extends Component {

  render() {
    const {
      contentfulPage,
      allContentfulBlogPost
    } = this.props.data

    const {
      layout
    } = contentfulPage

    const blogPosts = allContentfulBlogPost.edges.reduce((arr,post) => {
      arr.push(post.node)

      return arr
    },[])

    const {
      featuredMenus,
      intro,
      menusCopy,
      quickLinks,
      video,
      heroSlider: heroSlides
    } = layout[0]

    return (
      <Layout {...contentfulPage}>
        <Slider slides={heroSlides}/>
        <IntroSection {...intro} tabs={quickLinks}/>
        <VideoSection {...video}/>
        <MenusSection {...menusCopy} menus={featuredMenus}/>
        <BlogSection posts={blogPosts}/>
      </Layout>
    )
  }
}

export default Index;

export const pageQuery = graphql`
  {
    contentfulPage(slug: {eq: "home"}) {
      ...pageFields
      layout {
        ...homePageFields
      }
    }
    allContentfulBlogPost(limit: 3 sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          featuredImage {
            title
            sizes(maxWidth: 400) {
              ...GatsbyContentfulSizes
            }
          }
          category {
            id
            name
            slug
          }
          tags {
            id
            name
            slug
          }
        }
      }
    }
  }
`

export const homePageFields = graphql`
  fragment homePageFields on ContentfulLayoutHomePage {
    intro {
      headline
      copy {
        childMarkdownRemark {
          html
        }
      }
    }
    quickLinks {
      id
      title
      content {
        markdown {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    video {
      videoUrl
    }
    menusCopy {
      headline
      copy {
        childMarkdownRemark {
          html
        }
      }
    }
    featuredMenus {
      id
      title
      slug
      featuredImage {
        title
        sizes {
          srcSet
        }
      }
    }
    heroSlider {
      id
      name
      headline 
      buttons {
        name
        label
        externalLink
        pageLink {
          slug
        }
      }
      image {
        title
        sizes(maxWidth: 400) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`