import Keycloak from "keycloak-js";

const keyclock = new Keycloak({
 
  url: "http://127.0.0.1:8080/",
  realm: "ytclone",
  clientId: "ytcloneclient",
//   onLoad: 'login-required',
});

export default keyclock;