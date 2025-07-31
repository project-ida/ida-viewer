# Project Ida Viewer
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)

Web-based image viewer for optical microscopy, SEM, and other scientific imaging equipment

## Components
### API

### Web

## Development & Deployment
### Environmental Variables
- `NODE_ENV`: determines status of application, the frontend will be served by backend server (as opposed to running on its own port) in production, options are `development` and `production`, defaults to `development`

- `API_PORT`: port to bind backend server, serves the frontend in production, defaults to `8080`
- `API_DATA_PATHS`: path(s) on server to store image folders/subfolders, seperate multiple paths by colons, absolute paths are preferable, relative paths start in the `api` folder, defaults to `../data/`

- `VITE_DEV_API_URL`: url for api while in development mode (ie. `NODE_ENV=development`), production apps will use `/api/*` routes instead, defaults to `localhost:8080`


