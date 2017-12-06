import axios from 'axios';
import Joi from 'joi';
import cheerio from 'cheerio';
import logger from '@findmyrecords/logger';
import { baseURL, selectors, headers, defaultReturnValue } from '../../config.json';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = axios.create({ baseURL, headers });

function getText(item, selector) {
  return item.find(selector).text().toLowerCase();
}

function processResultItem(item) {
  const artists = getText(item, selectors.artists);
  const title = getText(item, selectors.title);
  const price = getText(item, selectors.price).match(/[0-9.]+/)[0];
  const available = !!item.find(selectors.available).length;
  const match = true;
  return {
    artists, title, available, price, match,
  };
}

async function handler({ query }) {
  try {
    const match = (await client.get('/asp/ajax-artist.asp', {
      params: {
        q: query.artists.toString(),
      },
    })).data
      .shift()
      .data
      .find(item =>
        item.secondary.toLowerCase().includes(query.artists.toString().toLowerCase())
        && item.primary.toLowerCase().includes(query.title.toLowerCase()));
    if (match && match.url) {
      const $ = cheerio.load((await axios.get(match.url)).data);
      const result = processResultItem($('body'));
      logger.info(JSON.stringify(result));
      return result;
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
        },
      },
    },
  },
};
