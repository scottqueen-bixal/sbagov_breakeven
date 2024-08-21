import React from "react";
import { Icons } from "../../atoms";
import { Image, Divider, Grid } from "semantic-ui-react";

import "./header.less";

const Header = () => (
  <header className="bec-header">
    <Grid columns={1}>
      <Grid.Column textAlign="left">
        <Image alt="Small Business Administration" href="/">
          <Icons.SBALogoWithText />
        </Image>
        <Divider />
        <a className="return-link" href="/breakevenpointcalculator">
          <i aria-hidden="true" className="icon">
            <Icons.AngleLeft />
          </i>
          Return to break-even page
        </a>
      </Grid.Column>
    </Grid>
  </header>
);

export default Header;
