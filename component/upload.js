import RNFetchBlob from 'rn-fetch-blob'

let upload = (data) => {
  return RNFetchBlob.fetch('POST', 'http://localhost:5080/upload', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, data);
}

module.exports = upload;