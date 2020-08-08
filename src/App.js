import PropTypes from 'prop-types';
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Content from './ComponentMain/AppContent';
import Footer from './ComponentMain/AppFooter';
import DesktopContainer from './ComponentMain/DesktopContainer';
import MobileContainer from './ComponentMain/MobileContainer';

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}
const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const App= () => (
  <BrowserRouter>
      <ResponsiveContainer>
         <Content/>
         <Footer/>
      </ResponsiveContainer>
  </BrowserRouter>


)

export default App