# health-dashboard

TODO: screenshot

A dashboard to visualize personal health related information.

## features

Supports:
- history of blood tests or similar (quantitative measurements)

Planned:
- integration with other apps like mood tracker, poop tracker etc

## architecture

This project runs with Docker compose, and is composed by:

- a Grafana instance, to visualize data
- an HTTP API that will serve your data to Grafana
- your data. It should be kept in a private repository, and cloned into this repository before running
- scripts and configs to glue everything together

## how to use it

<small>In the current state, this dashboard is meant to run locally only (because it is not properly secured).</small>

To keep your data private, you should create a private repo with the data, following the structure:
  ```
  - annotations.js (annotations should be used to mark significant events in your life that could change your tests. Like start taking a new drug, or stop smoking)
  - dashboards/ (each file should be JSON model for a Grafana dashboard you want to generate, see https://grafana.com/docs/grafana/latest/reference/dashboard/)
    - <dashboard-file-0>.json
  - metrics/ (each file should contain data for a particular blood test, like your red blood cells)
    - "red blood cells".[js|json]
  ```



See the [examples](./examples) folder to see the sample data (data used if you don't provide your own).

When you have your repo created, run:
  ```shell
  git clone <data repo url> data
  ./scripts/start.sh
  ```

## environment variables

You should create a `.env` file in the root of this project containing the following variables:

```
API_TZ=America/Sao_Paulo # the timezone you are expressing your metric dates in
DATA_PATH=<the path to your data repo, if you followed the instructions should be "data">
```

---
