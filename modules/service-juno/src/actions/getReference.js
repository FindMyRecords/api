import axios from 'axios';
import Boom from 'boom';
import cheerio from 'cheerio';
import flatten from 'lodash.flatten';
import Joi from 'joi';
import { baseURL, selectors } from '../../config.json';

const client = axios.create({ baseURL });

function getText(item, selector) {
  return item.find(selector).text().toLowerCase();
}

function processResultItem(item, reference) {
  const artists = getText(selectors.artists);
  const title = getText(selectors.title);
  const price = getText(selectors.price);
  const available = getText(selectors.available).includes('in stock');
  const match = flatten([reference.artists]).reduce(
    (acc, artist) => artists.includes(artist.toLowerCase()) && acc,
    true,
  ) && title.includes(reference.title.toUpperCase());
  return {
    artists, title, available, price, match,
  };
}

export default {
  method: 'GET',
  path: '/reference',
  handler: async ({ query }) => {
    try {
      const qs = [flatten([query.artists]), query.title].join('+').replace(/ /g, '+');
      const $ = cheerio.load((await client.get(qs)).data);
      const match = $('.dv-item')
        .map((i, el) => processResultItem($(el), query))
        .get()
        .find(item => item.match);
      if (match) {
        return match;
      }
      return {};
    } catch (err) {
      return Boom.boomify(err);
    }
  },
  config: {
    validate: {
      query: {
        artists: Joi.alternatives().try(
          Joi.string().required(),
          Joi.array().items(Joi.string()),
        ),
        title: Joi.string().required(),
      },
    },
    response: {
      status: {
        200: {
          artists: Joi.string().required(),
          title: Joi.string().required(),
          available: Joi.bool().required(),
          price: Joi.string().required(),
          match: Joi.bool().required(),
        },
        204: Joi.object().empty(),
      },
    },
  },
};
