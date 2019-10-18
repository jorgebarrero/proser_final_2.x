# ConsolidateCallEntry

Esta tabla ha sido creada para consolidar la información de la llamadas
entrantes provenientes de varias instalaciones del call_center de Proser

## **SERVER**

Separador de campos

## callentry_consolidate_id

Numero único de identificación del registro. Este numero se construye a partir
del numero original de identificación al que se le agrega un prefijo. Es un
campo numerico con capacidad de cien millones de registros.

Para el caso de HMO:

```
if (call === "call_amd") {
    server_alias = "call_amd";
    server_ip = "172.20.0.234";
    server_database = "proser_hmo_amd";
    server_prefix = 100000000;
    server_service = "amd";
  }

  if (call === "call_emergencia") {
    server_alias = "call_emergencia";
    server_ip = "172.20.0.235";
    server_database = "proser_hmo_emergencia";
    server_prefix = 200000000;
    server_service = "emergencia";
  }

  if (call === "call_aps") {
    server_alias = "call_aps";
    server_ip = "172.20.0.239";
    server_database = "proser_hmo_aps";
    server_prefix = 300000000;
    server_service = "aps";
  }
```

## callentry_server_ip

IP del callcenter de donde proviene el registro

## callentry_database

Nombre de la base de datos de donde se extrae el registro

## callentry_alias

Abreviatura que indica en forma abreviada el nombre generico del servidor En la
actualidad hay tres (amd, emergencia y aps)

## callentry_prefix_num

Es el prefijo para la secuencia de la numeracíon de esta tabla. 1 = amd, 2 =
emergencia, 3 = aps

## **DATA**

Separador

## callentry_id

Número secuencial de identificación. Cada call tiene su propia secuencia

## callentry_agent_id

Numero de identificación de cada agente registrado en cada callcenter (este
numero se usa como clave para realizar el join con la tabla agent)

## callentry_queue_id

Numero de identificación de la cola (no es el numero de la coda, sino un id). Se
usa para hacer el join con la tabla queue_call_entry y asi extraer la extension
de la cola. El nombre de la cola se obtiene extrayendolo de la tabal
queue_config en la base de datos de asterisk

## callentry_contact_id

Numero del contacto en caso de numero frecuente y que esté registrado en el
call. Este dato no se usa actualmente en HMO\*

## callentry_callerid

Identificación del que llama. Es un texto que puede identificar una extensión,
un servicio o numero telefónico

## callentry_datetime_init

Hora de inicio de la llamada entre agente y cliente

## callentry_datetime_end

Hora de finalización de llamada entre agente y cliente

## callentry_duration_sec

Duración de la llamada en segundos (tiempo hablando)

## callentry_status

Estado de la llamada:

'abandonada' 'activa' 'fin-monitoreo' 'terminada'

## callentry_transfer

Indicador de transferencia de llamada a otra extensión\*

## callentry_datetime_entry_queue

Entrada de la llamada en la cola, proveniente del exterior

## callentry_duration_sec_wait

Duración del tiempo d espera en la cola en segundos

## callentry_uniqueid

Numero unico de identificación de la llamada (cada call tiene su propia
secuencia asi que hay posibilidades que el numero se repita)

## callentry_campaign_id

Numero de identificación de la campaña\*

## callentry_trunk

Identificación de la troncal

## **COMPLEMENT**

Separador

## callentry_date

Fecha en formato 'aaaa-mm-dd'

## callentry_queue_time_expired

Tiempo de expiración de la cola\*

## callentry_type

Tipificación de la llamada 'inbound' 'automatic' (si la cola empieza por 9)

## callentry_auto_campaign

Nombre de la campaña automatica\*

## callentry_queue_number

Nombre de la cola

## callentry_service_name

Nombre del servicio (agrupa varias colas en cada call_center)

'aps' 'emergencia' 'amd' 'farmacia' (4001)

## callentry_agent_name

Nombre del agente

## **QUEUELOG**

Separador

## callentry_who_hung

Persona que colgo 'AGENT' 'CALLER'

## callentry_hung_agent

Campo de 1 y 0 si colgo el agente

## callentry_hung_caller

Campo de 1 y 0 si colgo el llamante

## **JSON**

Separador

## callentry_people_json

Resumen de datos de gente\*

## callentry_operation_json

Resumen de datos de operacion\*

## callentry_time_json

Resumen de datos de tiempo\*

## **CLASSIFICATION**

