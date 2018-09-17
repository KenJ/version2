const azure = require('azure-storage');

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=cfblobsdev;AccountKey=ignqO9BXLr9gCNsGTCBLa7eIj/Vl+M+LMKJC7ADcEW7zorQlxNkKhg1ReKR6g+8dny6lezYc9wtCbdOYJ11xDA==;EndpointSuffix=core.windows.net';
const uploadUrl = 'https://cfblobsdev.blob.core.windows.net/';

const blobService = azure.createBlobService(connectionString);

class blobContainer {

    createContainer (containerName) {
        // based on sample code found here:
        //https://github.com/Azure-Samples/storage-blobs-node-quickstart/blob/master/index.js
        return new Promise((resolve, reject) => {
            blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'container' }, err => {
                if(err) {
                    reject(err);
                } else {

                    resolve({
                        documentId: containerName ,
                        uploadUrl: uploadUrl + containerName
                    });
                }
            });
        });
    };


    generateSasToken(container) {
        // based on sample code here:
        //https://github.com/Azure-Samples/functions-node-sas-token/blob/master/GetSasToken-Node/index.js

        // Create a SAS token that expires in an hour
        // Set start time to fifteen minutes ago to avoid clock skew.
        var startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 15);
        var expiryDate = new Date(startDate);
        expiryDate.setMinutes(startDate.getMinutes() + 60);

        var permissions = "rwdl";

        var sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: permissions,
                Start: startDate,
                Expiry: expiryDate
            }
        };

        var sasToken = blobService.generateSharedAccessSignature(container, null, sharedAccessPolicy);
        return sasToken;
    };

   uniqueId(){
        function chr4(){
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    };
}

module.exports = blobContainer;