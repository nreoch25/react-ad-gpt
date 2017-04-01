export class gptDisplay {
  static initGPTDisplay() {
    //avoid global lookups
    this.win = window;
    // init sizes
    this.gptSizes = {
      "leaderboard": [[728, 90]]
    };
    console.log(this.gptSizes);
  }
}
