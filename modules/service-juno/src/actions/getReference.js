import axios from 'axios';
import cheerio from 'cheerio';
import flatten from 'lodash.flatten';
import Joi from 'joi';
import logger from '../utils/logger';
import { baseURL, junoURL, selectors, defaultReturnValue } from '../../config.json';

const client = axios.create({ baseURL });

function getText(item, selector) {
  return item.find(selector).text().toLowerCase();
}

function processResultItem(item, reference) {
  const artists = getText(item, selectors.artists);
  const title = getText(item, selectors.title);
  const price = getText(item, selectors.price);
  const available = getText(item, selectors.available).includes('in stock');
  const url = `${junoURL}${item.find(selectors.url).attr('href')}`;
  const match = flatten([reference.artists]).reduce(
    (acc, artist) => artists.includes(artist.toLowerCase()) && acc,
    true,
  ) && title.includes(reference.title.toLowerCase());
  return {
    artists, title, available, price, match, url,
  };
}

async function handler({ query }) {
  try {
    const qs = [flatten([query.artists]), query.title].join('+').replace(/ /g, '+');
    const $ = cheerio.load((await client.get(qs)).data);
    const match = $('.dv-item')
      .map((i, el) => processResultItem($(el), query))
      .get()
      .find(item => item.match);
    if (match) {
      logger.info(JSON.stringify(match));
      return match;
    }
    return defaultReturnValue;
  } catch (err) {
    logger.error(err);
    return defaultReturnValue;
  }
}

export default {
  method: 'GET',
  path: '/reference',
  config: {
    cors: {
      origin: ['*'],
      headers: ['Origin', 'X-Requested-With', 'Content-Type'],
      credentials: true,
      additionalHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type'],
      additionalExposedHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type'],
    },
    validate: {
      query: {
        artists: Joi.alternatives().try(
          Joi.string(),
          Joi.array().items(Joi.string()),
        ).required(),
        title: Joi.string().required(),
      },
    },
    handler,
    response: {
      status: {
        200: {
          artists: Joi.string().required().allow(null),
          title: Joi.string().required().allow(null),
          available: Joi.bool().required(),
          price: Joi.string().required(),
          match: Joi.bool().required(),
          url: Joi.string().required().allow(null),
        },
      },
    },
  },
};
