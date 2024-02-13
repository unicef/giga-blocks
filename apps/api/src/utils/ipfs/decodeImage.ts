const decodeBase64Image = async(dataString) =>{
    if (!dataString) return {type: null, data: null};
    const response:any = {};
    response.type = 'image/png';
    response.data = Buffer.from(dataString, 'base64');
    return response;
  }
export default decodeBase64Image;