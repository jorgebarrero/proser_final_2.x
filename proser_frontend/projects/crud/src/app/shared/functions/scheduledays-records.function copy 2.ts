export function scheduleDaysRecords(scheduleId) (
  let result;



  let scheduleDays = `
  (
      1,
      scheduleId,
      1,
      'lunes',
      '08:00:00',
      '17:00:00',
      '01:00:00',
      1,
      '08:00:00'
    ),

    (
      2,
      scheduleId,
      2,
      'martes',
      '08:00:00',
      '17:00:00',
      '01:00:00',
      1,
      '08:00:00'
    ),

    (
      3,
      scheduleId,
      3,
      'miércoles',
      '08:00:00',
      '17:00:00',
      '01:00:00',
      1,
      '08:00:00'
    ),

    (
      4,
      scheduleId,
      4,
      'jueves',
      '08:00:00',
      '17:00:00',
      '01:00:00',
      1,
      '08:00:00'
    ),

    (
      5,
      scheduleId,
      5,
      'viernes',
      '08:00:00',
      '17:00:00',
      '01:00:00',
      1,
      '08:00:00'
    ),

    (
      6,
      scheduleId,
      6,
      'sábado',
      null,
      null,
      null,
      0,
      null
    ),

    (
      7,
      scheduleId,
      7,
      'domingo',
      null,
      null,
      null,
      0,
      null
    )
  `;

  result = scheduleDays;

  return result;
)
