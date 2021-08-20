# [Spree Commerce][1] Provider

A preview integration of Spree Commerce within NextJS Commerce. It supports browsing and searching Spree products and adding products to the cart as a guest user.

## Installation

Start by following the [instructions for setting up NextJS Commerce][2].

Next, setup Spree. The easiest way to run Spree locally is to follow the installation tutorial available at [the Spree Starter GitHub repository][3].

You may have to adjust Spree Starter to allow `localhost` and [CORS][4] requests. Run `docker-compose run web bundle add rack-cors` and:

```ruby
# In config/application.rb add a configuration for CORS:

module SpreeStarter
  class Application < Rails::Application
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: :any
      end
    end
  end
end

# In config/environments/development.rb add 'localhost':

config.hosts << 'localhost'
```

By default, Spree Starter and NextJS Commerce both run on port `3000`. Avoid collisions by running NextJS Commerce on port `4000`:

```json
// In package.json, modify two scripts:
{
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' next dev -p 4000",
    "start": "next start -p 4000",
    ...
  }
  ...
}
```

[1]: https://spreecommerce.org/
[2]: https://github.com/vercel/commerce
[3]: https://github.com/spree/spree_starter
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
