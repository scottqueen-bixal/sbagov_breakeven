import React from "react";
import { Icons } from "../../atoms/index";
import "./header.less";
import { Image, Divider, Grid, Icon } from "semantic-ui-react";

const Header = () => (
  <header className="bec-header">
    <Grid columns={1}>
      <Grid.Column textAlign="left">
        <Image alt="Small Business Administration" href="/">
          <Icons.SBALogoWithText />
        </Image>
        <Divider />
        <a className="return-link" href="/breakevenpointcalculator">
          <Icon name="angle left" />
          Return to break-even page
        </a>
      </Grid.Column>
    </Grid>
  </header>
);

export default Header;
