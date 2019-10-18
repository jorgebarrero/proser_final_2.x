import { UserSelectionModel } from "shared/models";

export function selectorLegendSubtitles(userSelection: UserSelectionModel) {
  let result = "";

  let start_time = ""; // userSelection.start_time;
  let end_time = ""; // userSelection.end_time;
  let last_minutes = ""; // userSelection.last_minutes;
  let interval = ""; // userSelection.interval;

  // start_time
  const preStart_time = [userSelection.start_time]
    .map(x => {
      return x ? x.value : "";
    })
    .join(" / ");
  preStart_time.length > 0
    ? (start_time = "Hora inicio: " + preStart_time + "")
    : "";

  // end_time
  const perEnd_time = [userSelection.end_time]
    .map(x => {
      return x ? x.value : "";
    })
    .join(" / ");
  perEnd_time.length > 0 ? (end_time = "Hora fin: " + perEnd_time + "") : "";

  // last_minutes
  const preLast_minutes = [userSelection.last_minutes]
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preLast_minutes.length > 0
    ? (last_minutes = "Últimos " + preLast_minutes + "")
    : "";

  interval;
  const preInterval = [userSelection.interval]
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preInterval.length > 0 ? (interval = "Intervalo:(" + preInterval + ")") : "";

  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(start_time, end_time, last_minutes, interval);

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` - `);

  result = preResultFixed.length > 0 ? preResultFixed : "";

  return result;
}
