const { promisify } = require('util');
const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del).bind(client);

// Handle Redis connection errors
client.on('error', (error) => {
  console.error('Redis connection error:', error);
});

/**
 * Middleware for automatic caching of GET requests
 * @param {number} duration - Cache TTL in seconds
 */
const cache = (duration = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate a unique cache key based on URL and query parameters
    const cacheKey = `api:${req.originalUrl || req.url}`;
    
    try {
      // Check if data exists in Redis for this key
      const cachedData = await getAsync(cacheKey);
      
      if (cachedData) {
        // Cache hit - return the cached data to the client
        const parsedData = JSON.parse(cachedData);
        return res.json(parsedData);
      }
      
      // Cache miss - store original res.json function
      const originalJson = res.json;
      
      // Override res.json method to intercept the response
      res.json = function(data) {
        // Store the controller's response in Redis with TTL
        setexAsync(cacheKey, duration, JSON.stringify(data))
          .catch(err => console.error('Redis cache storage error:', err));
        
        // Call the original json method with the data
        return originalJson.call(this, data);
      };
      
      // Continue to the controller
      next();
    } catch (err) {
      console.error('Cache middleware error:', err);
      // On error, proceed without caching
      next();
    }
  };
};

// Cache invalidation utility function
const invalidateCache = async (pattern) => {
  try {
    await delAsync(pattern);
  } catch (err) {
    console.error('Cache invalidation error:', err);
  }
};

module.exports = { cache, invalidateCache };
