import cv2
import numpy as np
import imageio
from rembg import remove, new_session
import sys

if len(sys.argv) > 2:
    input_path = sys.argv[1]
    output_path = sys.argv[2]
else:
    input_path = "0820.mp4"
    output_path = "public/0820_transparent.webm"

print("Initializing rembg session...")
session = new_session('u2net')

print("Reading video...")
reader = imageio.get_reader(input_path)
meta = reader.get_meta_data()
fps = meta['fps']

print("Configuring writer...")
writer = imageio.get_writer(output_path, fps=fps, format='FFMPEG', codec='libvpx-vp9', pixelformat='yuva420p', macro_block_size=None)

print("Processing frames...")
for i, frame in enumerate(reader):
    if i % 10 == 0:
        print(f"Processing frame {i}...")
    out = remove(frame, session=session)
    writer.append_data(out)

writer.close()
print("Done processing video. Saved to", output_path)
