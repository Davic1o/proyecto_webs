// AppLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './AppLayout.css';

class AppLayout extends React.Component {
  render() {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default AppLayout;
