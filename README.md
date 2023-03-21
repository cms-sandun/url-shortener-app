## Demo URL : http://13.215.145.191

<br /><br />

## Getting Started

### Prerequisites

- You should install docker on your machine (https://docs.docker.com/engine/install/)<br /><br />

### Run the project

1. Clone the project:

git clone https://github.com/cms-sandun/url-shortener-app.git<br />

2. locate the url-shortener-app and run docker commands

```bash
cd url-shortener-app
docker-compose up -d
(if you are using latest docker version : docker compose up -d)
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the app.<br /><br />

### Run tests

1. Run unit tests for API

```bash
cd url-shortener-api
npm install
npm run test
```

2. Run e2e tests for API

```bash
cd url-shortener-api
npm install
npm run test:e2e
```

3. Run unit tests for Web

```bash
cd url-shortener-web
npm install
npm run test
```
