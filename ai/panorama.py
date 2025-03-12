import glob # for working with files 
import cv2

# create a folder 'images' in the same directory as this file(code)
# could be jpeg or any
# also you can modify it with buil-in func any()
# to access any extension 
path = glob.glob('images/*.jpeg')
imgs = []

for i in path:
    img = cv2.imread(i)
    imgs.append(img)
    cv2.imshow("Image", img)
    cv2.waitKey(0)

stitcher = cv2.Stitcher_create()
err, stt_img = stitcher.stitch(imgs)

if not err:
    cv2.imwrite('Panorama.png', stt_img)
    cv2.imshow('Stitched image', stt_img)
    cv2.waitKey(0)
    