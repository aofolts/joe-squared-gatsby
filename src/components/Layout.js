import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../config'
import favicon from '../images/favicon.png'

class Layout extends Component {

  componentDidMount() {
    // Embedly
    (function(w, d){
      var id='embedly-platform', n = 'script';
      if (!d.getElementById(id)){
        w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
        var e = d.createElement(n); e.id = id; e.async=1;
        e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
        var s = d.getElementsByTagName(n)[0];
        s.parentNode.insertBefore(e, s);
      }
     })(window, document)
  }

  render() {
    const {
      title,
      seo
    } = this.props

    const description = seo.description.description

    return (
      <div id='layout'>
      <Helmet>
        <title>{seo.title || `${title} | Joe Squared | Baltimore, Maryland`}</title>
        <meta charSet="utf-8" />
        <meta name='description' content={description}/>
        <link rel='shortcut icon' type='image/png' href={favicon}/>
      </Helmet>
        <Header menu={this.props.menu} />
          {this.props.children}
        <Footer />
      </div>
    )
  }

}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  seo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string.isRequired
  })
}

Layout.defaultProps = {
  seo: {
    description: config.seo.description
  }
}

export default Layout

export function withLayout(Component) {
  return props => {
    const {
      contentfulPage
    } = props.data

    const {
      title,
      seo
    } = contentfulPage

    const meta = {
      title,
      seo: {
        ...seo,
        description: seo.description.description
      }
    }

    console.log(meta)

    return (
      <Layout {...meta}>
        <Component {...props}/>
      </Layout>
    )
  }
}