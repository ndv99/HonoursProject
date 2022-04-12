import fastf1
import json

fastf1.Cache.enable_cache('server/fastf1cache')
session = fastf1.get_session(2019, "Italy Grand Prix", "R")
session.load(laps=True)

telemetry = {}
drivers = {}
for driver in session.drivers:
    print(f"Getting data for driver {driver}.")
    t = session.laps.pick_driver(driver)
    print(f"Converting to dict...\n")
    telemetry[driver] = t.to_json()
    print(f"Parsing information for driver{driver}...")
    drivers[str(driver)] = session.get_driver(driver).to_json()

for driver in drivers:
    drivers[driver] = json.loads(drivers[driver])

for t in telemetry:
    telemetry[t] = json.loads(telemetry[t])

data={
    "drivers": drivers,
    "telemetry": telemetry
}

with open("output.json", 'w') as file:
    file.write(json.dumps(data, default=str))
print("\nDone!")