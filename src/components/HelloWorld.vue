<template>
  <div >
    <!-- <button @click="signOut()"> signout </button>
    <img :src="photoURL"> <br>
    {{ displayName }} -->
            <div class="columns">
      <div class="column">
          <h1 style=" float: left;"> MENU </h1>
      </div>
      <div class="column" v-if = "login === 'false'">
          <h1  style=" float: right;">
            <a class="button is-large" @click="sign()">
            <span class="icon is-medium">
             <i class="fab fa-github"></i>
            </span>
            <span>LOGIN</span>
            </a>
            <a class="button is-large" @click="loginnn()">
            <span class="icon is-medium">
             <i class="fab fa-github"></i>
            </span>
            <span>ADMIN</span>
            </a>
          </h1>
      </div>
      <div class="column" v-if = "login === 'true'">
          <h1  style=" float: right;">
            <a class="button is-large" @click="signOut()">
            <span class="icon is-medium">
             <i ><img :src="photoURL"></i>
            </span>
            <span>LOGOUT</span>
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
                  <center>
                    <a class="button is-hovered" @click="add(menu.name,menu.price,menu.image,key)">
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
import firebase from 'firebase'
const swal = require('sweetalert2')
var config = {
  apiKey: 'AIzaSyDgYgfnjiyffPJzD4Pqjt3f-nXfTGW6_Ko',
  authDomain: 'store-a7427.firebaseapp.com',
  databaseURL: 'https://store-a7427.firebaseio.com',
  projectId: 'store-a7427',
  storageBucket: 'store-a7427.appspot.com',
  messagingSenderId: '356296828842'
  }
  firebase.initializeApp(config)
  var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
export default {
  data () {
    return {
      show: '',
      displayName: '',
      photoURL: '',
      login: 'false',
      list: {
        userfacebook: '',
        name: '',
        number: '',
        price: ''
      },
      showfacebook: '',
      facebook: {
        name: ''
      }
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
      firebase.database().ref('facebook').once('value').then(function (snapshot) {
        that.showfacebook = snapshot.val()
      })
    },
    async loginnn () {
      console.log('sdfsdf')
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
    sign () {
      var vm = this
      var check = true
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        vm.displayName = user.displayName
        vm.photoURL = user.photoURL
        vm.login = 'true'
        for (var mai in vm.showfacebook) {
        if (vm.displayName === vm.showfacebook[mai].name) {
          check = false
          console.log(check)
        }
      }
      if(check === true) {
        vm.facebook.name = user.displayName
        firebase.database().ref('/facebook/').push(vm.facebook)
      }
      }).catch(function (error) {
        console.log(error)
      })
    },
    signOut () {
      var vm = this
      firebase.auth().signOut().then(function () {
        vm.displayName = ''
        vm.photoURL = ''
        vm.login = 'false'
      }, function (error) {
      })
    },
    async add (name1, price,img, key) {
      if (this.login === 'false'){
        swal({
          type: 'warning',
          title: 'Please login Facebook.',
          showConfirmButton: false,
          timer: 2000
        })
      }
      if (this.login === 'true'){
        this.list.name = name1
        this.list.userfacebook = this.displayName
        const {value: num} = await swal({
          title: name1,
          text: 'ราคา ' + price + 'บาท',
          input: 'number',
          imageUrl: img,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          inputAttributes: {
            min: 1,
            max: 500,
            step: 1
          },
          inputPlaceholder: 'Enter your number',
          showCancelButton: true,
          inputValidator: (value) => {
            return !value && 'You need to write something!'
          }
        })

        this.list.number = num
        this.list.price = price * num
        if (num) {
          swal({type: 'success', title: 'Hi, ' + num})
          console.log('aa' + price * name)
          console.log('bb' +  this.list.price)
          firebase.database().ref('/user/').push(this.list)
        }

        // this.list.name = name
        // this.list.number = number
        // this.list.price = price
        // firebase.database().ref('/user/' + this.displayName).push(this.list)
        // this.pullData()
      }
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
