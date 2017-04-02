export class gptDisplay {
  static defineDisplay(adObject) {
    const { type, hierarchy, container } = adObject;
    // declare ad slot
    let slot;
    // define ad slot
    if(type === "outofpage") {
      slot = this.win.googletag.defineOutOfPageSlot(hierarchy, container)
        .addService(this.win.googletag.pubads());
    } else {
      slot = this.win.googletag.defineSlot(hierarchy, this.gptSizes[type], container)
        .addService(this.win.googletag.pubads());
    }
    // display ad
    this.win.googletag.display(container);
    this.win.googletag.pubads().refresh([slot], { changeCorrelator: false });
  }
  static initGPTDisplay() {
    //avoid global lookups
    this.win = window;
    // init sizes
    this.gptSizes = {
      "leaderboard": [[728, 90]],
      "bigbox": [[300, 250]]
    };
  }
}
