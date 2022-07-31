import cv2
from object_detector import *
import numpy as np





def getDimensions(filename):
    # Load Object Detector
    detector = HomogeneousBgDetector()

    # Load Image
    img = cv2.imread("{}.jpg".format(filename))

    contours = detector.detect_objects(img)

    for cnt in contours:
        # Get rect
        rect = cv2.minAreaRect(cnt)
        (x, y), (w, h), angle = rect
        box = cv2.boxPoints(rect)
        box = np.int0(box)
        
        return (w, h)

        cv2.circle(img, (int(x), int(y)), 5, (0, 0, 255), -1)
        cv2.polylines(img, [box], True, (255, 0, 0), 2)
        cv2.putText(img, "Width {} cm".format(round(w, 1)), (int(x - 100), int(y - 20)), cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)
        cv2.putText(img, "Height {} cm".format(round(h, 1)), (int(x - 100), int(y + 15)), cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)



    cv2.imshow("test", img)
    cv2.waitKey(0)

dimens = getDimensions("1234")

print("Width: {}\n Height: {}".format(round(dimens[0] / 38, 2), round(dimens[1] / 38, 2)))