import { IconType } from 'react-icons';
import { WiDaySunny, WiDayCloudy, WiCloud, WiFog, WiSprinkle, WiRain, WiRainMix, WiSnow, WiSnowflakeCold, WiThunderstorm } from 'react-icons/wi';

type ColorPalette = {
  sun: string;
  rain: string;
  cloud: string;
  snow: string;
}

type WeatherIcon = {
  Icon: IconType;
  color: string;
}

export const weatherCodeToIcon = (code: number, color_palette: ColorPalette): WeatherIcon => {
  switch (code) {
    case 0: return { Icon: WiDaySunny, color: color_palette.sun };
    case 1:
    case 2:
    case 3: return { Icon: WiDayCloudy, color: color_palette.sun };
    case 45:
    case 48: return { Icon: WiFog, color: color_palette.cloud };
    case 51:
    case 53:
    case 55: return { Icon: WiSprinkle, color: color_palette.rain };
    case 56:
    case 57: return { Icon: WiRainMix, color: color_palette.rain }; // Freezing Drizzle
    case 61:
    case 63:
    case 65: return { Icon: WiRain, color: color_palette.rain }; // Rain
    case 66:
    case 67: return { Icon: WiRainMix, color: color_palette.rain }; // Freezing Rain
    case 71:
    case 73:
    case 75: return { Icon: WiSnow, color: color_palette.snow };
    case 77: return { Icon: WiSnowflakeCold, color: color_palette.snow };
    case 80:
    case 81:
    case 82: return { Icon: WiRain, color: color_palette.rain };
    case 85:
    case 86: return { Icon: WiSnow, color: color_palette.snow };
    case 95:
    case 96:
    case 99: return { Icon: WiThunderstorm, color: color_palette.rain };
    default: return { Icon: WiCloud, color: color_palette.cloud };
  }
};
