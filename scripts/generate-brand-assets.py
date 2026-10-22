#!/usr/bin/env python3
# Fontify Generator
# Copyright (c) 2025-2026 PsyGioX
# https://github.com/PsyGioX/fontify-generator

"""Generates the Fontify favicon set, app icons and the social preview image.

Usage:  python3 scripts/generate-brand-assets.py
Needs:  Pillow, numpy (pip install pillow numpy)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)

C1 = (99, 102, 241)   # indigo-500
C2 = (192, 38, 211)   # fuchsia-600

# Glyph geometry in a 64x64 design grid (kept in sync with public/favicon.svg and src/components/Logo.tsx)
OUTER = [(12, 50), (28.5, 12), (35.5, 12), (52, 50), (44.6, 50), (41.4, 42.2), (22.6, 42.2), (19.4, 50)]
INNER = [(25.5, 36), (38.5, 36), (32, 21)]
GUIDES = [12, 50]


def gradient(w, h, c1=C1, c2=C2):
    y, x = np.mgrid[0:h, 0:w]
    t = (x / max(w - 1, 1) + y / max(h - 1, 1)) / 2
    arr = np.zeros((h, w, 3), dtype=np.float32)
    for i in range(3):
        arr[..., i] = c1[i] + (c2[i] - c1[i]) * t
    return Image.fromarray(arr.astype(np.uint8), "RGB").convert("RGBA")


def tile(size, radius=0.235, glyph=1.0):
    """Gradient tile with the A glyph. radius=0 gives a full-bleed square."""
    ss = 4
    big = size * ss
    img = gradient(big, big)
    s = big / 64
    cx = 32
    sc = lambda p: ((cx + (p[0] - cx) * glyph) * s, (32 + (p[1] - 32) * glyph) * s)

    overlay = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for gy in GUIDES:
        y = (32 + (gy - 32) * glyph) * s
        od.line([(8 * s, y), (56 * s, y)], fill=(255, 255, 255, 90), width=max(int(s * 1.0), 1))
    img = Image.alpha_composite(img, overlay)

    mask = Image.new("L", (big, big), 0)
    md = ImageDraw.Draw(mask)
    md.polygon([sc(p) for p in OUTER], fill=255)
    md.polygon([sc(p) for p in INNER], fill=0)
    white = Image.new("RGBA", (big, big), (255, 255, 255, 255))
    img.paste(white, (0, 0), mask)

    if radius > 0:
        rmask = Image.new("L", (big, big), 0)
        ImageDraw.Draw(rmask).rounded_rectangle([0, 0, big - 1, big - 1], radius=int(big * radius), fill=255)
        img.putalpha(rmask)
    return img.resize((size, size), Image.LANCZOS)


def font(name, size):
    base = "/usr/share/fonts/truetype/dejavu/"
    return ImageFont.truetype(base + name, size)


def og_image():
    w, h = 1200, 630
    ss = 2
    W, H = w * ss, h * ss
    bg = gradient(W, H, (15, 15, 35), (38, 20, 70))

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W * 0.55, -H * 0.35, W * 1.15, H * 0.55], fill=(99, 102, 241, 90))
    gd.ellipse([W * 0.7, H * 0.45, W * 1.2, H * 1.2], fill=(192, 38, 211, 70))
    from PIL import ImageFilter
    glow = glow.filter(ImageFilter.GaussianBlur(120 * ss))
    img = Image.alpha_composite(bg, glow)
    d = ImageDraw.Draw(img)

    # logo + brand
    logo = tile(120 * ss)
    img.alpha_composite(logo, (72 * ss, 64 * ss))
    d.text((216 * ss, 80 * ss), "Fontify", font=font("DejaVuSans-Bold.ttf", 76 * ss), fill=(255, 255, 255, 255))

    # headline
    d.text((72 * ss, 250 * ss), "Web Font Generator", font=font("DejaVuSans-Bold.ttf", 84 * ss), fill=(255, 255, 255, 255))
    sub = font("DejaVuSans.ttf", 34 * ss)
    d.text((72 * ss, 366 * ss), "CSS, HTML & Tailwind code for Google Fonts", font=sub, fill=(203, 205, 255, 255))
    d.text((72 * ss, 414 * ss), "and your own TTF / OTF / WOFF / WOFF2 files", font=sub, fill=(203, 205, 255, 255))

    # specimen chips (drawn on an overlay so the translucent fill blends)
    chips = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(chips)
    x = 72 * ss
    y = 500 * ss
    specs = (
        ("Aa", font("DejaVuSans-Bold.ttf", 44 * ss)),
        ("Aa", font("DejaVuSerif-Bold.ttf", 44 * ss)),
        ("Aa", font("DejaVuSansMono.ttf", 44 * ss)),
    )
    for label, f in specs:
        box = (x, y, x + 120 * ss, y + 76 * ss)
        cd.rounded_rectangle(box, radius=18 * ss, fill=(255, 255, 255, 28), outline=(255, 255, 255, 70), width=2 * ss)
        tw = cd.textlength(label, font=f)
        cd.text((x + (120 * ss - tw) / 2, y + 8 * ss), label, font=f, fill=(255, 255, 255, 255))
        x += 140 * ss
    img = Image.alpha_composite(img, chips)
    d = ImageDraw.Draw(img)

    d.text((72 * ss + 3 * 140 * ss + 20 * ss, y + 20 * ss), "github.com/PsyGioX/fontify-generator", font=font("DejaVuSans.ttf", 26 * ss), fill=(170, 172, 230, 255))

    img.convert("RGB").resize((w, h), Image.LANCZOS).save(PUBLIC / "og-image.png", optimize=True)


def main():
    tile(512).save(PUBLIC / "icon-512.png", optimize=True)
    tile(192).save(PUBLIC / "icon-192.png", optimize=True)
    tile(512, radius=0, glyph=0.66).save(PUBLIC / "icon-maskable-512.png", optimize=True)
    tile(180, radius=0).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    tile(32).save(PUBLIC / "favicon-32.png", optimize=True)
    sizes = [(16, 16), (32, 32), (48, 48)]
    tile(256).save(PUBLIC / "favicon.ico", sizes=sizes)
    og_image()
    print("Brand assets written to", PUBLIC)


if __name__ == "__main__":
    main()
