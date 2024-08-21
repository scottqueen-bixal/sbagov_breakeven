import React from "react";
import { Icons } from "../../atoms";
import { Image, Grid } from "semantic-ui-react";

import "./footer.less";

const Footer = () => (
  <footer className="becFooter">
    <Grid className="footer" columns={1}>
      <Grid.Column textAlign="center">
        <div className="footer-divider"></div>
        <Image
          className="footer-logo"
          href="/"
          size="tiny"
          alt="Small Business Administration"
          centered
        >
          <Icons.SBALogo />
        </Image>
        U.S. Small Business Administration | 409 3rd St, SW. Washington DC 20416
      </Grid.Column>
    </Grid>
  </footer>
);

export default Footer;
