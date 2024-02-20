// setupProxy.js;
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	// app.use(
	// 	createProxyMiddleware('/oauth/callback/kakao', {
	// 		target: 'https://localhost:3000',
	// 		changeOrigin: true
	// 	})
	// );
	app.use(
		createProxyMiddleware('/api', {
			target: 'https://minheeyoo88.pythonanywhere.com',
			changeOrigin: true, // server 올린때 false
			secure: false
		})
	);
};

// target: 'https://121.140.7.121:1444',
// https://minheeyoo88.pythonanywhere.com/api/swagger?format=openapi
