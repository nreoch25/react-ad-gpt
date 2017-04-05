import React, { Component, PropTypes } from "react";
import { gptEmitter } from "../utils/gptEventEmitter";
import { gptManager } from "../utils/gptManager";

class AdGPT extends Component {
  constructor(props) {
    super(props);
    this.state = { "gptEnabled" : false };
    this.initialLoad = true;
  }
  componentWillMount() {
    gptEmitter.on("gptEnabled", () => {
      this.setState({ "gptEnabled" : true });
    });
  }
  shouldComponentUpdate(nextProps) {
    if(this.initialLoad === true) {
      this.initialLoad = false;
      return true;
    }
    if(nextProps.hierarchy !== this.props.hierarchy) {
      return true;
    }
    return false;
  }
  checkGPT() {
    if(this.state.gptEnabled === true) {
      console.log("here");
      gptManager.injectDisplayAd(this.props, this);
    }
  }
  render() {
    console.log("RENDER", this.props);
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
