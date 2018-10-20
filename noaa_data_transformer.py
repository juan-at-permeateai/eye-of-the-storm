import json
import cv2
#from xml.dom import minidom
#pip install noaa-sdk
from noaa_sdk import noaa
n  = noaa.NOAA()

#parameter is  zipcode, country
 n.get_observations('33432','US')