module.exports = {  
  async afterCreate(event) {   
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
      const logoContent  = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/gm-logo.png')).toString('base64')
      const youtubeContent = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/youtube.png')).toString('base64')
      const instaContent = fs.readFileSync(path.join(__dirname, '/../../../../../public/email-img/insta.png')).toString('base64')
      
      try{
        strapi.plugins['email'].services.email.send(            
          {
            to:  'armine.simonyan100@gmail.com',
            from: 'armine.simonyan100@gmail.com',
            subject: 'Welcome to Strapi',                  
            html: htmlToSend,
            attachments: [
              {
                filename: 'insta.png',
                content: instaContent,
                disposition: 'inline',
                content_id: 'instaImg'

              },
              {
                filename: 'youtube.png',
                content: youtubeContent,
                disposition: 'inline',
                content_id: 'youtubeImg'
              },
            
              {
                filename: 'gm-logo.png',
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
 