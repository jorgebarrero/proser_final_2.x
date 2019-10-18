// SELECT 

// month(`callentry_date`) as month
// , min(`callentry_id`) as min
// , max(`callentry_id`) as max, count(*)
// , ( max(`callentry_id`) -  min(`callentry_id`) +1) as dif
// , SUM(case when callentry_status = 'abandonada' then 1 else 0 end) as abandon
// , SUM(case when callentry_status = 'terminada' then 1 else 0 end) as success
// , SUM(case when callentry_status = 'terminada' AND callentry_duration_sec <= 5 then 1 else 0 end) as short
// , SUM(case when callentry_status = 'terminada' AND callentry_duration_sec > 5 then 1 else 0 end) as efective


// FROM `MainCallEntry` 

// WHERE 1 group by month