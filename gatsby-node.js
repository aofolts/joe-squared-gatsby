const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const createPages = new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/template-page.js')
    const homePageTemplate = path.resolve('./src/pages/index.js')
    const foodPageTemplate = path.resolve('./src/templates/template-page-food.js')

    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPage.edges
        
        posts.forEach(post => {
          let slug       = post.node.slug,
              component  = ''

          switch (post.node.slug) {
            case 'home': 
              component = pageTemplate;
              slug      = '/';
              break;
            case 'food':
              component = foodPageTemplate;
              break;
            default:
              component = pageTemplate;
          }

          createPage({
            path: slug === '/' ? '/' : `/${post.node.slug}/`,
            component,
            context: {
              slug
            }
          })
        })
      })
    )
  })

  const foodCategoryArchives = new Promise((resolve, reject) => {
    const foodArchiveTemplate = path.resolve('./src/templates/archive-food-category.js')

    resolve(
      graphql(
        `
          {
            allContentfulFoodCategory {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulFoodCategory.edges
        
        posts.forEach(post => {
          const {slug} = post.node

          createPage({
            path: `/food/${post.node.slug}`,
            component: foodArchiveTemplate,
            context: {
              slug
            }
          })
        })
      })
    )
  })

  return Promise.all([createPages,foodCategoryArchives])
}