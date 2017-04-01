import React, { Component, PropTypes } from "react";
import { gptEmitter } from "../utils/gptEventEmitter";
import { gptManager } from "../utils/gptManager";

class AdGPT extends Component {
  constructor(props) {
    super(props);
    this.state = { "gptEnabled" : false };
  }
  componentWillMount() {
    gptEmitter.on("gptEnabled", () => {
      this.setState({ "gptEnabled" : true });
    });
  }
  checkGPT() {
    if(this.state.gptEnabled === true) {
      gptManager.injectDisplayAd(this.props, this);
    }
  }
  render() {
    return (
      <div>
        <h3>React Ad GPT Package</h3>
        { this.checkGPT() }
      </div>
    );
  }
}

AdGPT.propTypes = {
  type: PropTypes.string.isRequired,
  hierarchy: PropTypes.string.isRequired,
  targeting: PropTypes.object
}

AdGPT.defaultProps = {
  targeting: null
}

export default AdGPT;
