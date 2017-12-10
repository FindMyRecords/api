[ ![Codeship Status for FindMyRecords/api](https://app.codeship.com/projects/3e89b780-bdcb-0135-7dd4-3ec1750d8459/status?branch=master)](https://app.codeship.com/projects/259782)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eebc6beef2974765bac57920b3023f8e)](https://www.codacy.com/app/emaincourt/api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=FindMyRecords/api&amp;utm_campaign=Badge_Grade)  

# Find My Records - API

This respository contains all the different services that Find My Records currently supports. Each service will belong to a website and contains its own routes.

## 🚦 Routes

> GET /reference
```javascript
{
  params: {
    title: String,
    artists: String || Array,
  },
}
```

## ⭐️ CI/CD

We use both [CodeShip](https://codeship.com/) for CI and [CircleCI](https://circleci.com) for CD.

When CodeShip is in charge of installing the dependencies, building the project with [BabelJS](https://babeljs.io/) and runs the tests with the delightful [Jest](https://facebook.github.io/jest/) testing framework, CircleCI is in charge of building the new Docker image at each commit and to push it to [DockerHub](https://hub.docker.com/u/findmyrecords/dashboard/).

<p align="center"><img src="https://preview.ibb.co/czrnjb/Screen_Shot_2017_12_10_at_13_06_13.png" width="50%" height="auto" style="margin-left: 50%" /></p>
<p align="center"><img src="https://preview.ibb.co/hQPq4b/Screen_Shot_2017_12_10_at_13_07_13.png" width="50%" height="auto" style="margin-left: 50%" /></p>

We then only need to upgrade the image in use by our services at DigitalOcean running `docker service update --image findmyrecords/service-juno service-juno` for instance.

## 💯 Code quality

For our code quality, we have chosen [Codacy](https://www.codacy.com/). You can see the badge on top of this repository.

<p align="center"><img src="https://preview.ibb.co/fkDBAG/Screen_Shot_2017_12_10_at_13_17_22.png" width="50%" height="auto" style="margin-left: 50%" /></p>

## 📑 Logging

Since our environment is hosted in the cloud, we have chosen to use [Loggly](https://www.loggly.com/) for easily monitor our instances.

<p align="center"><img src="https://preview.ibb.co/djJYPb/Screen_Shot_2017_12_10_at_13_13_49.png" width="50%" height="auto" style="margin-left: 50%" /></p>
