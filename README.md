[![Quality](https://github.com/690pmb/dsm-landing/actions/workflows/quality.yml/badge.svg)](https://github.com/690pmb/dsm-landing/actions/workflows/quality.yml)
[![Deploy](https://github.com/690pmb/dsm-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/690pmb/dsm-landing/actions/workflows/deploy.yml)

# Synology DSM Landing Page

Simple responsive [Angular](https://angular.io) application built with [Bootstrap](https://getbootstrap.com/) that functions as a landing page to access the [Synology DiskStation Manager](https://www.synology.com/en-us/dsm) services from a Synology NAS.

## Getting Started

### Enabling WebStation

The [WebStation](https://www.synology.com/en-global/dsm/packages/WebStation) package needs to be enabled so that the [nginx](https://www.nginx.com/) will start serving a static page from a shared folder (web by default).

### Configuration

The [Configuration](./src/assets/configuration.json) file allows to configure the applications as follow:

- `title`: Specify the title of the application
- `baseUrl`: Specify the base url of the station (must starts with a dot)
- `date`: Build date to display in the DOM (for debugging purposes)

The list of applications shown in the home page can be configured in the [applications.json](./src/assets/applications.json), the structure is as follows:

- `name`: The name of the application
- `icon`: The icon used for the application using [Fontawesome](https://fontawesome.com/v6/search?m=free).  
  You can either specify the complete tag, e.g. for the github logo `fab fa-github-square`, or for solid icons for instance only `cogs`.
- `url`: The url of the application, none to use the name in lowercase.  
  Final url is the concatenation of `url` with `baseUrl` unless `url` contains `http`, then `url` is only used.
- `color`: The hex color code for the application button, e.g. `8AC8DE` without the hash mark.

Without recompiling nginx on the Synology NAS one can setup a machine in the local network and use the synology NAS directly as a reverse proxy (https://www.synology.com/en-us/knowledgebase/DSM/help/DSM/AdminCenter/application_appportalias).

### Deployment

You can directly deploy the app using docker with the following command:

```bash
docker run --name dsm-landing -e TITLE='"Welcome to my landing page"' -e BASE_URL='".my.domain.com"' -e ENV_VAR=true -d -p 8080:8080 -t pmb69/dsm-landing:0.1.4
```

You could be asked to add this parameter: `--platform linux/arm/v7`  
See [configuration](README.md#Configuration) for the `-e` parameters.

To personalize the shown applications, write your own `applications.json` file and run the following:

```bash
 docker cp /absolute/file/path/to/applications.json dsm-landing:/usr/share/nginx/html/assets
```

To personalize the background image run:

```bash
 docker cp /absolute/file/path/to/kali.png dsm-landing:/usr/share/nginx/html/assets
```

The landing page is now available at `localhost:8080`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build` for a production build.

## Docker build

You can build a docker image of the application by running the following:

```bash
docker build --build-arg GITHUB_DIR=690pmb --build-arg GITHUB_PROJECT=dsm-landing --build-arg GITHUB_HASH=main --build-arg ENV_VAR=true -t dsm-landing https://raw.githubusercontent.com/69pmb/Deploy/main/docker/ng-build/Dockerfile
```

## Docker development deployment

Once the project built, you can start a Docker container using:

```bash
docker run --name dsm-landing -d -v /path/to/dsm-landing/dist:/usr/share/nginx/html -t pmb69/ng-nginx:0.1.1
```
