

module.exports = {
	webpack5: true,
	images: {
		domains: ['cdn11.bigcommerce.com', 'cdn.aglty.io'],
	},
	i18n: {
		locales: ['en-US', 'es'],
		defaultLocale: 'en-US',
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = {
				net: 'empty',
				dns: 'empty'
			};
		}

		return config;
	},
	rewrites() {
		return [
			{
				source: '/checkout',
				destination: '/api/bigcommerce/checkout',
			},
			// The logout is also an action so this route is not required, but it's also another way
			// you can allow a logout!
			{
				source: '/logout',
				destination: '/api/bigcommerce/customers/logout?redirect_to=/',
			},
			// Rewrites for /search
			{
				source: '/search/designers/:name',
				destination: '/search',
			},
			{
				source: '/search/designers/:name/:category',
				destination: '/search',
			},
			{
				// This rewrite will also handle `/search/designers`
				source: '/search/:category',
				destination: '/search',
			},
		]
	},
}
