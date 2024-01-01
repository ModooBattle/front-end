// setupProxy.js;

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api', {
			// /api/v1
			target: 'https://121.140.7.121/',
			changeOrigin: true, // server 올린때 false
			secure: false
		})
	);
};
