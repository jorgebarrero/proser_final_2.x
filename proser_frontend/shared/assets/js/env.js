(function(window) {
  window.__env = window.__env || {};

  // API url
  window.__env.loopbackApiUrl = "http://localhost:3151";
  window.__env.systemApiUrl = "http://localhost:3152";
  window.__env.systemUser = "http://localhost:3153";

  window.__env.callcenterName = "PROSER - Call center";
  window.__env.callcenterSlogan = "Proser executive services";
  window.__env.callcenterLogo = "assets/img/logos_proser/proser-icon-sm.png";
  window.__env.callcenterSite = "http://www.maprotel.com/";
  window.__env.autoregister = false;

  window.__env.waitTime = 20;

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;

  window.__env.config = [
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
    },

    {
      configName: "New SPECIAL",
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
})(this);
