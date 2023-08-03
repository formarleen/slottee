import React from "react";
import {
  Icon,
  Button,
  Image,
  Form,
  Transition,
  Modal,
} from "semantic-ui-react";

class Reil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      rail: 0,
      ciphertext: "",
      deciphertext: "",
      visible: false,
      visible2: false,
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onClick = () => {
    const { text, rail } = this.state;
    this.railFenceEncrypt(text, rail);

    this.openModal(1);
  };
  onClickDecode = () => {
    const { ciphertext, rail } = this.state;
    this.railFenceDecrypt(ciphertext, rail);
    this.openModal(2);
  };
  openModal = (num) => {
    if (num === 1) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.setState({ visible2: !this.state.visible2 });
    }
  };
  railFenceEncrypt = (plaintext, rails) => {
    if (rails < 2) {
      return plaintext;
    }

    const fence = new Array(rails).fill("");
    let rail = 0;
    let direction = 1;

    for (let i = 0; i < plaintext.length; i++) {
      fence[rail] += plaintext[i];

      if (rail === 0) {
        direction = 1;
      } else if (rail === rails - 1) {
        direction = -1;
      }

      rail += direction;
    }

    const ciphertext2 = fence.join("");

    const cleanCiphertext = ciphertext2.replace(/undefined/g, "");
    this.setState({ ciphertext: cleanCiphertext });
    return cleanCiphertext;
  };

  railFenceDecrypt = (ciphertext, rails) => {
    if (rails < 2) {
      return ciphertext;
    }

    const fence = new Array(rails).fill("");
    const fenceIndexes = new Array(rails).fill(0);
    let rail = 0;
    let direction = 1;

    for (let i = 0; i < ciphertext.length; i++) {
      fence[rail] += "x";

      if (rail === 0) {
        direction = 1;
      } else if (rail === rails - 1) {
        direction = -1;
      }

      rail += direction;
    }

    let currentIndex = 0;
    for (let i = 0; i < rails; i++) {
      let fenceIndex = fenceIndexes[i];
      while (fence[fenceIndex] === "x") {
        fence[fenceIndex] = ciphertext[currentIndex];
        currentIndex++;
        fenceIndex++;
      }
      fenceIndexes[i] = fenceIndex;
    }

    let plaintext = "";
    rail = 0;
    direction = 1;
    for (let i = 0; i < ciphertext.length; i++) {
      plaintext += fence[rail][0];
      fence[rail] = fence[rail].substring(1);

      if (rail === 0) {
        direction = 1;
      } else if (rail === rails - 1) {
        direction = -1;
      }

      rail += direction;
    }
    this.setState({ deciphertext: plaintext });
    return plaintext;
  };

  closeModal = (num) => {
    if (num === 1) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.setState({ visible2: !this.state.visible2 });
    }
  };
  render() {
    const { text, ciphertext, deciphertext, visible, visible2, rail } =
      this.state;

    return (
      <React.Fragment>
        <div>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="plain text"
              placeholder="enter plain text"
              value={text}
              name="text"
              onChange={this.onChange}
            />
            <Form.Input
              fluid
              label="rail"
              placeholder="enter rail"
              value={rail}
              name="rail"
              onChange={this.onChange}
              type="number"
            />
            <div className="caesar">
              <Button
                className="ui button"
                onClick={this.onClick}
                disabled={!text || !rail}
                color="blue"
              >
                Encode
              </Button>
              {/* <Button
                className="ui button"
                onClick={this.onClickDecode}
                disabled={!ciphertext}
              >
                Decode
              </Button> */}
            </div>
          </Form.Group>
          <Modal
            open={visible}
            header="Encode Successfully!"
            content={ciphertext}
            actions={[
              <Button
                content="close"
                color="red"
                onClick={() => this.closeModal(1)}
              />,
            ]}
          />
          <Modal
            open={visible2}
            header="Decode successfully!"
            content={deciphertext}
            actions={[
              <Button
                content="close"
                color="red"
                onClick={() => this.closeModal(2)}
              />,
            ]}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Reil;
