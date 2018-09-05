import {Link} from 'gatsby'
import WpImage from '../parts/WpImage'

const MenuMarqueeCard = props => {
  const post = props.post

  return (
    <Link href={`/${props.slug}`} key={post.id}>
      <a className='card-menu-marquee'>
        <WpImage className='background' data={post.featured_image} size='medium' />
        <h3 className='title'>{post.name}</h3>
      </a>
    </Link>
  )
}


export default MenuMarqueeCard