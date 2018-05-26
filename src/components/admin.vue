<template>
  <div >
            <div class="columns">
      <div class="column">
          <h1 style=" float: left;">MENU</h1>
      </div>
      <div class="column">
          <h1  style=" float: right;">
          ADMIN
          </h1>
      </div>
      </div>



      <div class="tabs is-toggle is-fullwidth is-large">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon"><i class="fas fa-image" aria-hidden="true"></i></span>
            <span>รายการอาหาร</span>
          </a>
        </li>
        <li>
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
        <li>
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
      </ul>
    </div>

    <div class="columns">
      <div class="column">
        <table>
          <tr  v-for =" (user,key) in facebook">
            <td> {{user.name}}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="column is-three-quarters">is-three-quarters</div>
    </div>


    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
const swal = require('sweetalert2')
export default {
  data () {
    return {
      show: '',
      facebook: '',
      data: {
        name: '',
        price: '',
        image: ''
      }
    }
 },
  created: function () {
    this.pullData()
  },
  methods: {
    pullData: function () {
      let that = this
      firebase.database().ref('menu').once('value').then(function (snapshot) {
        that.show = snapshot.val()
      })
      firebase.database().ref('facebook').once('value').then(function (snapshot) {
        that.facebook = snapshot.val()
      })
    },
    async insert () {
      let urlsImg = await this.createImage()
      this.data.image = urlsImg.downloadURL
      console.log(this.data.image)
      firebase.database().ref('/menu/firedFood').push(this.data)
      this.data.name = ''
      this.data.image = ''
      this.pullData()
    },
    onFileChange (fileImg) {
      this.dataImg = fileImg
    },
    createImage () {
      const storageRef = firebase.storage().ref('image/' + this.dataImg.name.toLowerCase().split(' ').join('-'))
      const uploadTask = storageRef.put(this.dataImg)
      return uploadTask
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columnleft {
float: left;
padding: 15px;
margin-left: 20px;
padding-left: 50px;

}
</style>
