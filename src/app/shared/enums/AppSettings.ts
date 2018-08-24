export class AppSettings {

  public static get SERVICE_URL(): string {
    return "http://localhost:9002/rest";
  }
  public static get API_PROTOCOL(): string {
    return "http://";
  }
  public static get API_HOST(): string {
    return "localhost";
  }
  public static get API_PORT(): string {
    return "9002";
  }
  public static get API_DOMAIN(): string {
    return "rest";
  }
  public static get ENVIRONMENT(): string {
    return "dev";
  }
}