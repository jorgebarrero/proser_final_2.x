import { datePickerToText } from "./date.function";
import {
  sqlFilterHcaAgent,
  sqlFilterHcaQueue,
  sqlFilterInvAgent,
  sqlFilterInvQueue
} from "./filter.function";
import { UserSelectionModel } from "shared/models";

export function onNewDateFunction(userSelection) {
  userSelection.bootstrap_end_date = userSelection.bootstrap_start_date;
  userSelection.start_date = datePickerToText(
    userSelection.bootstrap_start_date
  );
  userSelection.end_date = datePickerToText(userSelection.bootstrap_end_date);
  userSelection.week_day = userSelection.weekdayName(userSelection.start_date);

  return userSelection;
}

export function onChangeFunction(userSelection) {
  userSelection.filter_hca_agent = sqlFilterHcaAgent(userSelection);
  userSelection.filter_hca_queue = sqlFilterHcaQueue(userSelection);
  userSelection.filter_inv_agent = sqlFilterInvAgent(userSelection);
  userSelection.filter_inv_queue = sqlFilterInvQueue(userSelection);

  userSelection.historic_mode =
    userSelection.start_date === userSelection.today ? false : true;
  userSelection.end_date = datePickerToText(userSelection.bootstrap_end_date);

  userSelection.subtitle = userSelection.selectorOptionSubtitles(
    userSelection.client,
    userSelection.queue,
    userSelection.service,
    userSelection.campaign,
    userSelection.supervisor,
    userSelection.agent,
    userSelection.schedule,
    userSelection.substitute
  );

  userSelection.report_specification = userSelection.onReportSpecification(
    userSelection.start_date,
    userSelection.end_date,
    userSelection.start_time,
    userSelection.end_time,
    userSelection.interval,
    userSelection.last_minutes
  );

  return userSelection;
}

export function selectionToText(userSelection: UserSelectionModel) {
  return "PRUEBA";
}

export function optionsToText(userSelection: UserSelectionModel) {
  return "PRUEBA";
}

export function stringifySelection(selection) {
  let result = selection;

  if (selection) {
    let resultTemp = {
      title: selection.title,
      entity_selection: selection.entity_selection,
      options: selection.options,
      legend: selection.legend,

      mode: JSON.stringify(selection.mode),
      type: JSON.stringify(selection.type),

      start_date: JSON.stringify(selection.start_date),
      end_date: JSON.stringify(selection.end_date),

      start_time: JSON.stringify(selection.start_time),
      end_time: JSON.stringify(selection.end_time),

      login: JSON.stringify(selection.login),

      auxiliar: JSON.stringify(selection.auxiliar),
      assignation: JSON.stringify(selection.assignation),

      client: JSON.stringify(selection.client),
      queue: JSON.stringify(selection.queue),
      service: JSON.stringify(selection.service),
      campaign: JSON.stringify(selection.campaign),

      plannedClient: JSON.stringify(selection.plannedClient),
      plannedQueue: JSON.stringify(selection.plannedQueue),
      plannedService: JSON.stringify(selection.plannedService),
      plannedCampaign: JSON.stringify(selection.plannedCampaign),

      supervisor: JSON.stringify(selection.supervisor),
      agent: JSON.stringify(selection.agent),

      scale: JSON.stringify(selection.scale),
      schedule: JSON.stringify(selection.schedule),

      last_minutes: JSON.stringify(selection.last_minutes),
      interval: JSON.stringify(selection.interval),

      groupBy: JSON.stringify(selection.groupBy),
      orderBy: JSON.stringify(selection.orderBy),
      limitBy: JSON.stringify(selection.limitBy),

      start_time_hour: JSON.stringify(selection.start_time_hour),
      end_time_hour: JSON.stringify(selection.end_time_hour)
    };

    result = JSON.stringify(resultTemp);
  }

  return result;
}
