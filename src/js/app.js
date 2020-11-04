import { LitElement, html, css } from 'lit-element'
import { style } from '../css/app-style.js'

const Statuses = Object.freeze({
  WaitForResponse: "waiting-for-response",
  CountDown: "count-down",
  Pause: "pause",
  TimeIsOut: "time-is-out",
});

const setImInterval = (func, delay, ...args) => {
  func(...args);
  return setInterval(func, delay, ...args);
}

const minToMill = (mins) => { return mins * 60000 };

class Cucu extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      curTime: { type: Number },
    };
  }

  constructor() {
    super();
    this.Statuses = {
      choosingAction: "choosing-action",
    };

    this.periods = [ 15, 10, 1/10, 25, 45 ];

    this.period = minToMill(15); //min
    this.curTime = this.period;
    this.status = Statuses.WaitForResponse;
    this.sound = new Audio("../assets/sound.wav");

    this.actions = [ "Work", "Break" ];
    this.action = {
      title: "Time to work",
      name: "Work",
      oppsiteName: "Break",
      action: '',
      id: 0
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.drawCurrentStatus()}
      </div>
    `;
  }

  drawCurrentStatus() {
    switch (this.status) {
      case Statuses.WaitForResponse:
        return this.chooseAction();
      case Statuses.CountDown:
        return this.doCountDown();
      case Statuses.TimeIsOut:
        return this.timeOut();
      default:
        return html`<div>Hi</div>`;
    }
  }

  timeOut() {
    return html`
      <div id="time">00:00</div>
      <div class='title'>Time is up</div>
      <button id="btn-time-out" @click=${this.resetTimer}>Reset</button>
    `;
  }

  chooseAction() {
    return html`
      <div class="action-title">${this.action.title}</div>
      <div class="period-chooser">
        ${this.periods.map(period => html`
          <div class="period" @click=${() => this.commitAction(period)}
          >${period}</div>
        `)}
        <div class="period break" @click=${this.switchAction}
          >${this.action.oppsiteName}</div>
      </div>
    `;
  }

  doCountDown() {
    return html`
      <div class='count-down-title'>${this.action.title}</div>
      <div id="time">${this.showTime(this.curTime)}</div>
      ${this.action.actions.map(action => html`
        <button id=${action.name} @click=${action.action}>${action.name}</button>
      `)}
    `;
  }

  switchAction() {
    if (this.action.id === 0) { //work
      this.action.title = "Take a break";
      this.action.name = "Break";
      this.action.oppsiteName = "Work";
      this.action.id = 1;
    }
    else {
      this.action.title = "Time to work";
      this.action.name = "Work";
      this.action.oppsiteName = "Break";
      this.action.id = 0;
    }
    this.requestUpdate();
  }


  commitAction(period) {
    this.action.actions = [
      { name: "Pause", action: this.pauseTimer },
      { name: "Reset", action: this.resetTimer },
    ];
    if (this.action.id === 0) //work 
      this.action.title = "Keep working";
    else
      this.action.title = "Relax a bit";
    this.startTimer(minToMill(period));
  }

  countDown() {
    this.curTime = this.endTime - Date.now();
    if (this.curTime <= 0)
      this.timeIsOut();
    document.title = this.showTime(this.curTime);
  }

  startTimer(period) {
    this.endTime = new Date().getTime() + period;
    this.timer = setImInterval(() => this.countDown(), 1000);
    this.status = Statuses.CountDown;
  }

  timeIsOut() {
    this.curTime = 0;
    this.status = Statuses.TimeIsOut;
    clearTimeout(this.timer);
    this.timer = setImInterval(() => this.sound.play(), 1000);
    document.title = "Cucu";
  }

  resetTimer() {
    this.curTime = this.period;
    clearTimeout(this.timer);
    this.status = Statuses.WaitForResponse;
    document.title = "Cucu";


    this.action.title = "Time to work";
  }

  pauseTimer() {
    this.pauseTime = Date.now();
    clearTimeout(this.timer);
    document.title = "Paused";
    //this.status = Statuses.Pause;

    this.action.actions[0] = { name: "Resume", action: this.resumeTimer };
    this.action.oldTitle = this.action.title;
    this.action.title = "Paused";
    this.requestUpdate()
  }

  resumeTimer() {
    this.endTime += (Date.now() - this.pauseTime);
    this.timer = setImInterval(() => this.countDown(), 1000);
    //this.status = Statuses.CountDown;

    this.action.actions[0] = { name: "Pause", action: this.pauseTimer };
    this.action.title = this.action.oldTitle;
    this.requestUpdate()
  }

  showTime(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    let format = minutes < 10 ? '0' + minutes : minutes;
    format += ':' + (seconds < 10 ? '0' : '') + seconds;
    return format;
  }
}

customElements.define('cu-cu', Cucu); 
