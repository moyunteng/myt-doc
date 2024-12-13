import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.buttons_size}
            to="/docs/tutorial/contact">
            安卓教程
          </Link>  
          <Link
            className={styles.buttons_size}
            to="/docs/MYTOS/通用常规问题介绍">
            MYTOS开发教程
          </Link>  
          </div>
          <div className={styles.buttons}>
          <Link
            className={styles.buttons_size}
            to="/docs/kehuduan/PC客户端">
            客户端
          </Link>
          <Link
            className={styles.buttons_size}
            to="/docs/zeus-c1/C1 ubuntu固件">
            单路系列
          </Link>        
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`文档中心`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
