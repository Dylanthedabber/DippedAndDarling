#!/usr/bin/env python3.11
"""
Image similarity scanner using:
  1. MD5 hash  → exact byte-for-byte duplicates
  2. ResNet50 AI embeddings + cosine similarity → visually similar images

Run:  python3.11 find_duplicates.py
Nothing is deleted — review the report and remove files manually.
"""
import hashlib
import sys
from collections import defaultdict
from pathlib import Path

import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as T
from PIL import Image

# ── Config ────────────────────────────────────────────────────────────────────
IMAGE_DIRS        = ['images']          # folders to scan (relative to this script)
SIMILARITY_CUTOFF = 90                  # % similarity to report (90 = very similar)
IMAGE_EXTS        = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.heic'}
# ──────────────────────────────────────────────────────────────────────────────

BASE = Path(__file__).parent


def collect_images():
    imgs = []
    for d in IMAGE_DIRS:
        folder = BASE / d
        if not folder.exists():
            continue
        for f in sorted(folder.iterdir()):
            if f.suffix.lower() in IMAGE_EXTS:
                imgs.append(f)
    return imgs


def file_md5(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()


# ── AI model setup ────────────────────────────────────────────────────────────
def build_model():
    """Load pretrained ResNet50, strip the classification head → feature extractor."""
    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
    model = nn.Sequential(*list(model.children())[:-1])   # remove final FC layer
    model.eval()
    return model

preprocess = T.Compose([
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406],
                 std=[0.229, 0.224, 0.225]),
])

def embed(model, path):
    """Return a 2048-d unit-normalized feature vector for one image."""
    try:
        img = Image.open(path).convert('RGB')
    except Exception as e:
        return None, str(e)
    tensor = preprocess(img).unsqueeze(0)          # shape: (1, 3, 224, 224)
    with torch.no_grad():
        feat = model(tensor).squeeze()             # shape: (2048,)
    feat = feat / feat.norm()                      # L2-normalize → cosine sim = dot product
    return feat, None


def cosine_similarity_pct(a, b):
    """Cosine similarity as a percentage (100 = identical, 0 = unrelated)."""
    return round(float(torch.dot(a, b).clamp(0, 1).item() * 100), 1)


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    images = collect_images()
    print(f"Scanning {len(images)} images...\n")

    # ── 1. Exact duplicates ────────────────────────────────────────────────────
    md5_map = defaultdict(list)
    for p in images:
        md5_map[file_md5(p)].append(p)

    exact_groups = {k: v for k, v in md5_map.items() if len(v) > 1}

    print('=' * 65)
    print(f'EXACT DUPLICATES  ({sum(len(v)-1 for v in exact_groups.values())} extra copies)')
    print('=' * 65)
    if exact_groups:
        for i, (_, group) in enumerate(exact_groups.items(), 1):
            print(f'\n  Group {i}  — keep one, delete the rest:')
            for f in group:
                print(f'    {f.relative_to(BASE)}')
    else:
        print('  None found.')

    # ── 2. AI visual similarity ────────────────────────────────────────────────
    print('\n' + '=' * 65)
    print(f'AI VISUAL SIMILARITY  (showing pairs ≥ {SIMILARITY_CUTOFF}% similar)')
    print('  Uses ResNet50 deep feature embeddings + cosine similarity')
    print('  100% = visually identical  |  0% = completely different')
    print('=' * 65)

    print('\n  Loading AI model...', end='', flush=True)
    model = build_model()
    print(' done.')

    print(f'  Extracting features from {len(images)} images...')
    embeddings = {}
    skipped = []
    for i, p in enumerate(images):
        feat, err = embed(model, p)
        if feat is None:
            skipped.append((p, err))
        else:
            embeddings[p] = feat
        if (i + 1) % 20 == 0:
            print(f'    {i+1}/{len(images)}')

    if skipped:
        print('\n  Skipped (could not open):')
        for p, e in skipped:
            print(f'    {p.name}: {e}')

    # Build exact-duplicate sets so we don't re-report them
    exact_pairs = set()
    for group in exact_groups.values():
        for i in range(len(group)):
            for j in range(i+1, len(group)):
                exact_pairs.add((str(group[i]), str(group[j])))
                exact_pairs.add((str(group[j]), str(group[i])))

    paths = list(embeddings.keys())
    similar_found = False
    results = []

    for i in range(len(paths)):
        for j in range(i+1, len(paths)):
            a, b = paths[i], paths[j]
            if (str(a), str(b)) in exact_pairs:
                continue
            pct = cosine_similarity_pct(embeddings[a], embeddings[b])
            if pct >= SIMILARITY_CUTOFF:
                results.append((pct, a, b))

    results.sort(key=lambda x: -x[0])   # highest similarity first

    if results:
        for pct, a, b in results:
            similar_found = True
            bar = '█' * int(pct / 5)
            print(f'\n  {pct:5.1f}%  {bar}')
            print(f'    {a.relative_to(BASE)}')
            print(f'    {b.relative_to(BASE)}')
    else:
        print('\n  No visually similar pairs found above the threshold.')

    print('\n\nDone. Nothing was deleted — review above and remove manually.')


if __name__ == '__main__':
    main()
