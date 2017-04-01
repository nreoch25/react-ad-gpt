export class gptInitialize {
  static initGPTObject() {
    this.win.googletag = this.win.googletag || {};
    this.win.googletag.cmd = this.win.googletag.cmd || [];
  }
  static loadGPTScript() {
    let gptScript = this.doc.createElement("script");
    gptScript.async = true;
    gptScript.onload = this.initGPTConfiguration();
    gptScript.onerror = () => {
      //set gpt state to false
      console.log("GPT Script error");
    }
    gptScript.type = "text/javascript";
    let useSSL = "https:" === this.doc.location.protocol;
    gptScript.src = (useSSL ? "https:" : "http:") + this.gptURL;
    let head = this.doc.getElementsByTagName("head")[0];
    head.appendChild(gptScript);
  }
  static initGPTConfiguration() {
    this.win.googletag.cmd.push(() => {
      //set gpt rules
      this.win.googletag.companionAds().setRefreshUnfilledSlots(true);
      this.win.googletag.pubads().collapseEmptyDivs(true);
      this.win.googletag.pubads().disableInitialLoad();
      this.win.googletag.pubads().enableAsyncRendering();
      this.win.googletag.pubads().enableVideoAds();
      this.win.googletag.enableServices();

      // TODO set state for AdGPT components

    });
  }
  static initGPT() {
    // avoid global lookups
    this.win = window;
    this.doc = document;

    // gpt url
    this.gptURL = "//www.googletagservices.com/tag/js/gpt.js";

    // inititiate GPT object
    this.initGPTObject();

    // load GPT script
    this.loadGPTScript();
  }
}
