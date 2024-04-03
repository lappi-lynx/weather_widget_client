## GraphQL weather forecast client application
It supports weather forecast in range from 1 to 16 days.
Make sure [server](https://github.com/lappi-lynx/weather_widget_api) is running first!

### Installation and running

```
docker build --no-cache -t forecast_client .
docker run --rm -p 3333:3333 forecast_client
```

### Embedding
! Note: use `/daily_forecast` or `/hourly_forecast` URL for daily and hourly data displaying !
```
<script>
    function injectWeatherWidget(theme = 'dark') {
      var iframe = document.createElement('iframe');
      // client app url
      // use /daily_forecast for daily data displaying
      iframe.src = `http://localhost:3333/hourly_forecast?theme=${theme}`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = '480px';
      document.getElementById('weatherWidgetContainer').innerHTML = '';
      document.getElementById('weatherWidgetContainer').appendChild(iframe);
    }

    function toggleTheme() {
      var body = document.body;
      body.classList.toggle('dark');
      var theme = body.classList.contains('dark') ? 'dark' : 'light';
      injectWeatherWidget(theme);
    }

    window.addEventListener('DOMContentLoaded', function() {
      injectWeatherWidget('dark');
    });
  </script>

  <button onclick="toggleTheme()">Switch theme</button>
```
### TODOs
- [X] Docker container
- [X] Decoupled custom hooks, infra, services and util functions
- [X] MaterialUI components
- [X] ThemeProvider for themes customization
- [X] The website is responsive and look nice on all screens
- [X] The website works in all modern browsers
- [X] Responsible, adaptive design
- [X] Add info about wind, clouds, precipitation
- [X] Add weather icons
- [X] Unit tests
- [X] City autocomplete requests are cached in browser (localStorage)
- [X] Add separate daily mode to show forecast in a round boxes (separate component & URL)


### Theme support
2 modes available: `daily` and `hourly`.
#### Hourly mode examples:
`dark` (by default) and `light` themes supported
![Dark theme](./examples/dark_theme.jpeg)
![Light theme](./examples/light_theme.jpeg)
#### Daily mode examples:
![Dark theme long](./examples/daily_dark_long.jpeg)
![Light theme long](./examples/daily_light_long.jpeg)
![Dark theme short](./examples/daily_dark_short.jpeg)
![Light theme short](./examples/daily_light_short.jpeg)
