import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 
  url: "http://localhost:8080/",
  realm: "ytclone",
  clientId: "ytcloneclient",
//   onLoad: 'login-required',
});

export default keycloak;