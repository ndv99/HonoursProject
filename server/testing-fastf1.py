import fastf1

fastf1.Cache.enable_cache('server/fastf1cache')
session = fastf1.get_session(2019, "Italian Grand Prix", "R")
session.load(laps=True)
telemetry = session.laps.pick_driver("LEC").get_telemetry()
telemetry_json = telemetry.to_json(orient="columns")

print(telemetry_json)