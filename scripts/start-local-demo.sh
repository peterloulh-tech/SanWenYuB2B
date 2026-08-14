#!/bin/zsh
set -euo pipefail

project_dir=/Users/peterlou/.local/share/salmon-digital-platform/project
node_bin=/opt/homebrew/opt/node@22/bin/node
vite_cli="$project_dir/node_modules/vite/bin/vite.js"

if [[ ! -f "$project_dir/dist/index.html" ]]; then
  print -u2 '生产构建不存在，请先在项目目录执行 pnpm build。'
  exit 66
fi

exec "$node_bin" "$vite_cli" preview \
  --host 127.0.0.1 \
  --port 43991 \
  --strictPort
