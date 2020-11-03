import { LitElement, html, css } from 'lit-element'

const Statuses = Object.freeze({
  WaitForResponse: "waiting-for-response",
  CountDown: "count-down",
  Pause: "pause",
  TimeIsOut: "time-is-out",
});

const minToMill = (mins) => { return mins * 60000 };

class Cucu extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        width: 500px;
        height: 500px;
        color: white;
        padding: 10px;

        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;

        padding-top: 120px;
        padding-bottom: 120px;
        box-sizing: border-box;

        font-size: 30px;
        border-radius: 10px;
      }

      #time {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #time.time-is-out {
        color: #cc1233;
      }

      button {
        display: block;
        border: none;
        border-radius: 5px;
        font-size: inherit;
        outline: none;

        padding: 10px;
        width: 80%;

        background-color: #3a50a1;
        color: #eee;
        margin-bottom: 10px;

        transition: .2s;
      }

      button:hover {
        filter: brightness(1.2) hue-rotate(10deg);
      }
    `;
  }

  static get properties() {
    return {
      curTime: { type: Number },
    };
  }

  constructor() {
    super();
    this.period = minToMill(1/10); //min
    this.curTime = this.period;
    this.status = Statuses.WaitForResponse;

    this.actions = [ "Start", "Nothing" ];
  }

  render() {
    return html`
      <div id="time" class="${this.status}">${this.showTime(this.curTime)}</div>
      <button id="action1" @click=${() => this.playAction(this.actions[0])}>
        ${this.actions[0]}</button>
      <button id="action2" @click=${() => this.playAction(this.actions[1])}>
        ${this.actions[1]}</button>
    `;
  }

  countDown() {
    let now = new Date().getTime();
    this.curTime = this.endTime - now;
    if (this.curTime <= 0)
      this.timeIsOut();
  }

  startTimer() {
    this.actions = [ "Reset", "Pause" ];
    this.endTime = new Date().getTime() + this.period;
    this.timer = setInterval(() => this.countDown(), 1000);
    this.status = Statuses.CountDown;
  }

  timeIsOut() {
    this.curTime = 0;
    this.status = Statuses.TimeIsOut;
    //this.resetTimer();
  }

  resetTimer() {
    this.actions = [ "Start", "Nothing" ];
    this.curTime = this.period;
    clearTimeout(this.timer);
    this.status = Statuses.WaitForResponse;
  }

  pauseTimer() {
    this.actions = [ "Reset", "Resume" ];
    this.pauseTime = new Date().getTime();
    clearTimeout(this.timer);
    this.status = Statuses.Pause;
  }

  resumeTimer() {
    this.actions = [ "Reset", "Pause" ];
    let now = new Date().getTime();
    this.endTime += (now - this.pauseTime);
    this.timer = setInterval(() => this.countDown(), 1000);
    this.status = Statuses.CountDown;
  }

  playAction(action) {
    switch (action) {
      case "Start": this.startTimer(); break;
      case "Reset": this.resetTimer(); break;
      case "Pause": this.pauseTimer(); break;
      case "Resume": this.resumeTimer(); break;
    }
    this.requestUpdate();
  }

  showTime(mils) {
    let mins = Math.floor(mils / 60000);
    let secs = Math.floor((mils / 1000) % 60);

    let ret = "";
    if (mins < 10) ret += "0";
    ret += mins + ':';
    if (secs < 10) ret += "0";
    ret += secs;

    return ret;
  }
}

customElements.define('cu-cu', Cucu); 
