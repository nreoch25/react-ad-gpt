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
    console.log("MOUNT", this.props);
    if(this.state.gptEnabled === true && this.state.initialLoad === false) {
      console.log("MOUNT - INJECT AD FOR:", this.props.hierarchy);
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
  shouldComponentUpdate(nextProps, nextState) {
    console.log("SHOULD", this.props, nextProps);
    if(this.props.hierarchy !== nextProps.hierarchy) {
      console.log("SHOULD - INJECT AD FOR:", nextProps.hierarchy);
      gptManager.injectDisplayAd(nextProps, this);
      return false;
    }
    return true;
  }
  checkGPT() {
    console.log("CHECK");
    console.log(this.state);
    if(this.state.gptEnabled === true && this.state.initialLoad === true) {
      console.log("CHECK - ONLY FOR INITIAL LOAD - INJECT AD FOR:", this.props.hierarchy);
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
