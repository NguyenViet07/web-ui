import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({children, layoutRouter}) => (
    <>
        <Header navPosition="left" className="reveal-from-bottom"
                layoutRouter={layoutRouter}
        />
        <main className="site-content">
            {children}
        </main>
        <Footer/>
    </>
);

export default LayoutDefault;
