# LDS Temple Tracker

An interactive web application that tracks the growth of LDS temples around the world over time. Visualize the historical progression of temple construction from 1836 to the present day.

## Monthly Status Automation

The repository now includes `Temple Data Tools/status_sync.py`, a lightweight automation script that scrapes the official chronology page (https://churchofjesuschristtemples.org/temples/chronology/), compares each temple’s status against your local list (`temples_with_coords.json` by default), and updates two JSON artifacts:

- `Temple Data Tools/status_cache.json` – the latest snapshot of every temple’s status, dedication/opening date, and officiator as published on the chronology page.
- `Temple Data Tools/status_report.json` – a diff-oriented report that highlights anything new on the site, temples that changed status since the last run, and any name mismatches between your data and the source.

### Running on demand

```bash
python3 "Temple Data Tools/status_sync.py"
```

Requirements: Python 3.10+ with the `requests` package (already used elsewhere in the repo). The script prints a short summary to the console and writes both JSON files. If your local names differ slightly from the official spellings (for example, missing accent marks), those will appear in the “missing from local” section so you can decide whether to rename your entry.

To point the script at a different local JSON list or to store the cache/report in another location, use `--local-list`, `--cache`, and `--report` arguments as needed.

### Scheduling it monthly

1. **Windows Task Scheduler**
   - Open *Task Scheduler* → *Create Basic Task…* → name it “Temple Status Sync”.
   - Trigger: *Monthly* (pick the day/time you prefer).
   - Action: *Start a program* and use `python3` (or the path to your Python executable) with the script path, e.g.  
     `Program/script: python3`  
     `Add arguments: "C:\path\to\Temple Data Tools\status_sync.py"`

2. **macOS/Linux cron**
   - Run `crontab -e` and add a line like:  
     `0 6 1 * * /usr/bin/python3 /path/to/Temple\ Data\ Tools/status_sync.py >> /path/to/status_sync.log 2>&1`

Either option will keep `status_cache.json` refreshed automatically so you can inspect `status_report.json` for any temples that advanced from Announced → Under Construction → Dedicated without manual data entry.

## Features

- **Interactive World Map**: View temple locations on a beautiful world map using OpenStreetMap
- **Timeline Slider**: Scroll through time to see temples appear as they were dedicated
- **Temple Markers**: Color-coded markers show temples by decade
- **Add Temples**: Manually add new temples with location and dedication information
- **Play Timeline**: Automatically play through the timeline to see temple growth
- **Responsive Design**: Works on desktop and mobile devices
- **JSON File Storage**: Temple data is loaded from and can be saved to a JSON file
- **Map Boundaries**: Map is limited to prevent infinite scrolling

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The application will load with sample temple data
3. Use the timeline slider at the bottom to navigate through different years
4. Click on temple markers to see detailed information

### Adding Temples
1. Click the "Add Temple" button
2. Fill in the temple information:
   - **Temple Name**: The official name of the temple
   - **Latitude/Longitude**: Geographic coordinates (you can find these on Google Maps)
   - **Dedication Year**: The year the temple was dedicated
   - **Country**: The country where the temple is located
   - **Description**: Optional additional information
3. Click "Add Temple" to save
4. Use "Save to File" button to download the updated JSON file

### Timeline Controls
- **Slider**: Drag to move through time manually
- **Play/Pause**: Automatically play through the timeline
- **Reset**: Return to the beginning (1836)

### Keyboard Shortcuts
- **Spacebar**: Play/Pause timeline
- **Left Arrow**: Go back one year
- **Right Arrow**: Go forward one year
- **Home**: Reset to 1836

## Temple Marker Colors

Temples are color-coded by decade:
- **Brown (1800s)**: Early temples like Kirtland and Nauvoo
- **Gold (1900-1949)**: Early 20th century temples
- **Green (1950-1999)**: Mid-century expansion
- **Red (2000+)**: Modern temple era
- **Blue**: Default color for any unclassified temples

## Sample Data

The application comes with 10 sample temples including:
- Kirtland Temple (1836) - First temple
- Salt Lake Temple (1893) - Iconic temple
- Laie Hawaii Temple (1919) - First outside continental US
- Bern Switzerland Temple (1955) - First in Europe
- And more...

## Technical Details

- **Map**: Leaflet.js with OpenStreetMap tiles and bounded scrolling
- **Storage**: JSON file with localStorage backup
- **Styling**: Modern CSS with gradients and animations
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Data Format

Temples are stored in JSON format:
```json
{
  "name": "Temple Name",
  "lat": 40.7704,
  "lng": -111.8933,
  "year": 1893,
  "country": "United States",
  "description": "Optional description"
}
```

## Data Persistence

The application now supports persistent data storage:

1. **JSON File Loading**: Temple data is loaded from `temples.json` on startup
2. **Automatic Downloads**: When you add temples, a new `temples.json` file is automatically downloaded
3. **Manual Save**: Use the "Save to File" button to download the current data at any time
4. **Local Storage Backup**: Data is also saved to browser localStorage as backup

To update your temple data file:
1. Add temples using the "Add Temple" button
2. Click "Save to File" to download the updated JSON
3. Replace your existing `temples.json` file with the downloaded version

## Map Boundaries

The map now has bounded scrolling to prevent infinite zooming:
- **Minimum Zoom**: Level 1 (world view)
- **Maximum Zoom**: Level 18 (detailed street view)
- **Boundaries**: Limited to the world map area (-90 to 90 latitude, -180 to 180 longitude)

## Future Enhancements

Potential features to add:
- Filter by country or region
- Search functionality
- More detailed temple information
- Historical photos
- Temple construction timeline
- Statistics and charts

## Contributing

Feel free to add more temples or suggest improvements to the application!

## License

This project is open source and available under the MIT License. 
