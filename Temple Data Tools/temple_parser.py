import json
import re
import requests
import time

STATUS_KEYWORDS = ['Announced', 'Construction', 'Renovation', 'Opening Soon']

def geocode_location(query):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': query,
        'format': 'json',
        'limit': 1
    }
    headers = {
        'User-Agent': 'TempleGeocoder/1.0 (your_email@example.com)'  # Add your email as per policy
    }

    response = requests.get(url, params=params, headers=headers)
    data = response.json()

    if data:
        return float(data[0]['lat']), float(data[0]['lon'])
    else:
        print(f"Failed to geocode: {query}")
        return "", ""

def parse_temple_line(line):
    line = line.strip()

    # Handle status
    for keyword in STATUS_KEYWORDS:
        if line.endswith(keyword):
            line = line[:-len(keyword)].strip()
            break

    # Date
    date_match = re.search(r'(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}', line)
    year = None
    if date_match:
        year = int(date_match.group()[-4:])
        line = line[:date_match.start()].strip()

    # Temple name
    temple_match = re.search(r'^(.+?Temple)', line)
    if not temple_match:
        return None
    name = temple_match.group(1)

    # Location
    location = line[len(name):].strip()
    country_parts = location.split(',')
    country = country_parts[-1].strip() if country_parts else ""

    # Geocode using name + location
    search_query = f"{name}, {location}"
    lat, lng = geocode_location(search_query)
    time.sleep(1.1)  # Respect Nominatim rate limits (1 request per second)

    return {
        "name": name,
        "lat": lat,
        "lng": lng,
        "year": year,
        "country": country
    }

def convert_file_to_json(input_file):
    output = []
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip() == "":
                continue
            temple_data = parse_temple_line(line)
            if temple_data:
                output.append(temple_data)
            else:
                print(f"Skipped malformed line: {line.strip()}")

    return json.dumps(output, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    input_path = 'temples.txt'
    json_output = convert_file_to_json(input_path)

    with open('temples_with_coords.json', 'w', encoding='utf-8') as out_file:
        out_file.write(json_output)

    print("Done! Output written to temples_with_coords.json.")
