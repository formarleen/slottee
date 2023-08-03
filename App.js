import React from "react";
import Caesar from "./caesar";
import Double from "./Columnar";
import Start from "./start";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }
  toggleVisibility = () => {
    visible: true, this.setState({ visible: !visible });
  };
  render() {
    const { visible } = this.state;

    return (
      <React.Fragment>
        <div>
          {/* <Double /> */}
          <Start />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
