var app = new Vue({
  el:"#app",
  data:{
    phone:'',
    password:'',
    checked:false,
    errorStatus:'',
    errorMsg:'',
  },
  created(){
  },
  methods:{
    animate(obj){
      // 实时的手机号内容校验
      var re=/^1\d{10}$/;
      let str = this.phone;
      let st= obj;
      if(re.test(str) || re.test(st)){
        // console.log('正确的手机号')
        return true;
      }else{
        // console.log('手机号码不正确，请重新输入')
        return false;
      }
    },
    loginr () {
      this.handleSubmit();
    },
    handleSubmit() {
      var _this = this;
      if(_this.phone==""){
        _this.errorStatus=true;
        _this.errorMsg="账号不能为空";
        return
      }else if(_this.password==""){
        _this.errorStatus=true;
        _this.errorMsg="密码不能为空";
        return;
      }else if(_this.phone!="" && _this.password.Length!=""){
        pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentLogin,
        data:{
          "phone" : _this.phone,
          "password": _this.password },
        cbk: function cbk(res){
          if(res.stateCode == 200 && res.msg == "success"){
              console.log('登录成功');
              let studentId=res.data.student_id;
              let testReport_sign=res.data.testReport_sign;
              _this.errorStatus=false;
              console.log(1111111,res.stateMsg)
              let loginParams = { 
                student_id: studentId,//获取密码
                testReport_sign: testReport_sign
             };
              if (_this.checked == true) {
                  //传入账号，密码，保存天数
                  _this.setCookie(_this.phone, _this.pass, 15);
              } else {
                  //清空Cookie
                  _this.clearCookie();
              }
              window.sessionStorage.setItem('msg',JSON.stringify(loginParams))
              // window.location.href="../html/usecenter.html?student_id="+studentId+'#p4';
              window.location.href="../index.html"
              _this.phone="";
              _this.password="";
            }else{
              _this.errorStatus=true;
              _this.errorMsg=res.stateMsg;
            }
         }
        })
      }
      
      },
      //设置cookie方法
      setCookie(phone, password, days) {
          var saveDays = new Date(); //获取时间
          saveDays.setTime(saveDays.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
          //字符串拼接存入cookie    
          window.document.cookie = "phone" + "=" + phone + ";path=/;saveDays=" + saveDays.toGMTString();
          window.document.cookie = "password" + "=" + password + ";path=/;saveDays=" + saveDays.toGMTString();
      },
      //读取cookie
      getCookie() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) { 
                  var arr2 = arr[i].split('='); //再次切割
                  //这里会切割出以phone为第0项的数组、以password为第0项的数组，判断查找相对应的值
                  if (arr2[0] == 'phone') {
                      this.phone = arr2[1]; //拿到账号
                  } else if (arr2[0] == 'password') {
                      //拿到拿到加密后的密码arr2[1]并解密
                      //var bytes = CryptoJS.AES.decrypt(arr2[1].toString(), 'secret key 123');
                      //var plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
                      this.password = arr2[1];
                  }
              }
          }
      },
      //清除cookie
      clearCookie() {
          this.setCookie("", "", 0); //账号密码置空，天数置0
      },
  },
  watch:{

  }
})