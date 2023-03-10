module.exports = ({ env }) => ({
  
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'artavazdavagyan.arnology@gmail.com',
          defaultReplyTo: 'artavazdavagyan.arnology@gmail.com',
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

