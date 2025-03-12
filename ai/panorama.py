import glob
import cv2

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
    