// import axios from "axios"
const axios = require('axios')
// https://retoolapi.dev/m89lfD/limechat?_page=2&_limit=10
const API_URI = 'https://retoolapi.dev/m89lfD/'

class ChatService {
    getAllChat (pagination){
        return axios.get(API_URI + `limechat?_page=${pagination.page}&_limit=${pagination.limit}`).then(
                response=> {
  if(response.status === 200){
      return response.data
  }    
            }
        
        )
    }
    createChat(message){
        return axios.post(API_URI, message, {
            headers : {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                return response.data
            }  
        })
    }

}

export default new ChatService()