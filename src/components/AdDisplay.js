import React, { Component, PropTypes } from "react";
import { gptDisplay } from "../utils/gptDisplay";

class AdDisplay extends Component {
  componentDidMount() {
    // avoid global lookups
    this.win = window;
    this.displayAd();
  }
  displayAd() {
    let containerID = `${this.props.type}-${Math.floor((Math.random() * 1000000) + 1)}`;
    let adContainer = this.refs.advertisement;
    adContainer.setAttribute("id", containerID);
    adContainer.className = `advertisement ${this.props.type}`;
    // display the ad
    this.win.googletag.cmd.push(() => {
      gptDisplay.defineDisplay({
        type: this.props.type,
        hierarchy: this.props.hierarchy,
        container: containerID
      });
    });
  }
  render() {
    return (
      <div ref="advertisement"></div>
    );
  }
}

AdDisplay.propTypes = {};
AdDisplay.defaultProps = {

};

export default AdDisplay;
