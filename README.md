# health-dashboard

A dashboard for visualization of personal health data.

![health-dashboard](https://user-images.githubusercontent.com/4842605/81372843-b6f07d00-90d1-11ea-9e29-d2d40b2cf435.png)

Supports:
- metrics for quantitative measurements. You can use metrics for anything you want, like blood tests, mood tracking, poop tracking, water consumption, urine tests, whathever you would like to visualize.
- annotations for medical history (medicines, treatments, surgeries etc)

## how to use it

This requires `docker-compose` installed.

```sh
git clone git@github.com:rafaeleyng/health-dashboard.git && cd health-dashboard

# create your data repository and clone it instead of the example repo bellow
git clone git@github.com:rafaeleyng/health-dashboard-example-data.git data

./scripts/start.sh
# open http://localhost:3000
```

Click on "Home" at the top to find the created dashboard(s):

![image](https://user-images.githubusercontent.com/4842605/81561243-45326080-9369-11ea-974b-9849e12f2c87.png)

<small>This dashboard is meant to run locally only (because it is not properly secured). Do not deploy it at any public address.</small>

To stop your instance, run:

```sh
./scripts/stop.sh
```

You can also run it in watch mode while creating your personal data repository, so you can see new data added on your data files just by refreshing the Grafana queries:

```sh
./scripts/watch.sh
```

## your medical data

By default, `health-dashboard` runs with dummy data from an example repository.

As stated in the previous section, your should create your own (private!) repository to keep your medical data and clone it as the `data` folder inside the `health-dashboard` project.

Refer to https://github.com/rafaeleyng/health-dashboard-example-data as a guideline of how your data repository should look like.

## environment variables

You can create a `.env` file at the root of this project containing the variables:

```
API_TZ=America/Sao_Paulo # [optional, default is GMT] the timezone you are expressing your metric dates in
DATA_PATH=my-data # [optional, default is `data`] the name of the folder you have cloned your data repository to
```

## project components

This project consists of:
- a Grafana instance, to visualize data
- an HTTP API that will serve your data to Grafana
- your data (in a separate repository that is cloned inside this one) as JSON and/or JavaScript files
- scripts and configs to glue everything together
