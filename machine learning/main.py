import os
from flask import Flask, flash, jsonify, request, redirect, session
from flask_cors import CORS, cross_origin
import cv2
from object_detector import *
import numpy as np
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = { 'jpg', 'jpeg'}

def getDimensions(filename):
    # Load Object Detector
    detector = HomogeneousBgDetector()

    # Load Image
    #img = cv2.imread("{}.jpg".format(filename))
    img = cv2.imread(filename)
    
    contours = detector.detect_objects(img)

    for cnt in contours:
        # Get rect
        rect = cv2.minAreaRect(cnt)
        (x, y), (w, h), angle = rect
        box = cv2.boxPoints(rect)
        box = np.int0(box)
        
        

        cv2.circle(img, (int(x), int(y)), 5, (0, 0, 255), -1)
        cv2.polylines(img, [box], True, (255, 0, 0), 2)
        cv2.putText(img, "Width {} cm".format(round(w, 1)), (int(x - 100), int(y - 20)), cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)
        cv2.putText(img, "Height {} cm".format(round(h, 1)), (int(x - 100), int(y + 15)), cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)

        return (w, h)


    cv2.imshow("test", img)
    cv2.waitKey(0)


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world(): 
    return "Hello World"

@app.route("/upload-image", methods = ['POST'])
def fun():
    if request.method == "POST":
        if "file1" not in request.files:
            return "there is no file1 in form!"
        file1 = request.files["file1"]
        path = os.path.join(app.config["UPLOAD_FOLDER"], file1.filename)
        file1.save(path)
        print(path)
   
    

    dimens = getDimensions(path)
    print("Width: {}\n Height: {}".format(round(dimens[0] / 38, 2), round(dimens[1] / 38, 2)))
    result = {
        "height": round(dimens[0] / 38, 2),
        "width": round(dimens[1] / 38, 2)
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)



