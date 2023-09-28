import { findMemberObject } from "./script.js";

function constructResult(resultData) {
  const Options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const resultObject = {
    id: resultData.id,
    memberId: resultData.memberId,
    member: findMemberObject(resultData.memberId),
    date: new Date(resultData.date).toLocaleString("da-DK", Options),
    memberId: resultData.memberId,
    discipline: resultData.discipline,
    resultType: resultData.resultType,
    _time: "00:00.00",

    set time(value) {
      // console.log(`set time value: ${value}`);
      const milliseconds = Number(value.slice(-2));
      const seconds = Number(value.slice(3, -3));
      const minutes = Number(value.slice(0, 2));

      if (minutes > 0 && seconds > 0 && milliseconds > 0) {
        this._time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      } else if (minutes <= 0 && seconds > 0 && milliseconds > 0) {
        this._time = seconds * 1000 + milliseconds;
      } else if (minutes > 0 && seconds <= 0 && milliseconds > 0) {
        this._time = minutes * 60 * 1000 + milliseconds;
      } else if (minutes > 0 && seconds > 0 && milliseconds <= 0) {
        this._time = minutes * 60 * 1000 + seconds * 1000;
      } else if (minutes <= 0 && seconds <= 0 && milliseconds > 0) {
        this._time = milliseconds;
      } else if (minutes <= 0 && seconds > 0 && milliseconds <= 0) {
        this._time = seconds * 1000;
      } else {
        this._time = 0;
      }
    },

    get time() {
      const milliseconds = (this._time % 1000) % 100;
      const seconds = milliseconds === 100 ? 1 : ((this._time - milliseconds) % 60000) / 1000;
      const minutes = (this._time - milliseconds - seconds * 1000) / 60000;

      const millisecFormatted = milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;
      const secondsFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const result = `${minutesFormatted}:${secondsFormatted}.${millisecFormatted}`;
      // console.log(result)
      return result;
    },

    isCompeting() {
      if (this.resultType === "training") {
        return false;
      } else {
        return true;
      }
    },
  };

  resultObject.time = resultData.time;

  Object.defineProperty(resultObject, 'id', { writable: false });
  Object.defineProperty(resultObject, 'memberId', { writable: false });

  return resultObject;
}

export { constructResult };