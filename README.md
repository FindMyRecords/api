[ ![Codeship Status for FindMyRecords/api](https://app.codeship.com/projects/3e89b780-bdcb-0135-7dd4-3ec1750d8459/status?branch=master)](https://app.codeship.com/projects/259782)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eebc6beef2974765bac57920b3023f8e)](https://www.codacy.com/app/emaincourt/api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=FindMyRecords/api&amp;utm_campaign=Badge_Grade)  

# Find My Records - API

This respository contains all the different services that Find My Records currently supports. Each service will belong to a website and contains its own routes.

## Routes

> GET /reference
```javascript
{
  params: {
    title: String,
    artists: String || Array,
  },
}
```