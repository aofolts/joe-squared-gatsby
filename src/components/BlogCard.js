import css from '../less/blogCard.module.less'
import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

const BlogCard = props => {
  const {post} = props

  const {featuredImage,category,body} = post

  return (
    <Link to={`/community/${post.slug}`}>
      <article key={post.id} className={css.card}>
        <div className={css.media}>
          <Image 
            sizes={featuredImage.sizes}
            outerWrapperClassName={'mediaBackground'}
          />
        </div>
        <div className={css.content}>
          <div className={css.category}>{category.name}</div>
          <h3 className={css.title}>{post.title}</h3>
          <p className={css.excerpt}>
            {body.childMarkdownRemark.excerpt}...<br/>
          </p>
          <p className={css.readMore}>Read More</p>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard