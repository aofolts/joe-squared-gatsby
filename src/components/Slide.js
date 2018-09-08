import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import css from '../less/slide.module.less'

const Buttons = ({buttons}) => {
  const buttonElements = buttons.map((button,i) => {
    const {
      label,
      pageLink,
      externalLink
    } = button

    const buttonClasses = [
      css.button,
      css[`button${i + 1}`],
      'primaryButton'
    ].join(' ')

    const buttonLink = () => {
      if (externalLink) return externalLink
      if (pageLink) return pageLink.slug
      else return null
    }

    return (
      <Link key={label} className={buttonClasses} to={buttonLink()}>
        {label}
      </Link>
    )
  })

  return (
    <div className={css.buttons}>
      {buttonElements}
    </div>
  )
}

const Slide = ({slide,slideState}) => {
  const {
    image,
    headline,
    buttons
  } = slide

  const imageEl = (
    <Image 
      outerWrapperClassName={css.slideBackground} 
      className={'mediaBackground'}
      sizes={image.sizes}
      alt={image.title}
    />
  )

  const slideClasses = [
    css.slide,
    css[`${slideState}Slide`],
    slideState
  ].join(' ')

  return (
    <div className={slideClasses} key={slide.id}>
      {imageEl}
      <div className={css.slideContent}>
        <h2 className={css.slideHeadline}>{headline}</h2>
        <Buttons buttons={buttons} />
      </div>
    </div>
  )
}

export default Slide

