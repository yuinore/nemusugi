#!/usr/bin/env python3
"""
Simple image optimization tool
Converts PNG to JPG and resizes images with configurable settings
"""

import os
import sys
import subprocess
from pathlib import Path

def run_convert(input_path, output_path, max_height, quality):
    """ImageMagickのconvertコマンドを実行"""
    try:
        cmd = [
            'convert',
            input_path,
            '-resize', f'x{max_height}>',  # 高さを指定（幅は自動調整）
            '-quality', str(quality),
            '-interlace', 'Plane',  # プログレッシブJPEGを作成
            '-strip',  # メタデータを削除
            output_path
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            return True
        else:
            print(f"Error converting {input_path}: {result.stderr}")
            return False

    except Exception as e:
        print(f"Error running convert command: {e}")
        return False

def optimize_image(input_path, output_dir, max_height, max_height_2x, quality):
    """画像を最適化（2つのサイズを生成）"""
    input_path = Path(input_path)

    if not input_path.exists():
        print(f"File not found: {input_path}")
        return False

    # 出力ファイル名を決定（PNG→JPG変換）
    base_name = input_path.stem
    ext = 'jpg'

    # 2つのサイズで最適化
    success_count = 0

    # 通常サイズ
    output_name = f"{base_name}.{ext}"
    output_path = Path(output_dir) / output_name

    if run_convert(input_path, output_path, max_height, quality):
        original_size = input_path.stat().st_size
        optimized_size = output_path.stat().st_size
        print(f"✅ {input_path.name} → {output_name} ({max_height}px)")
        print(f"   Size: {original_size/1024:.1f}KB → {optimized_size/1024:.1f}KB")
        success_count += 1

    # 2倍サイズ
    output_name_2x = f"{base_name}@2x.{ext}"
    output_path_2x = Path(output_dir) / output_name_2x

    if run_convert(input_path, output_path_2x, max_height_2x, quality):
        original_size = input_path.stat().st_size
        optimized_size_2x = output_path_2x.stat().st_size
        print(f"✅ {input_path.name} → {output_name_2x} ({max_height_2x}px)")
        print(f"   Size: {original_size/1024:.1f}KB → {optimized_size_2x/1024:.1f}KB")
        success_count += 1

    return success_count > 0

def main():
    # 固定個数の引数を受け取る
    if len(sys.argv) != 6:
        print("Usage: python3 resize.py <input_dir> <output_dir> <max_height> <max_height_2x> <quality>")
        print("Example: python3 resize.py public/images/original public/images 400 800 85")
        sys.exit(1)

    # 引数を取得
    input_dir = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    max_height = int(sys.argv[3])
    max_height_2x = int(sys.argv[4])
    quality = int(sys.argv[5])

    # 入力ディレクトリが存在するかチェック
    if not input_dir.exists():
        print(f"Error: Input directory not found: {input_dir}")
        sys.exit(1)

    # 出力ディレクトリを作成
    output_dir.mkdir(parents=True, exist_ok=True)

    # 画像ファイルを検索
    image_files = list(input_dir.glob('*.png')) + list(input_dir.glob('*.jpg')) + list(input_dir.glob('*.jpeg'))

    if not image_files:
        print(f"No image files found in {input_dir}")
        sys.exit(1)

    print(f"Found {len(image_files)} image files")
    print(f"Input: {input_dir}")
    print(f"Output: {output_dir}")
    print(f"Sizes: {max_height}px and {max_height_2x}px")
    print(f"Quality: {quality}%")
    print("-" * 50)

    success_count = 0

    for img_file in image_files:
        if optimize_image(img_file, output_dir, max_height, max_height_2x, quality):
            success_count += 1
        print()  # 空行を追加

    print(f"Optimization complete: {success_count}/{len(image_files)} files processed successfully")

if __name__ == '__main__':
    main()
