module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const blobService = require('../blobContainer.js');
   
    storage = new blobService();

    var documentId = storage.uniqueId();

    storage.createContainer(documentId)
        .then( (obj) => {

            obj.sasToken = storage.generateSasToken(documentId);
            obj.test = "howdy";
            
            context.res = {
                body: obj
            };
            context.done();
        })
        .catch((error) => {
            context.res = {
                status: 400,
                body: error
            };
            context.done();
        });

};

