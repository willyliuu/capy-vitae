import os
from rembg import remove
from PIL import Image

mascot_dir = "public/assets/mascot"
images = ["default.png", "thinking.png", "celebrating.png", "confused.png"]

for img_name in images:
    path = os.path.join(mascot_dir, img_name)
    if os.path.exists(path):
        print(f"Processing {img_name}...")
        input_image = Image.open(path)
        output_image = remove(input_image)
        output_image.save(path)
        print(f"Saved {img_name} with transparent background.")
    else:
        print(f"File not found: {path}")

print("Done!")
