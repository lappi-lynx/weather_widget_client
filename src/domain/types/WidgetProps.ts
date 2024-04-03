export enum ForecastModeEnum {
  DAILY = 'daily',
  HOURLY = 'hourly',
}

export type WidgetProps = {
  mode: ForecastModeEnum;
}
