import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const shortcodes = { Link };

const PostLayout = ({ children }) => (
  <MDXProvider components={shortcodes}>
    <Layout>
      <SEO title="Page two" />
      {children}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  </MDXProvider>
);

PostLayout.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PostLayout;
