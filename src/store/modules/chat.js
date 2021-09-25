import ChatService from '../../services/chat.service'

const state = {
    chat:[  ]
}

const getters = {
    getChats : state => state.chat
}

const actions = {
     fetchAllChat(_, pagination){
         return ChatService.getAllChat(pagination).then(
            response => {
                // const sortedData = response.sort(function(a,b){
                //     return new Date(a['Created At']) - new Date(b['Created At']);
                //   })
                  return Promise.resolve(response)
            },
        error => {
            return Promise.reject(error)
        }
            
        )
    },
    setChat({commit},chats){
            commit('chatFetched', chats)
    },
    createChat(_, message){
            return ChatService.createChat(message).then(response=> {
                return response
            })
    }
}

const mutations = {
    chatFetched : (state, chats ) => {
        chats.forEach(chat => {
            state.chat.push(chat)
        });
    },
    chatNotFetched: state => state.chat = []
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}