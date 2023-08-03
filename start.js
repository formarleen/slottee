import React from "react";
import {
  Icon,
  Button,
  Modal,
  Header,
  Grid,
  Segment,
  Transition,
  icon,
} from "semantic-ui-react";
import Caesar from "./caesar";
import Menu from "./menu";
import "./styles.scss";

class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <React.Fragment>
        <div className="divi">
          <Button
            className="buttonform"
            content="เริ่มเลอ"
            onClick={this.toggleVisibility}
            centered
            size="big"
            icon="right arrow"
            labelPosition="right"
          />
        </div>
        <Menu visible={visible} />
      </React.Fragment>
    );
  }
}

export default Start;
