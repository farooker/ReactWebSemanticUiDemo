import axios from 'axios';

const error ={"status": true,"result": "ไม่สามารถดูรายนี้ได้ พยายามอีกครั้ง" };

async function APIGet(http)
{
  return await axios.get(http)
                    .then(function(response) {
                         return response.data;
                    }).catch(function (e) {
                          return e;
                    });
}
async function APIPost(http,req)
{
  return await axios.post(http,req)
                    .then((response) =>{
                              return response.data;
                    }).catch(function (error) {
                             return error;
                    });
}
async function APIPut(http,req)
{
    return await axios.put(http,req)
                      .then((response) =>{
                                return response.data;
                      }).catch(function (error) {
                                 return error;
    });
}
async function APIdelete(http,req)
{

  return await axios.delete(http+req)
                    .then((response) =>{
                              return response.data;
                    }).catch(function (error) {
                             return error;
                    });
                    
}
export { APIGet,APIPost,APIPut,APIdelete};