Separador

## callentry_agent_json

Resumen de datos de agente\*

## callentry_supervisor_json

Resumen de datos de supervisor\*

## callentry_queue_json

Resumen de datos de gente\*

## callentry_service_json

Resumen de datos de servicio\*

## callentry_client_json

Resumen de datos de cliente\*

## callentry_campaign_json

Resumen de datos de campaña\*

## **RESUME**

Separador

## callentry_resume_report

Resumen de datos\*

NOTA: los campos con asterisco son para uso futuro

# Descripción de la tabla

Field, Type, Null, Key, Default, Extra

'**SERVER**', 'int(10)', 'YES', '', NULL,'' 'callentry_consolidate_id',
'int(10)', 'NO', 'PRI', NULL, '' 'callentry_server_ip', 'varchar(20)', 'YES',
'', NULL, '' 'callentry_database','varchar(50)', 'YES', '', NULL, ''
'callentry_alias', 'varchar(20)', 'YES', '',NULL, '' 'callentry_prefix_num',
'int(10)', 'YES', '', NULL, ''

'**DATA**', 'int(10)', 'YES', '', NULL, '' 'callentry_id', 'int(10)', 'YES', '',
NULL, '' 'callentry_agent_id', 'int(10) unsigned', 'YES', 'MUL', NULL, ''
'callentry_queue_id', 'int(10) unsigned', 'YES', 'MUL', NULL, ''
'callentry_contact_id', 'int(10) unsigned', 'YES', 'MUL', NULL, ''
'callentry_callerid', 'varchar(15)', 'NO', '', NULL, ''
'callentry_datetime_init', 'datetime', 'YES', 'MUL', NULL, ''
'callentry_datetime_end', 'datetime', 'YES', '', NULL, ''
'callentry_duration_sec', 'int(10) unsigned', 'YES', '', NULL, ''
'callentry_status', 'varchar(32)', 'YES', 'MUL', NULL, ''
'callentry_transfer','varchar(6)', 'YES', '', NULL, ''
'callentry_datetime_entry_queue', 'datetime','YES', 'MUL', NULL, ''
'callentry_duration_sec_wait', 'int(11)', 'YES', '', NULL, ''
'callentry_uniqueid', 'varchar(32)', 'YES', '', NULL, ''
'callentry_campaign_id', 'int(10) unsigned', 'YES', 'MUL', NULL, ''
'callentry_trunk', 'varchar(20)', 'YES', '', NULL, ''

'**COMPLEMENT**', 'varchar(1)', 'YES', '', NULL, '' 'callentry_date', 'date',
'YES', '', NULL, 'STORED GENERATED' 'callentry_queue_time_expired', 'int(11)',
'YES', '', NULL,'' 'callentry_type', 'varchar(50)', 'YES', '', NULL, ''
'callentry_auto_campaign', 'int(11)', 'YES', '', NULL, ''
'callentry_queue_number', 'varchar(20)', 'YES', '', NULL, ''
'callentry_service_name', 'varchar(20)', 'YES', '', NULL, ''
'callentry_agent_name', 'varchar(250)', 'YES', '', NULL, ''

'**QUEUELOG**', 'int(1)', 'YES', '', NULL, '' 'callentry_who_hung',
'varchar(20)', 'YES', '',NULL, '' 'callentry_hung_agent', 'int(1)', 'YES', '',
NULL, '' 'callentry_hung_caller', 'int(1)', 'YES', '', NULL, ''

'**JSON**', 'int(10)', 'YES', '', NULL, '' 'callentry_people_json', 'text',
'YES', '', NULL, '' 'callentry_operation_json', 'text', 'YES', '', NULL, ''
'callentry_time_json', 'text', 'YES', '', NULL, ''

'**CLASSIFICATION**', 'int(10)', 'YES', '', NULL, '' 'callentry_agent_json',
'text', 'YES', '', NULL, '' 'callentry_supervisor_json', 'text', 'YES', '',
NULL, '' 'callentry_queue_json', 'text', 'YES', '', NULL, ''
'callentry_service_json', 'text', 'YES', '', NULL, '' 'callentry_client_json',
'varchar(20)', 'YES', '', NULL, '' 'callentry_campaign_json', 'varchar(20)',
'YES', '', NULL, ''

'**RESUME**', 'int(10)', 'YES', '', NULL, '' 'callentry_resume_report', 'text',
'YES', '', NULL, ''
