#!/bin/bash

set -eu

echo "Installing ImageMagick for image optimization..."

# パッケージリストを更新
sudo apt-get update

# ImageMagickをインストール
sudo apt-get install -y imagemagick

# インストール確認
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick installed successfully!"
    convert --version | head -1
else
    echo "❌ ImageMagick installation failed"
    exit 1
fi

echo "Installation complete!"
