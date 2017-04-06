import React, { Component, PropTypes } from "react";
import { gptEmitter } from "../utils/gptEventEmitter";
import { gptManager } from "../utils/gptManager";

let state = { "gptEnabled" : false, "initialLoad": true };

class AdGPT extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }
  componentDidMount() {
    if(this.state.gptEnabled === true && this.state.initialLoad === false) {
      gptManager.injectDisplayAd(this.props, this);
    }
  }
  componentWillMount() {
    if(this.state.gptEnabled === false) {
      gptEmitter.on("gptEnabled", () => {
        console.log("GPT ENABLED");
        this.setState({ "gptEnabled" : true });
      });
    }
  }
  componentWillUnmount() {
    state = this.state;
  }
  shouldComponentUpdate() {
    console.log("SHOULD");
    return true;
  }
  checkGPT() {
    console.log("CHECK");
    console.log(this.state);
    if(this.state.gptEnabled === true && this.state.initialLoad === true) {
      console.log("INJECT");
      if(this.state.initialLoad === true) { this.state.initialLoad = false; }
      gptManager.injectDisplayAd(this.props, this);
    }
  }
  render() {
    console.log("RENDER");
    const classTitle = `ad-${this.props.type}`;
    this.checkGPT();
    return (
      <div className={classTitle}></div>
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
