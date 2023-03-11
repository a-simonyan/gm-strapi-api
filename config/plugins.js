module.exports = ({ env }) => ({
  
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: env('EMAIL_FROM'),
          defaultReplyTo: env('EMAIL_TO'),
        },
      },
    },

    upload: {
      config: {
        providerOptions: {
          localServer: {
            maxage: 300000
          },
        },
        config: {
          sizeLimit: 250 * 1024 * 1024 
        }
      },
    }
  
  });

