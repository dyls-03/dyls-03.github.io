#!/usr/bin/env python3
"""
generate_photos_json.py

Pre-generate static JSON for each album so your site can stay 100% static.
- Looks for album folders under: images/gallery/<album-id>/
- Writes a `photos.json` file into each album folder.
- Each JSON lists all images in that folder.

Usage:
    python generate_photos_json.py
"""

import json
import os
import re
from pathlib import Path

# CONFIG — adjust if needed
GALLERY_ROOT = Path("images/gallery")
ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

def natural_sort_key(s: str):
    # natural sort: "2" before "10"
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split(r'(\d+)', s)]

def scan_album_folder(album_folder: Path):
    if not album_folder.is_dir():
        return []
    files = []
    for entry in album_folder.iterdir():
        if entry.is_file() and entry.suffix.lower() in ALLOWED_EXT and not entry.name.startswith("."):
            # build forward-slash path relative to project root
            web_path = str(entry.as_posix())
            files.append(web_path)
    files.sort(key=natural_sort_key)
    return files

def main():
    if not GALLERY_ROOT.exists():
        print(f"[!] Gallery root not found: {GALLERY_ROOT.resolve()}")
        return

    albums_processed = 0
    for item in GALLERY_ROOT.iterdir():
        if not item.is_dir():
            continue
        if item.name.lower() in {"covers", "_covers"}:
            continue  # skip cover images folder

        photos = scan_album_folder(item)
        out_file = item / "photos.json"
        with out_file.open("w", encoding="utf-8") as f:
            json.dump({"photos": photos}, f, ensure_ascii=False, indent=2)
        albums_processed += 1
        print(f"[ok] Wrote {out_file} ({len(photos)} photos)")

    if albums_processed == 0:
        print("[!] No album subfolders found under images/gallery/")
    else:
        print(f"[done] Processed {albums_processed} album folder(s).")

if __name__ == "__main__":
    main()
