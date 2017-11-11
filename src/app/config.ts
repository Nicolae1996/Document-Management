/**
 * Configuration data for server access
 */
export class Config {
    //Configuration Open Id
    //Takes datafrom Auth Server for authentification
    //http://192.168.1.70:5086/.well-known/openid-configuration
    public static readonly dataServer: string = "http://localhost:65088";
    //public static readonly dataServer: string = "http://192.168.1.66:5566";

    //Takes data from Api
    public static readonly data: string = "http://localhost:51018"; // for requests to API 
    //public static readonly data: string = "place for ip"; // for requests to API 

    public static readonly TOKEN_ENDPOINT: string = Config.dataServer + "/connect/token";

    public static readonly USERINFO_ENDPOINT: string = Config.dataServer + "/connect/userinfo";

    public static readonly GRANT_TYPE: string = "password";

    public static readonly REVOCATION_ENDPOINT: string = Config.dataServer + "/connect/revocation";

    public static readonly SCOPE: string = "PIGDWebAPI offline_access openid profile email";

    public static readonly CLIENT_ID: string = "PIGD Angular SPA";

    public static readonly LanguageService: string = "http://localhost:51018";
}
