var app = new Vue({
    el: '#app',
    data: {
      newAritcal: {
        title: "",
        url: "",
      },
      editDialog: false,
      articals: [],
      toast: false,
      deleteDialog: false,
      deleteItem: {},
      searchWord: "",
      editItem: {},
      userDialog: false,
      user: {
        pwd: "",
        token: ""
      },
      activeTab: 1,
    },
    methods: {
      changePwd() {
        var that = this
        console.log(this.user)
        if (this.user.pwd== "" || this.user.token == "") {
          that.showToast("新密码和token不能为空")
          return
        }
        fetch('/changepwd', {
          method: "POST",
          body: JSON.stringify(this.user),
          credentials: 'include'
        }).then(function(res) {
          res.json().then(function(data) {
            that.redirectToLogin(data)
            if (data.ok) {
              that.showToast("修改成功, 需重新登录")
              window.location.href = "/login"
            }else{
              that.showToast(data.message)
            }
          })
        })
      },
      redirectToLogin(data) {
        if (data.needAuth) {
          console.log("需要重新登录")
          this.showToast("需要重新登录")
          setTimeout(function(){
            window.location.href = "/login"

          }, 500);
        }
      },
      resetArtical(that) {
        var that = that || this
        that.newAritcal = {
          title: "",
          url: "",
        }
      },
      showToast(message) {
        this.message = message;
        this.toast = true;
      },
      hideToast() {
        this.toast = false
      },
      filterByWord(array, word) {
        if (!Array.isArray(array)) {
          return
        }
        var newArray = []
        for (var i = 0; i < array.length; i++) {
          var item = array[i]
          if (item.title.indexOf(word) != -1) {
            newArray.push(item)
          }
        }
        return newArray
      },
      getAllUrls() {
        var that = this
        fetch("/articals", { credentials: 'include' }).then(function(res) {
          res.json().then(function(data) {
            that.redirectToLogin(data)
            that.articals = data.data || []
          })
        })
      },
      addArticla() {
        var that = this
        if (this.newAritcal.title == "" || this.newAritcal.url == "") {
          that.showToast("标题和链接不能为空")
          return
        }
        fetch('/articals', {
          method: "POST",
          body: JSON.stringify(this.newAritcal),
          credentials: 'include'
        }).then(function(res){
          res.json().then(function(data) {
            that.redirectToLogin(data)
            if (data.ok) {
              that.showToast("添加成功")
              that.resetArtical()
              that.getAllUrls()
            }
          })
        })
      },
      editUrl() {
        var that = this
        if (this.editItem.title == "" || this.editItem.url == "") {
          that.showToast("标题和链接不能为空")
          return
        }
        fetch('/articals', {
          method: "PUT",
          body: JSON.stringify(this.editItem),
          credentials: 'include'
        }).then(res => {
          res.json().then(function(data) {
            that.redirectToLogin(data)
            if (data.ok) {
              that.showToast("编辑成功")
              that.getAllUrls()
              this.editDialog = false
            }
          })
        })
      },
      deleteArtical(id) {
        var that = this
        fetch("/articals/" + that.deleteItem.Id, {
          method: "DELETE",
          credentials: 'include'
        }).then(function(res) {
          res.json().then(data => {
            that.redirectToLogin(data)
            if (data.ok) {
              that.showToast("删除成功")
              that.deleteDialog = false
              that.getAllUrls()
            }
          })
        })
      },
      handleTabChange(){
          
      }
    },
    mounted: function () {
      this.getAllUrls()
      if(document.cookie.indexOf("en_session") == -1){
        window.location.href = "/login"
      }
    },
    computed: {
      coumputedArticals: function () {
        console.log(this.articals)
        return this.searchWord && this.articals ? this.articals.filter(v => v.title.indexOf(this.searchWord) != -1) : this.articals
      }
    }
  })