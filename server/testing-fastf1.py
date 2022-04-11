import fastf1
import json

fastf1.Cache.enable_cache('server/fastf1cache')
session = fastf1.get_session(2019, "Italy Grand Prix", "R")
session.load(laps=True)

telemetry = {}
for driver in session.drivers:
    print(f"Getting data for driver {driver}")
    t = session.laps.pick_driver(driver).get_telemetry()
    print(f"Converting to dict...\n")
    telemetry[driver] = t.to_dict()

print("Dumping all data to JSON...")
telemetry_json = json.dumps(telemetry, default=str)

# telemetry = session.laps.pick_driver("LEC").get_telemetry()
# telemetry_json = telemetry.to_json()

with open("output.json", 'w') as file:
    file.write(telemetry_json)

print("\nDone!")