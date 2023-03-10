module.exports = {  
  async afterCreate(event) {    // Connected to "Save" button in admin panel   
    const { result } = event;
    const fs = require('fs');
    const handlebars = require('handlebars');
    const path =require('path')


    const readHTMLFile = function(path, callback) {

      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
              callback(err); 
              throw err;
                
            }
            else {
              callback(null, html);
            }
        });
    };

    readHTMLFile(__dirname + '/emailTemplate/emailTemplate.html', function(err, html) {

    
      if(err){
        return ({msg: "Invalid path", err})
      }
      const template = handlebars.compile(html);
      
      const replacements = {
        firstName: result.firstName,
        lastName: result.surname,
        description: result.description
      };
      const htmlToSend = template(replacements)
      const logoContent  = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/logo.png')).toString('base64')
      const phoneContent = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/phone.png')).toString('base64')
      const emailContent = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/email.png')).toString('base64')
      
      try{
        strapi.plugins['email'].services.email.send(            
          {
            to: 'artavazdavagyan.arnology@gmail.com',
            from: 'artavazdavagyan.arnology@gmail.com',
            subject: 'Welcome to Strapi',                  
            html: htmlToSend,
            attachments: [
              {
                filename: 'email.png',
                content: emailContent,
                disposition: 'inline',
                content_id: 'emailImg'

              },
              {
                filename: 'phone.png',
                content: phoneContent,
                disposition: 'inline',
                content_id: 'phoneImg'
              },
            
              {
                filename: 'logo.png',
                content:  logoContent,
                disposition: 'inline',
                content_id: 'logoImg'
              }
            ]
        
          }              
        )
      } catch(err) {
        console.log(err);
      }      
        
    })

  }
}
 