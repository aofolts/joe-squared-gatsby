import React from 'react';
import css from '../less/gallery.module.less'
import Wrap from '../components/Wrap'
import Image from 'gatsby-image'

const GalleryContent = props => {
  const {layout} = props

  const {
    photos
  } = layout

  const photoCards = photos.map(photo => {
    const {
      id,
      title,
      sizes
    } = photo
    
    return (
      <div key={id} className={css.item}>
        <Image 
          title={title}
          alet={title}
          sizes={sizes}
          outerWrapperClassName={'mediaBackground'}
          className={css.imageWrap}
        />
      </div>
    )
  })

  return (
    <Wrap>
      <div className={css.grid}>
        {photoCards}
      </div>
    </Wrap>
  )
}

export default GalleryContent