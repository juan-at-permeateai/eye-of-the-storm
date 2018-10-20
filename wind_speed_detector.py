# USAGE
# (c) 2018 - EDWIN A HERNANDEZ
# For demonstration purposes only
# python wind_speed_detector.py
# python wind_speed_detector.py --video videos/example_01.mp4

# import the necessary packages
import argparse
import datetime
import random
import imutils
import time
import cv2
import json
from math import log
import numpy as np

def process_rects(rects):
   return True	


def dump_json_file(data, filename_name):
	outfile =  open(filename_name+".json", "w") 
	json.dump(data, outfile)
	outfile.close()
	

def wind_speed(rate):
   FACTOR = 0.8
   # (1-FACTOR)*Fn-1+ FACTOR* Mn
   rate_to_use = (1-FACTOR)*rate[1] + FACTOR*rate[0];	
   if (0 <= rate_to_use < 4.0):
         return 150*rate_to_use/4.0;
   else:
         return 0.0
  
def write_to_file(cv2, filename):
   print ("written...")
   return 

def number_intersects(conts):
       i=0
       for c in conts:
          nIntersections = 0;
          original = c;
          (x,y, w, h) = cv2.boundingRect(c)
          for j in range(0,  w*h): 
              if (j == i): 
                    continue
              #match = cv2.boundingRect(conts[i])
              if (np.logical_and(original,match)):
                  nIntersections+=1
	          ## if you only want to know whether intersections appear or not, you can stop the inner for-loop here, by using j=boundRect.size(); continue; or break;            
          i+=1
       return nIntersectons    

def init_array_of_rects(h_data):
	h_data = []
	MAX = int (10*log(1000*1000));
	for i in range(MAX+1):
		h_data.append(0);
	return h_data;

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video", help="path to the video file")
ap.add_argument("-a", "--min-area", type=int, default=500, help="minimum area size")
ap.add_argument("-l", "--loop",  help="video on a loop")
ap.add_argument("-x", "--long",  help="Longiture")
ap.add_argument("-y", "--lat",   help="latitute")
ap.add_argument("-n", "--name",  help="name")

args = vars(ap.parse_args())

loop = True;

MAX_N = 0;
N     = MAX_N  # Skip every Nth FRame

sequence_speed = []

data_json = {"name" : "video1.mp4", "lat": "-90",  "long" : "-20",  "data" : sequence_speed }; 

while loop:
	if args.get("video", None) is None:
        	camera = cv2.VideoCapture(0)
        	time.sleep(0.25)
	else:
        	camera = cv2.VideoCapture(args["video"])

	w  = camera.get(3)   # float
	width = int(w)
	h = camera.get(4) # float
	height = int(h)
	print ("Dimensions = "+str(width)+"x"+str(height))
	#vidwrite = cv2.VideoWriter('outvideo.mp4', cv2.VideoWriter_fourcc(*'H', '2', '6', '4'), 25, 
        #   (width, height),True)
 
	if args.get("name", None) is None:
		data_json["name"] = "video1000"
	else:
		data_json["name"] = args["name"]


	if args.get("lat", None) is None:
                data_json["lat"] = "-90"
	else:
		data_json["lat"] = args["lat"]


	if args.get("long", None) is None:
                data_json["long"] = "-90"
	else:
		data_json["long"] = args["long"]

		
	if args.get("loop", None) is None:
		loop = False;

 	# initialize the first frame in the video stream
	firstFrame =  None
	frame_id   =  0;
	hmap       =  []
	rects      =  []
	means      =  []
	prev_rate  =  0
  	# loop over the frames of the video
	while True:
		# grab the current frame and initialize the occupied/unoccupied
		# text
		(grabbed, frame) = camera.read()
		text = " Anemometer Detector"

		# if the frame could not be grabbed, then we have reached the end
		# of the video
		if not grabbed:
			break

		frame_id = frame_id + 1

		# resize the frame, convert it to grayscale, and blur it
		frame = imutils.resize(frame, width=1000)
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		gray = cv2.GaussianBlur(gray, (21, 21), 0)

		# if the first frame is None, initialize it
		if firstFrame is None:
			firstFrame = gray
			continue
		count = 0;
		while (count < N) :
			count = count + 1
			(grabbed, frame) = camera.read();
			if not grabbed:
				break;
		N=MAX_N
				
		# compute the absolute difference between the current frame and
		# first frame
		frameDelta = cv2.absdiff(firstFrame, gray)
		#thresh = cv2.threshold(frameDelta, 180, 255, cv2.THRESH_BINARY)[1]

		thresh = cv2.adaptiveThreshold(frameDelta, 180, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 155, 0)

		# dilate the thresholded image to fill in holes, then find contours
		# on thresholded image
		# thresh = cv2.dilate(thresh, None, iterations=2)
		(_, cnts, _) = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
			cv2.CHAIN_APPROX_SIMPLE)

		rects = [];

		#        500, 1000,

		if (len(hmap)==0): 
			hmap=init_array_of_rects(hmap);
			print("HMAP is "+str(len(hmap)))

		c_rect = 0;
		c_square = 0;
		hmap = [0, 0]
		# loop over the contours
		for c in cnts:
			# if the contour is too small, ignore it
			if cv2.contourArea(c) < args["min_area"]:
				continue

			# compute the bounding box for the contour, draw it on the frame,
			# and update the text
			(x, y, w, h) = cv2.boundingRect(c)
		
			if (w/h>=1.25): #  h/w>=2):
				 c_rect    +=1;
			else:
				 c_square  += 1		
			cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
			rects.append((x,y,w,h));
		#	pos = int(log(w*h)*10);
		#	print("Position = "+(str(pos))+" with "+str(w)+", "+str(h))
		#	hmap[0s] +=1
			

		hmap[0] += c_rect;
		hmap[1] += c_square
		rate    = 0.0 			
		#rects.append(number_intersects(cnts));
		if (hmap[1]>0):	
		    #print("frame_id :"+str(frame_id))
	 	    #print (hmap[0]/hmap[1]);
		    rate = hmap[0] / hmap[1] 	 	

	#	if (frame_id >=600):		
	#			print(hmap)
	#			exit;


		text = "Detecting Hurricane Winds... " +str(rate)+"  in "+str(wind_speed((rate, prev_rate)))+" MPH";
		prev_rate = rate
		means.append(wind_speed((rate, prev_rate)));

		if (len(means)>=30):
			average_speed = np.mean(means);
			data_json["data"].append(average_speed);
			means=[]

		
		# print(rects)
		# print(hmap)	

		# draw the text and timestamp on the frame

		direction = ["78", "80", "82", "84", "90", "90", "90", "92", "95", "98"];
		direction = random.choice(direction)

		cv2.putText(frame, "Wind Direction is: {} : {}".format(direction, text), (10, 20),
		cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
		cv2.putText(frame, datetime.datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"),
			(10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)


		# print ("Writing frame "+str(frame_id))

		# show the frame and record if the user presses a key
		# frame = imutils.resize(frame, width=640, height=480)
		# vidwrite.write(frame)
		cv2.imwrite("videos/img%04i.jpg"%frame_id, frame)
		cv2.imshow("Wind Velocity", frame)
		cv2.imshow("Gray", gray)
		cv2.imshow("Threshold", thresh)
		cv2.imshow("Frame Delta", frameDelta)

		key = cv2.waitKey(1) & 0xFF

		# if the `q` key is pressed, break from the lop
		if key == ord("q"):
			break


dump_json_file(data_json, data_json["name"]);
# cleanup the camera and close any open windows
camera.release()
vidwrite.release()
cv2.destroyAllWindows()
