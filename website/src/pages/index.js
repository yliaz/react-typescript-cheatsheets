import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import Layout from "@theme/Layout";

import Translate, { translate } from "@docusaurus/Translate";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="React TypeScript Cheatsheets"
      permalink="/"
      description="React TypeScript Cheatsheets"
    >
      <div className="hero text--center">
        <div className="container ">
          <div className="padding-vert--md">
            <h1 className="hero__title">
              <Translate
                id="homepage.siteTitle"
                values={{
                  siteTitle: <>{siteConfig.title}</>,
                }}
              >
                {"{siteTitle}"}
              </Translate>
            </h1>
            <p className="hero__subtitle">
              <Translate
                id="homepage.siteTagLine"
                values={{
                  siteTagLine: <>{siteConfig.tagline}</>,
                }}
              >
                {"{siteTagLine}"}
              </Translate>
            </p>
          </div>
          <div className="homePageBtns">
            <Link
              to={useBaseUrl(siteConfig.customFields.firstDoc)}
              className="button button--lg button--outline button--primary"
            >
              <Translate>Getting started</Translate>
            </Link>
            <Link
              to={"https://discord.gg/wTGS5z9"}
              className="button button--lg button--outline button--secondary"
            >
              <Translate>Join Official Discord</Translate>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
