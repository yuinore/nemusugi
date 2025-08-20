#!/bin/bash

set -eu

# 画像最適化ツールのメインスクリプト
# 使用方法: ./resize.sh

INPUT_DIR="public/images/original"
OUTPUT_DIR="public/images"
MAX_HEIGHT=400
MAX_HEIGHT_X2=800
JPEG_QUALITY=85

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="$SCRIPT_DIR/lib/resize.py"

cd "$SCRIPT_DIR"
cd ../../

# Pythonスクリプトが存在するかチェック
if [ ! -f "$PYTHON_SCRIPT" ]; then
    echo "Error: Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# 入力ディレクトリが存在するかチェック
if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Input directory not found: $INPUT_DIR"
    echo "Please create the directory and add your original images there."
    exit 1
fi

# 入力ディレクトリの内容を表示
echo "Input directory contents:"
ls -la "$INPUT_DIR"/*.png 2>/dev/null || echo "No PNG files found"
ls -la "$INPUT_DIR"/*.jpg 2>/dev/null || echo "No JPG files found"
echo ""

# Pythonスクリプトを実行（設定値を引数として渡す）
python3 "$PYTHON_SCRIPT" \
    "$INPUT_DIR" \
    "$OUTPUT_DIR" \
    "$MAX_HEIGHT" \
    "$MAX_HEIGHT_X2" \
    "$JPEG_QUALITY"

# 実行結果をチェック
if [ $? -ne 0 ]; then
    echo "Error: Python script failed with exit code $?"
    exit 1
fi

echo "Image optimization completed successfully!"
