# Tables_in_proser_base

## ACL

Access Control, identifica los permisos de cada usuario en el metodo acl

## AccessToken

Listado de tokens emitidos por sesión

## AuxColor

Colores utilizados por el sistema para colorear los dashboars y otros elementos

## AuxHour

Lista para la selección en menus desplegables que implican seleccionar un
listado de horas

## AuxInfo

Lista de datos globales de la aplicaicón

## AuxInterval

Lista para la selección de intervalos de tiempo

## AuxLine

Lista para la selección de numero de líneas en los reportes

## HcaAgent

Invetario diarios de agentes. Esta tabla contiene día por día el estado del
invetario de agentes (copia del estado de InvAgent para un día particular solo
agentes activos)

## HcaExtension

Inventario diario del uso de extensiones para agentes opersonal que no atiende
llamadas pero usa el teléfono

## HcaOccasion

Inventario diario de guardias de trabajo no asociadas a los horarios
convencionales

## HcaQueue

Inventario diario de colas. Esta tabla refleja el estado de las colas cada día
(Copia de InvQueue )

## InvAgent

Inventario de agentes (Inportada del call_center)

## InvAgentRole

Inventario de roles

## InvBreak

Inventario de pausas (breaks)

## InvCalendar

Inventario de calendarios

## InvCalendarDay

Inventario de días festivos

## InvCampaign

Inventario de campañas (Importda del call_center)

## InvClient

Inventario de clientes

## InvQueue

Inventario de colas

## InvQueueConfig

Inventario de configuración de colas (Importada de asterisk)

## InvScale

Inventario de escalas a utilizar en los dashboards

## InvSchedule

Inventario de horarios

## InvScheduleDay

Inventario de días de la semana para cada horario

## InvService

Inventario de servicios asignables a las colas

## InvSms

Inventario de SMS

## InvSupervisor

Inventario de supervisores

## LocalInvAgent

Archivo temporar para almacenar agentes

## LocalInvBreak

Archivo temporal para almacenar pausas

## LocalInvQueue

Archivo temporal para almacenar colas

## MainAudit

Gestion del archivo audit importado del call_center, contiene los datos de login
y breaks de los agentes

## MainCallEntry

Gestión de las llamadas entrantes a las colas. Importado desde el call_center.
Solo contiene información de las llamadas entrantes

## MainCdr

Gestion del registro de cada interacción con la central telefónica. Contien
información de 4 tipos: system, inbound, outbound, internal (sistema, entrantes,
salientes, internas). Esta data se importa de asteriskcdrdb

## MainQueueLog

Gestion de la traza de cada llamada. Solo se importa data parcial del archivo
presente en asterisk ya que los datos individuales de cada llamada se puede
consultar directamente a la fuente y no todos son requeridos en la reportería

## MainStoredQueries

Selecciones realizadas por el usuario que pueden ser guardadas

## RealCurrentAgents

Agentes trabajando actualmente en curso

## RealCurrentBreaks

Pausas en proceso actualmente en curso

## RealCurrentCalls

Llamadas actualmente en curso

## Role

Roles de los usuarios

## RoleMapping

Mapeo de roles

## ShowDisplay

Gestion de las escenas del display. Aqui se almacenan las vistas que el usuario
queire mostrar en el display

## User

Usuarios (general) no se usa

## UserSelection

Selecciones del usuario que serán guardadas

## Userbase

Tabla derivada de user con los datos de cada usuario del sistema
