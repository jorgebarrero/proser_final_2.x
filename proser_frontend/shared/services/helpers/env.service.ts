import { Injectable } from "@angular/core";

@Injectable()
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public loopbackApiUrl = "http://127.0.0.1:3151";
  public systemApiUrl = "http://127.0.0.1:3152";
  public userApiUrl = "http://127.0.0.1:3153";

  // Version
  public version = "2.1.14";

  // Callcenter Name
  public callcenterName = "Test CallCenter";

  // Callcenter slogan
  public callcenterSlogan = "Proser is the best";

  // Callcenter slogan
  public callcenterLogo = "/assets/img/logos_proser/proser-icon-sm.png";

  // Callcenter slogan
  public callcenterSite = "Test";

  // Whether or not to enable debug mode
  public enableDebug = true;

  public waitTime = 20;

  public external = "Extenal file";

  // Show/Hide Register user option
  public autoregister = true;

  public config = [
    {
      configName: "STANDARD",
      loopbackApiUrl: "http://localhost:3151",
      systemApiUrl: "http://localhost:3152",
      systemUser: "http://localhost:3153",
      callcenterName: "PROSER - Call center",
      callcenterSlogan: "Proser executive services",
      callcenterLogo: "assets/img/logos_proser/proser-icon-sm.png",
      callcenterSite: "http://www.maprotel.com/",
      autoregister: false,
      waitTime: 20,
      enableDebug: true
    }
  ];

  current = 0;
  constructor() {}
}
