import {graphql} from 'gatsby'

export const markdownContent = graphql`
  fragment markdown on ContentfulMarkdown {
    markdown {
      childMarkdownRemark {
        html
      }
    }
  }
`