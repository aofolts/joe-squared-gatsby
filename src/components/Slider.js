import Button from './Button'
import WpImage  from '../parts/WpImage' 
import css from '.../less/less/slider.less'
import {config} from '../config' 

class Slide extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      slideState: props.slideState
    }
  } 

  componentWillReceiveProps(props) {
    this.setState({
      slideState: props.slideState
    })
  }

  render() {
    const slide    = this.props.slide,
          image    = slide.featuredImage

    const imageEl = (
      <WpImage 
        className={css.slideBackground} 
        data={image} size='hero' 
        loadType='auto' 
      />
    )

    const slideClasses = [
      css.slide,
      css[`${this.state.slideState}Slide`],
      this.state.slideState
    ].join(' ')

    return (
      <div className={slideClasses} key={slide.id} title={slide.post_title.rendered}>
        {imageEl}
        <div className={css.slideContent}>
          <h2 className={css.slideHeadline}>{slide.acf.headline}</h2>
          <Buttons link='test' fields={slide.acf} />
        </div>
      </div>
    )
  }

}

const Buttons = (props) => {
  const buttons = [props.fields.button]

  if ('secondary_button' in props.fields) {
    buttons.push(props.fields.secondary_button)
  }

  return (
    <div className='buttons'>
      {buttons.map((button,i) => {
        const buttonClasses = [
          css[`button${i + 1}`],
          'primaryButton'
        ].join(' ')

        // let link = button[button.link_type]

        // console.log(link)

        // if (typeof link === 'object') {
        //   console.log(link)
        // }

        return (
          <Button 
            key={i}
            label={button.label} 
            className={buttonClasses} 
            link='test' 
          />
        )
      })}
    </div>
  )
}

export default class Slider extends React.Component {

  constructor(props) {
    super(props)

    const boundMethods = [
      'advanceSlider',
      'getNextSlideById',
      'getPreviousSlideById',
      'getSlideById',
      'getSlideByIndex',
      'getSlideElements',
      'getSlideStateById',
      'selectSlideById',
      'startLoop'
    ]

    boundMethods.forEach(method => this[method] = this[method].bind(this))

    const slidesById = this.props.slides.reduce((obj,slide,i) => {
      slide.index   = i
      obj[slide.id] = slide

      return obj
    },{})

    const slideCount = this.props.slides.length

    this.state = {
      slidesById: slidesById,
      slideCount: this.props.slides.length,
      previousSlide: slidesById[this.props.slides[slideCount -2].id],
      currentSlide: slidesById[this.props.slides[slideCount -1].id],
      nextSlide: slidesById[this.props.slides[0].id]
    }
  }

  advanceSlider() {
    const newCurrent = this.state.nextSlide

    this.setState({
      previousSlide: this.state.currentSlide,
      currentSlide: newCurrent,
      nextSlide: this.getNextSlideById(newCurrent.id)
    })
  }

  getNextSlideById(id) {
    let i = this.state.slidesById[id].index + 1

    if (i >= this.state.slideCount) {
      i = 0
    }

    return this.getSlideByIndex(i)
  }

  getPreviousSlideById(id) {
    let i = this.state.slidesById[id].index - 1

    if (i < 0) {
      i = this.state.slideCount - 1
    }

    return this.getSlideByIndex(i)
  }

  getSlideById(id) {
    return this.state.slidesById[id]
  }

  getSlideByIndex(i) {
    const id = this.props.slides[i].id
    return this.state.slidesById[id]
  }

  componentDidMount() {
    this.startLoop()
  }

  componentWillUnmount() {
    this.stopLoop()
  }
  

  getSlideElements() {
    const self = this

    return self.props.slides.map(slide => {
      const slideState = self.getSlideStateById(slide.id)

      return (
        <Slide slide={slide} key={slide.id} slideState={slideState} />
      )
    })
  }

  getSlideNav() {
    return (
      <nav className={css.nav}>
        {this.props.slides.map(slide => {
          const slideState = this.getSlideStateById(slide.id)

          const iconClasses = [
            css.navItemIcon,
            css[`${slideState}NavItemIcon`],
            slideState
          ].join(' ')

          return (
            <div key={slide.id} className={css.navItem} onClick={() => this.selectSlideById(slide.id)} title={slide.post_title.rendered}>
              <div className={iconClasses}></div>
              <div className={css.navItemTitle}>{slide.post_title.rendered}</div>
            </div>
          )
        })}
      </nav>
    )
  }

  getSlideStateById(id) {
    switch (id) {
      case this.state.previousSlide.id: return 'previous';
      case this.state.currentSlide.id: return 'current';
      default: return 'inactive';
    }
  }

  selectSlideById(id) {
    this.stopLoop()

    this.setState({
      previousSlide: this.state.currentSlide,
      currentSlide: this.getSlideById(id),
      nextSlide: this.getNextSlideById(id)
    })
  }

  startLoop() {
    this.advanceSlider()

    this.timer = setInterval(() => {
      this.advanceSlider()
    },4000);
  }

  stopLoop() {
    clearTimeout(this.timer)
  }

  render() {
    return (
      <section id='slider' className={css.slider}>
        {this.getSlideElements()}
        {this.getSlideNav()}
      </section>
    )
  }

}

