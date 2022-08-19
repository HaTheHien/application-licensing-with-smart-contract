module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "constants": require.resolve("constants-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "path": require.resolve("path-browserify"),
    "url": require.resolve("url")
  })
  config.resolve.fallback = fallback;

  config.ignoreWarnings = [/Failed to parse source map/];
  return config;

}
