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
})(this);
