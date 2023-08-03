import React from "react";
import {
  Icon,
  Button,
  Modal,
  Header,
  Grid,
  Segment,
  Transition,
} from "semantic-ui-react";
import Caesar from "./caesar";
import "./styles.scss";
import Columnar from "./Columnar";
import Reil from "./reil";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.props;

    return (
      <React.Fragment>
        <div className="menu">
          <Transition visible={visible} animation="scale" duration={500}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <center>
                    <h1>Caesar</h1>{" "}
                  </center>
                  <Segment>
                    <Caesar />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <center>
                    <h1>Vigenere</h1>{" "}
                  </center>
                  <Segment>
                    <Columnar />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <center>
                    <h1>Rail fence</h1>{" "}
                  </center>
                  <Segment>
                    <Reil />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <center>
                    <h1>Data Table</h1>{" "}
                  </center>
                  <Segment>
                    Vigenere cipher ใช้ keyword นำมาเรียงต่อกันให้เท่ากับ text
                    แล้วนำมาถอดรหัศทั้งสองเป็นตัวเลขแล้วนำมา
                    บวกกันและนำเลขที่ได้มาเทียบตารางตัวอักษร{" "}
                  </Segment>
                  <Segment>
                    Caesar cipher เข้ารหัศด้วยการเลื่อนตำแหน่งตัวอักษรตาม shift
                    ที่ได้รับ
                  </Segment>
                  <Segment>
                    rail fence cipher เข้ารหัศด้วยการนำ text
                    มาเขียนตามแนวทะแยงจากโดยจำนวนแถวจะตามที่เรากำหนด
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <></>
            </Grid>
          </Transition>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
