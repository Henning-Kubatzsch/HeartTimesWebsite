from PIL import Image

# Original öffnen
img = Image.open("logo.png").convert("RGBA")

# Ziel-Farbe (R,G,B)
target_color = (255, 54, 250)

# Neue Pixel-Liste
pixels = []
for r,g,b,a in img.getdata():
    # nur einfärben, wenn Pixel nicht transparent
    if a > 0:
        pixels.append((*target_color, a))
    else:
        pixels.append((r,g,b,a))

# Neues Bild speichern
new_img = Image.new("RGBA", img.size)
new_img.putdata(pixels)
new_img.save("logo_recolored.png")