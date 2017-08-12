import React from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Switch, Route, RedirectWithStatus,  BrowserRouter as Router } from 'react-router-dom'
import { HomePage, MessagePage, AboutPage, BlogPage, ProjectsPage } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'
import BlogOne from './pages/blogs/blogone'
import BlogTwo from './pages/blogs/blogtwo'


import createHistory from 'history/createBrowserHistory'

const history = createHistory()



injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Route path="/" component={BlogOne} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/about" component={AboutPage} exact />
          <Route path="/message" component={MessagePage} exact />
          <Route path="/projects" component={ProjectsPage} exact />
          <Route path="/blogone" component={BlogOne} exact />
          <Route path="/blogtwo" component={BlogTwo} exact />
          <Route path="/blog" component={BlogPage} exact />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
