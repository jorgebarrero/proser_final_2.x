export class UserbaseModel {
  id: any;
  firstname: any;
  lastname: any;
  profile: any;
  realm: any;
  username: any;
  password: any;
  email: any;
  emailVerified: any;
  verificationToken: any;
  memberId: any;
  user_legal_id: any;
  user_internal_id: any;
  user_photo_path: any;

  // Optional
  confirmPassword?: any;
  profile_json?: any;
  emailVerified_json?: any;
  roleMapping?: any;
  roles?: any;

  constructor() {
    this.id = null;
    this.firstname = null;
    this.lastname = null;
    this.profile = "user";
    this.realm = "maprotel";
    this.username = null;
    this.password = null;
    this.email = null;
    this.emailVerified = false;
    this.verificationToken = null;
    this.memberId = null;
    this.user_legal_id = null;
    this.user_internal_id = null;
    this.user_photo_path = null;

    // optional
    this.confirmPassword = null;
    this.profile_json = { id: 4, name: "user" };
    this.emailVerified_json = null;
    this.roleMapping = null;
    this.roles = null;
  }

  public fieldList?() {
    return [
      { field_name: "id", name: "id", text: "Id" },
      { field_name: "firstname", name: "nombre", text: "Nombre" },
      { field_name: "lastname", name: "apellido", text: "Apellido" },
      { field_name: "profile", name: "perfil", text: "Perfil" },
      { field_name: "realm", name: "reino", text: "Reino" },
      { field_name: "username", name: "nombre_usuario", text: "Usuario" },
      { field_name: "password", name: "clave_usuario", text: "Contraseña" },
      {
        field_name: "confirmPassword",
        name: "clave_usuario",
        text: "Confirmar contraseña"
      },
      { field_name: "email", name: "email", text: "Email" },
      {
        field_name: "emailVerified",
        name: "verificacion_de_mail",
        text: "Email ver"
      },
      { field_name: "verificationToken", name: "token", text: "Token ver" },
      { field_name: "memberId", name: "miembro_id", text: "Id miembro" },
      {
        field_name: "user_legal_id",
        name: "identificacion_legal",
        text: "Id legal"
      },
      {
        field_name: "user_internal_id",
        name: "identificacion_interna",
        text: "Id interno"
      },
      { field_name: "user_photo_path", name: "ruta_foto", text: "Foto" },
      // optional
      { profile_json: "perfil_json", name: "ruta_foto", text: "Perfil" },
      {
        emailVerified_json: "verificacion_de_mail_json",
        name: "ruta_foto",
        text: "Verificación mail"
      },
      { roleMapping: "roleMapping", name: "roleMapping", text: "Role mapping" },
      { roles: "roles", name: "roles", text: "Roles" }
    ];
  }

  public fieldInfo?(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
