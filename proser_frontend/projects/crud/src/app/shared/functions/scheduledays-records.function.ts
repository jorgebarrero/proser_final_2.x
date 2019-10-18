export function scheduleDaysRecords(scheduleId) {
  let result;

  let scheduleDays = [
    {
      inv_scheduleday_id: 1,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 1,
      inv_scheduleday_name: "lunes",
      inv_scheduleday_start_time: "08:00:00",
      inv_scheduleday_end_time: "17:00:00",
      inv_scheduleday_legal_break: "01:00:00",
      inv_scheduleday_laborday: 1,
      inv_scheduleday_duration: "08:00:00"
    },

    {
      inv_scheduleday_id: 2,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 2,
      inv_scheduleday_name: "martes",
      inv_scheduleday_start_time: "08:00:00",
      inv_scheduleday_end_time: "17:00:00",
      inv_scheduleday_legal_break: "01:00:00",
      inv_scheduleday_laborday: 1,
      inv_scheduleday_duration: "08:00:00"
    },

    {
      inv_scheduleday_id: 3,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 3,
      inv_scheduleday_name: "miércoles",
      inv_scheduleday_start_time: "08:00:00",
      inv_scheduleday_end_time: "17:00:00",
      inv_scheduleday_legal_break: "01:00:00",
      inv_scheduleday_laborday: 1,
      inv_scheduleday_duration: "08:00:00"
    },

    {
      inv_scheduleday_id: 4,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 4,
      inv_scheduleday_name: "jueves",
      inv_scheduleday_start_time: "08:00:00",
      inv_scheduleday_end_time: "17:00:00",
      inv_scheduleday_legal_break: "01:00:00",
      inv_scheduleday_laborday: 1,
      inv_scheduleday_duration: "08:00:00"
    },

    {
      inv_scheduleday_id: 5,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 5,
      inv_scheduleday_name: "viernes",
      inv_scheduleday_start_time: "08:00:00",
      inv_scheduleday_end_time: "17:00:00",
      inv_scheduleday_legal_break: "01:00:00",
      inv_scheduleday_laborday: 1,
      inv_scheduleday_duration: "08:00:00"
    },

    {
      inv_scheduleday_id: 6,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 6,
      inv_scheduleday_name: "sábado",
      inv_scheduleday_start_time: null,
      inv_scheduleday_end_time: null,
      inv_scheduleday_legal_break: null,
      inv_scheduleday_laborday: 0,
      inv_scheduleday_duration: null
    },

    {
      inv_scheduleday_id: 7,
      inv_schedule_id: scheduleId,
      inv_scheduleday_weekday: 7,
      inv_scheduleday_name: "domingo",
      inv_scheduleday_start_time: null,
      inv_scheduleday_end_time: null,
      inv_scheduleday_legal_break: null,
      inv_scheduleday_laborday: 0,
      inv_scheduleday_duration: null
    }
  ];

  result = scheduleDays;

  return result;
}
