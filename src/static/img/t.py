from PIL import Image, ImageFilter, ImageDraw, ImageEnhance

img = Image.open("seed_638860_00000.jpg")
img1 = Image.new("RGB", img.size, (218, 222, 220))
w, h = img.size
mask_im = Image.new("L", img.size, 0)
draw = ImageDraw.Draw(mask_im)
draw.rectangle((40, 40, w - 40, h - 40), fill=255)
mask_im_blur = mask_im.filter(ImageFilter.BoxBlur(80))
img1.paste(img, (0, 0), mask=mask_im_blur)
img1.show()
img1.save("2.jpg")
