module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const blobService = require('../blobContainer.js');
   
    storage = new blobService();

    if(req.params.id){
        var documentId = req.params.id;

        sasToken = storage.generateSasToken(documentId);

        context.res = {
                body: {sasToken: sasToken}
            };
            context.done();
    }
    else{
        context.res =- {
            status:400,
            body:"please supply an Id parameter"
        };
        context.done();
    }

};
