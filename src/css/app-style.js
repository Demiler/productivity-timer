import { css } from 'lit-element'

export const style = css`

:host {
  display: block;
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
  color: white;
  padding: 10px;

  align-items: center;
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
  margin-bottom: 20px;
}

#time.time-is-out {
  color: #cc1233;
}

button {
  display: block;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  outline: none;

  background-color: transparent;
  color: #eee;
  margin-bottom: 10px;
  cursor: pointer;

  transition: .2s;
}

button:hover {
  filter: brightness(1.2) hue-rotate(10deg);
}

.action-title {
  margin-bottom: 50px;
}

.period-chooser {
  width: 500px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.period {
  background-color: #424294;
  border-radius: 50%;
  border: 5px solid #3b3a76;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: transform .2s;
  user-select: none;
}

.period:hover {
  transform: scale(1.2);
}

#btn-time-out {
  background-color: #1e5982;
  padding: 10px;
  width: 50%;
  font-size: 30px;
  margin-top: 30px;
}

.count-down-title {
  margin-bottom: 20px;
  filter: brightness(.5);
}

#btn-install {
  background-color: #33a0d0;
  border: none;
  color: #222;
  border-radius: 5px;
  width: 80px;
  height: 30px;

  margin: 0;
  padding: 0;

  position: absolute;
  bottom: 5px;
  left: 5px;
  display: block;
}

`;
