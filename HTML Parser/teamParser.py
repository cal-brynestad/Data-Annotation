import requests
from bs4 import BeautifulSoup

# Specify the URL of the PlusLiga table
URL = "https://www.plusliga.pl/table.html"

def parse_plusliga_table():
    """Parses the PlusLiga table at the specified URL and extracts team data.

    Returns:
        dict: A dictionary where keys are team names (Drużyna) and values
              are lists containing the corresponding team data.
    """

    # Fetch the HTML content
    response = requests.get(URL)
    response.raise_for_status()  # Raise an exception for request errors

    # Parse the HTML with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the PlusLiga table
    table = soup.find('table', class_='rs-standings-table')

    if not table:
        raise ValueError("PlusLiga table not found. Please verify the website's structure.")

    # Initialize the dictionary to store team data
    team_data = {}

    # Iterate through table rows (skipping the header)
    for row in table.find_all('tr')[1:]:
        cells = row.find_all('td')
        if len(cells) == 0:
            continue

        class_name = row.get('class')
        if 'hidden' in class_name:
            continue

        # Extract the team name
        team_name = cells[1].text.strip()

        # Extract other relevant data points
        data = [cell.text.strip() for cell in cells[2:]]

        # Store the data in the dictionary
        team_data[team_name] = data

    return team_data

if __name__ == "__main__":
    results = parse_plusliga_table()
    for key, value in results.items():
        print(f"{key}: {value}")