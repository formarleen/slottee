import React from "react";
import {
  Icon,
  Button,
  Image,
  Form,
  Transition,
  Modal,
} from "semantic-ui-react";
import "./styles.scss";

class Caesar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      shift: 0,
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
    const { text, shift } = this.state;
    this.caesarCipher(text, shift);
    this.openModal(1);
  };
  openModal = (num) => {
    if (num === 1) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.setState({ visible2: !this.state.visible2 });
    }
  };
  onClickDecode = () => {
    const { ciphertext, shift } = this.state;
    this.caesarDecipher(ciphertext, shift);
    this.openModal(2);
  };
  caesarCipher = (text, shift) => {
    // Check if the shift is negative and convert it to a positive value
    shift = ((shift % 26) + 26) % 26;

    // Regular expression to match alphabetic characters (case-insensitive)
    const regex = /[a-zA-Z]/g;

    // Function to shift a single character by the specified number of positions
    function shiftChar(char) {
      const isUpperCase = char === char.toUpperCase();
      const charCode = char.charCodeAt(0);
      let shiftedCharCode = charCode;

      // Shift uppercase letters (A: 65, Z: 90)
      if (charCode >= 65 && charCode <= 90) {
        shiftedCharCode = ((charCode - 65 + shift) % 26) + 65;
      }

      // Shift lowercase letters (a: 97, z: 122)
      if (charCode >= 97 && charCode <= 122) {
        shiftedCharCode = ((charCode - 97 + shift) % 26) + 97;
      }

      return String.fromCharCode(shiftedCharCode);
    }

    // Encrypt the text by shifting each alphabetic character
    const encryptedText = text.replace(regex, shiftChar);
    this.setState({ ciphertext: encryptedText });
    return encryptedText;
  };
  caesarDecipher = (ciphertext, shift) => {
    shift = -(((shift % 26) + 26) % 26);

    const regex = /[a-zA-Z]/g;

    function shiftChar(char) {
      const isUpperCase = char === char.toUpperCase();
      const charCode = char.charCodeAt(0);
      let shiftedCharCode = charCode;

      if (charCode >= 65 && charCode <= 90) {
        shiftedCharCode = ((charCode - 65 + shift) % 26) + 65;
      }

      if (charCode >= 97 && charCode <= 122) {
        shiftedCharCode = ((charCode - 97 + shift) % 26) + 97;
      }

      return String.fromCharCode(shiftedCharCode);
    }

    const decryptedText = ciphertext.replace(regex, shiftChar);
    this.setState({ deciphertext: decryptedText });
    console.log(decryptedText);
    return decryptedText;
  };
  closeModal = (num) => {
    if (num === 1) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.setState({ visible2: !this.state.visible2 });
    }
  };
  render() {
    const { text, shift, ciphertext, deciphertext, visible, visible2 } =
      this.state;
    console.log(visible2);

    return (
      <React.Fragment>
        <div>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="plain text"
              placeholder="plain text"
              value={text}
              name="text"
              onChange={this.onChange}
            />
            <Form.Input
              fluid
              label="shift"
              placeholder="shift"
              value={shift}
              name="shift"
              onChange={this.onChange}
              type="number"
              min={1}
              max={6}
            />
            <div className="caesar">
              <Button
                className="ui button"
                onClick={this.onClick}
                disabled={!text || shift < 1}
                color="blue"
              >
                Encode
              </Button>
              <Button
                className="ui button"
                onClick={this.onClickDecode}
                disabled={!ciphertext}
              >
                Decode
              </Button>
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

export default Caesar;
