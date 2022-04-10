import fastf1

session = fastf1.get_session(2022, "Bahrain Grand Prix", "R")
session.load()

print(session)