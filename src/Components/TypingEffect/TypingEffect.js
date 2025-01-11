import React, { Component } from "react";

class TypingEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedText: "",
    };
    this.interval = null;
  }

  componentDidMount() {
    const { text, speed } = this.props;
    let index = 0;

    this.interval = setInterval(() => {
      if (index < text.length-1) {
        this.setState((prevState) => ({
          displayedText: prevState.displayedText + text[index],
        }));
        index++;
      } else {
        clearInterval(this.interval);
      }
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="w-full max-w-lg mx-auto p-4 text-center">
        <p className={this.props.textStyle}>
          {this.state.displayedText}
        </p>
      </div>
    );
  }
}

export default TypingEffect;
