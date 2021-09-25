<template>
  <div class="container pt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h2 >Chat Header</h2></div>
          <div class="card-body chat-container">
            <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>
              <div :class="['chat', message['Message Type'] == 0 ? 'left': 'right']" v-for="message in getChats" :key="message.id">
                <div class="chat-body">
                  <p class="text">{{message['Content']}}</p>
                </div>
                <span class="badge bg-warning text-dark">{{message["Created At"] | moment}}</span>
              </div>
          </div>
          <div class="card-footer">
              <div class="input-group">
  <input type="text" class="form-control" placeholder="Type..." v-model="userMessage">
  <button class="btn btn-primary" type="button" id="button-addon2" @click="handleChatSubmit">Send</button>
</div>
          </div>
        </div>
        <div v-if="success" class="alert alert-success mt-4" >

          Message created
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import moment from "moment"
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'Home',
    components: {
    InfiniteLoading,
  },
  data(){
    return {
      userMessage:null,
      success:false,
      pagitnation:{
        page:1,
        limit:15
      }
    }
  },
  filters:{
     moment: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }
  },

  created(){
      
  },
  mounted(){
  },
  computed:{
    ...mapGetters('chat', ['getChats'])
  },

  methods:{
    infiniteHandler($state){
      this.fetchAllChat(this.pagitnation).then( chats=>{
        if(chats.length> 0){
         this.pagitnation.page +=1
            this.setChat(chats)
               $state.loaded();
        }else{
          $state.complete();
        }
      })
    },
    handleChatSubmit(){
      if(this.userMessage){
        this.success = null
        const date = new Date().toISOString()
        const message = {
          "Content":this.userMessage, "Created At": date, "Updated At": date
        }
        this.createChat(message).then(res=>{
          console.log(res);
          this.success = true
        })
      }
    },
    ...mapActions('chat', ['fetchAllChat','setChat','createChat'])
  }

}
</script>

<style lang="scss">
.chat-container{
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
}
.chat{
  margin-bottom: 16px;
  max-width: 80%;
  width: 100%;
  &.left{
    float: left;
    .badge{
      float: right;
    }
  }
  &.right{
    float: right;
    .chat-body{
      background-color: tomato;
    }
  }
  .chat-body{
    background-color: aqua;
    padding: 5px 10px;
    border-radius: 6px;
    margin-bottom: 5px;
  }
}
</style>