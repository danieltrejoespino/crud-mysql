const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false // Ignora los certificados autofirmados
});

const webhookImp = {
  test : async (objData) => {
    const url = 'https://webhook.site/5c5b2a1e-9093-4403-8549-8a77fd746136'

      const {data} = await axios.post(url, objData, {
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent: agent 
      });

    return data
  }

}

module.exports= {
  webhookImp
}