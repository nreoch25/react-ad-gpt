import React from "react";
import ReactDOM from "react-dom";
import AdDisplay from "../components/AdDisplay";

export class gptManager {
  static injectDisplayAd(adProps, reference) {
    let adNode = ReactDOM.findDOMNode(reference);
    ReactDOM.unmountComponentAtNode(adNode);
    ReactDOM.render(<AdDisplay {...adProps} />, adNode);
  }
}
