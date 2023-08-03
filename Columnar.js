import React from "react";
import {
  Icon,
  Button,
  Image,
  Form,
  Transition,
  Modal,
} from "semantic-ui-react";

class Columnar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      keyword: "",
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
    const { text, keyword } = this.state;
    this.vigenereEncrypt(text, keyword);
    this.openModal(1);
  };
  onClickDecode = () => {
    const { ciphertext, keyword } = this.state;
    this.vigenereDecrypt(ciphertext, keyword);
    this.openModal(2);
  };
  openModal = (num) => {
    if (num === 1) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.setState({ visible2: !this.state.visible2 });
    }
  };
  vigenereEncrypt = (plaintext, keyword) => {
    plaintext = plaintext.replace(/[^A-Za-z]/g, "").toUpperCase();
    keyword = keyword.toUpperCase();

    let ciphertext = "";
    for (let i = 0, j = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      const keyChar = keyword[j % keyword.length];

      if (char >= "A" && char <= "Z") {
        const shift = keyChar.charCodeAt(0) - "A".charCodeAt(0);
        const encryptedChar = String.fromCharCode(
          ((char.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26) +
            "A".charCodeAt(0)
        );
        ciphertext += encryptedChar;
        j++;
      }
    }
    this.setState({ ciphertext: ciphertext });
    return ciphertext;
  };

  vigenereDecrypt = (ciphertext, keyword) => {
    ciphertext = ciphertext.replace(/[^A-Za-z]/g, "").toUpperCase();
    keyword = keyword.toUpperCase();

    let plaintext = "";
    for (let i = 0, j = 0; i < ciphertext.length; i++) {
      const char = ciphertext[i];
      const keyChar = keyword[j % keyword.length];

      if (char >= "A" && char <= "Z") {
        const shift = keyChar.charCodeAt(0) - "A".charCodeAt(0);
        const decryptedChar = String.fromCharCode(
          ((char.charCodeAt(0) - "A".charCodeAt(0) - shift + 26) % 26) +
            "A".charCodeAt(0)
        );
        plaintext += decryptedChar;
        j++;
      }
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
    const { text, keyword, ciphertext, deciphertext, visible, visible2 } =
      this.state;
    console.log(ciphertext);
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
              label="keyword"
              placeholder="enter keyword"
              value={keyword}
              name="keyword"
              onChange={this.onChange}
            />
            <div className="caesar">
              <Button
                className="ui button"
                onClick={this.onClick}
                disabled={!text || !keyword}
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

export default Columnar;
