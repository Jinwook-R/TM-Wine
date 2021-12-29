
TM-wine - v1 TM-wine_dataset1
==============================

This dataset was exported via roboflow.ai on December 27, 2021 at 12:28 PM GMT

It includes 612 images.
Wine are annotated in YOLO v5 PyTorch format.

The following pre-processing was applied to each image:
* Auto-orientation of pixel data (with EXIF-orientation stripping)
* Resize to 416x416 (Stretch)
* Grayscale (CRT phosphor)
* Auto-contrast via adaptive equalization

The following augmentation was applied to create 3 versions of each source image:
* 50% probability of horizontal flip
* 50% probability of vertical flip
* Randomly crop between 0 and 20 percent of the image
* Random rotation of between -15 and +15 degrees


