import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'

import '../less/global.less'

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
      title
    } = this.props

    return (
      <div id='layout'>
      <Helmet>
        <meta charSet="utf-8" />
         <title>Joe Squared | {title ? title : 'Home'}</title>
      </Helmet>
        <Header menu={this.props.menu} />
          {this.props.children}
        <Footer />
      </div>
    )
  }

}

export default Layout