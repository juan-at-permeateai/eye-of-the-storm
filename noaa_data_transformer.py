import json
import os
#pip install noaa-sdk
from noaa_sdk import noaa
os.chdir( r"C:\Users\Jean\Documents\Python_Programming\eye-of-the-storm")
n  = noaa.NOAA()

observations = n.get_observations('33432','US',
                                  start='2018-01-01',
                                  end='2018-10-12')
#boca raton zip code: all NOAA capture dates seem to be on May 14 2018
with open("noaa_boca_2018.json", "a") as write_file:
    for observation in observations:
        json.dump(observation, write_file)
        

