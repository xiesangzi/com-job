<template>
  <div>
    <input type="text" v-model="loginForm.username" placeholder="用户名"/>
    <input type="text" v-model="loginForm.password" placeholder="密码"/>
    <button @click="login">登录</button>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login () {
      var that = this;
      this.$store.dispatch('login', this.loginForm).then(() => {
            that.$router.push({ path: this.redirect || '/' })
          }).catch(err => {
            console.log(err)
          })
    }
  }
};
</script>