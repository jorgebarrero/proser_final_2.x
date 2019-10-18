import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { UserbaseModel, ActionConfig } from "shared/models";
import { UserbaseService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

// Component imports
import { CrudUserbaseModel } from "./CrudUserbase.model";

import { ngxCsv } from "ngx-csv/ngx-csv";

@Component({
  selector: "app-user-crud-userbase",
  templateUrl: "./crud-userbase.component.html",
  styleUrls: ["./crud-userbase.component.scss"]
})
export class CrudUserbaseComponent implements OnInit {
  crudRecord: CrudUserbaseModel;

  constructor() {
    this.crudRecord = new CrudUserbaseModel();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onExport() {
    console.log("Base");
    console.log("crudRecord", this.crudRecord.rows);
    this.export(this.crudRecord.rows);
  }

  export(data) {
    let data_mapped = data.map(x => {
      return {
        id: x.id,
        nombre: x.firstname,
        apellido: x.lastname,
        perfil: x.profile,
        reino: x.realm,
        nombre_usuario: x.username,
        contraseña: x.password,
        email: x.email,
        verificacion_mail: x.emailVerified,
        token_de_verificacion: x.verificationToken,
        id_miembro: x.memberId,
        id_legal: x.user_legal_id,
        id_interno: x.user_internal_id,
        ruta_foto: x.user_photo_path,
        // Optional
        roles: JSON.stringify(x.roles),
        roleMapping: JSON.stringify(x.roles),
        profile_json: JSON.stringify(x.roles[0]),
        emailVerified_json: JSON.stringify({ id: 0, name: x.emailVerified })
      };
    });

    let keys = Object.keys(data_mapped[0]);

    let options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Your title",
      useBom: true,
      noDownload: false,
      headers: keys
    };

    new ngxCsv(data_mapped, "My Report", options);
  }
}
