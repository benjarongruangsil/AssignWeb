<template>
  <div >
    <button @click="signOut()"> signout </button>
    <img :src="photoURL"> <br>
    {{ displayName }}
            <div class="columns">
      <div class="column">
          <h1 style=" float: left;"> MENU </h1>
      </div>
      <div class="column">
          <h1  style=" float: right;">
            <a class="button is-large" @click="signOut()">
            <span class="icon is-medium">
             <i ><img :src="photoURL"></i>
            </span>
            <span>signOut</span>
            </a>
          </h1>
      </div>
      </div>
      <div class="tabs is-toggle is-fullwidth is-large">
      <ul>
        <li >
          <a>
            <span class="icon"><i class="fas fa-image" aria-hidden="true"></i></span>
            <span>ยำ</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="fas fa-music" aria-hidden="true"></i></span>
            <span>ต้ม</span>
          </a>
        </li>
        <li class="is-active">
          <a>
            <span class="icon"><i class="fas fa-film" aria-hidden="true"></i></span>
            <span>ผัด</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>แกง</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>ทอด</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>ขนมหวาน</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>เครื่องดื่ม</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>สรุปรายการอาหาร</span>
          </a>
        </li>
      </ul>
    </div>
        <div class="columns">
          <div class="column">

            <div class="columnleft " v-for =" (menu,key) in show">
              <div class="box" style="width: 280px; height: 400px;">
                 <img :src="menu.image"style="width: 250px; height: 260px;"><br><br>
                  {{menu.name}}<br><br>
                  <center><a class="button is-hovered">
                    <span class="icon is-small">
                      <i class="fas fa-check"></i>
                    </span>
                    <span>ADD</span>
                  </a></center>
              </div>
           </div>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
const swal = require('sweetalert2')
export default {
  data () {
    return {
      show: '',
      displayName: '',
      photoURL: '',
      login: ''
    }
 },
  created: function () {
    this.pullData()
  },
  methods: {
    pullData: function () {
      let that = this
      firebase.database().ref('menu/firedFood').once('value').then(function (snapshot) {
        that.show = snapshot.val()
      })
    },
    async login () {
      const {value: formValues} = await swal({
        title: 'Login',
        html: '<input id="username" class="swal2-input" Placeholder="Enter your email Username">' + '<input id="password" type="password" class="swal2-input"  Placeholder="Enter your email Password">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('username').value,
            document.getElementById('password').value
          ]
        }
      })
      if (formValues) {
        if(document.getElementById('username').value === 'admin' && document.getElementById('password').value === '1234') {
          this.$router.push({path: '/admin'})
          swal({
            type: 'success',
            title: 'login success!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          swal({
            type: 'warning',
            title: 'fail',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    },
    signOut () {
      var vm = this
      firebase.auth().signOut().then(function () {
        vm.displayName = ''
        vm.photoURL = ''
        vm.login = 'true'
        vm.$router.push({path: '/'})
      }, function (error) {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columnleft {
float: left;
padding: 15px;
margin-left: 10px;

}
</style>
