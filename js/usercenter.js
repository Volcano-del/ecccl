var app =new Vue({
  el:'#usercenter',
  data:{
    tableData: [],
    input:'',
    tabe:[],
    textcount:[],
    show:0,
    times:[],
    options: [],
    value: '',
    value1: '',
    optio: [],
    value2: [],
    mylabel:'',
    shopitem:[],
    experiment:[],//选择的实验
    team_id:'',//小组id
    team_name:'',//小组名字
    dept_name:'',//默认店铺名称==小组名字
    dept_type_id:'',//店铺编号
    dept_type_name:'',//店铺名称
    openurl:'',
    phone:'', 
    newphone:'',//新手机号
    old_password:'',//旧密码
    newpass:'',//新密码
    newagainpass:'',//重复密码
    password:'',
    sav1:true,
    pagesize:6,//一页几个
    pagenum:1,//第几页
    total:0,//总页数
    search_name:'',
    visible: false,
    PageSize:9,//一页10个
    Pagenum:1,
    alunt:0,//总页数
    navlist:[],
    PAgesize:5,
    PAgenum:1,
    taol:0,
    input_dian:'',//电商搜索
    tables:[],
    column: {
      prop: 'add_time', // el-table-column中的prop
      order: 'descending', // 'ascending升序' or 'descending降序'
    },
    studentid:'',
    imgurl:'',//上传地址
    imageUrl: '',//上传图片
    imgul:'',
    bonus_points:'',//总积分
    template_id:'',
  },
  created(){
    this.studentid=pub._LinkParm('student_id');
    this.imgurl=pub._url+'api/fileUp';
    this.imgul=pub._url;
    var stname=JSON.parse(sessionStorage.getItem("msg"));
		 if(stname!=null){
      this.getinit();
      this.getcount();
      this.getnovcount();
		 }else{
			 window.location.href="../html/login.html";
		 }
  },
  methods:{
    getinit(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentInfo,
        data:{
          "student_id" : _this.studentid
          },
        cbk: function cbk(res){
          _this.tabe= res.data;
          _this.imageUrl=res.data.files;
          _this.textcount=res.data.experiment;
          _this.search_name=res.data.student_name;
          _this.bonus_points=res.data.bonus_points;
          sessionStorage.setItem("dept_id",res.data.dept_id)
         }
        })
    },
    exit(){
      sessionStorage.clear();
	    sessionStorage.removeItem("testReport_sign"); //testReport_sign 
	             sessionStorage.removeItem("ck"); //ck
      window.location.href="../index.html";
    },
    getcount(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listShop,
        data:{
          "pageSize":_this.PageSize,
          "pageNum":_this.Pagenum,
          "param_remarks":_this.input_dian,
          },
        cbk: function cbk(res){
          console.log(res);
          _this.alunt=res.data.totalCount;
          _this.navlist=res.data.list;
          _this.input_dian="";
         }
        })
    },

    getnovcount(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listBonus,
        data:{
          "pageSize":_this.PAgesize,
          "pageNum":_this.PAgenum,
          "student_id" : _this.studentid
          },
        cbk: function cbk(res){
          _this.tables=res.data.list;
          _this.taol=res.data.totalCount;
         }
      })
    },
    //学生成绩分页
    handleCurrentChange(val){
      this.pagenum=val;
      this.listest();
    },
    //上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl =res.data.files[0];
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentEdit,
        data:{
        "student_id":_this.studentid,
        "files":_this.imageUrl,
        },
        cbk:function cbk(res){
          if(res.stateCode=="200" ){
            _this.$message({
              message: `头像上传成功`, 
              type: 'success'
            });
          }
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //学生店铺分页  换页
    handleCurrent(val){
      console.log(val);
      this.Pagenum=val;
      this.getcount();
    },
    Times(val){
      this.team_id=val.value;//小组id
      this.team_name=val.label;//小组名字
      this.dept_name=val.label;
    },
    shop(val){
      this.dept_type_id=val.value;//小组id
      this.dept_type_name=val.label;//小组名字
    },
    nphone(obj){
      var re=/^1\d{10}$/;
      let str = this.nphone;
      let st= obj;
      if(re.test(str) || re.test(st)){
        // console.log('正确的手机号')
        return true;
      }else{
        // console.log('手机号码不正确，请重新输入')
        return false;
      }
    },

    // 修改密码
    makePassword(){
      var _this=this;
      if(_this.old_password==""){
        _this.$message.error('旧密码不能为空')
      }else if(_this.newpass==""){
        _this.$message.error('新密码不能为空')
      }else if(_this.newagainpass==""){
        _this.$message.error('确认密码不能为空')
      }else if(_this.newagainpass!==_this.newpass){
        _this.$message.error('两次密码不一致，请重新输入')
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentEdit,
          data:{
          "student_id":_this.studentid,
          "old_password":_this.old_password,
          "password":_this.newagainpass,    
          },
          cbk:function cbk(res){
            if(res.code==200 && res.msg == "success"){
              $(".password").css("display","none");
              $(".p_result").css("display","block");
              _this.$message({
                message: '修改密码成功',
                type: 'success'
              });
              sessionStorage.clear();
              _this.clearCookie();
            }else{
              _this.$message.error(res.msg);
            }
          }
        })
      }
    },
    // 修改手机
    makePhone(){
      var _this=this;
      if(_this.password==""){
        _this.$message.error('验证密码不能为空')
      }else if(_this.newphone==""){
        _this.$message.error('新手机号不能为空')
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentEdit,
          data:{
          "student_id":_this.studentid,
          "phone":_this.nphone,
          "phone":_this.newphone,
          "old_password":_this.password,    
          },
          cbk:function cbk(res){
            if(res.code==200 && res.msg == "success"){
              $(".password").css("display","none");
              $(".p_result").css("display","block");
              _this.$message({
                message: '修改手机号成功',
                type: 'success'
              });
              sessionStorage.clear();
              _this.clearCookie();
            }else{
              _this.$message.error(res.msg)
            }
          }
        })
      }
    },

    // 重新登录跳转
    reLogin(){
      window.location.href = '../html/login.html';
    },

    delet(){
      this.old_password='';
      this.newpass='';
      this.newagainpass='';
      this.password='';
      this.newphone='';
    },
    clearCookie() {
      this.setCookie("", "", 0); //账号密码置空，天数置0
    },
    //保存
    getdata(){
      //选择实验的结果
      console.log(this.optio);
      console.log(this.value2);
      var keys=[];
      for(let i = 0;i<this.optio.length;i++){
        for(var key of this.value2){
          if(key==this.optio[i].dictionary_id){
            let param={
              experiment_module_id:this.optio[i].dictionary_id,
              experiment_module_name:this.optio[i].dictionary_name
            }
            keys.push(param);
          }
        }
      }
      this.experiment=keys;
      this.save();
    },
    save(){
      let _this=this;
      if(_this.team_id==''){
        this.$message.error("小组不能为空");
        return;
      }if(_this.dept_type_name==''){
        this.$message.error("请选择店铺类别");
        return;
      }if(_this.experiment==''){
        this.$message.error("请选择实验，可多选");
        return;
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentJoin,
          data:{"dept_name":_this.dept_name,
          "dept_type_id":_this.dept_type_id,
          "dept_type_name":_this.dept_type_name,
          "student_id":_this.studentid,
          "team_id":_this.team_id,
          "experiment":_this.experiment,
          "team_name":_this.team_name
          },
          cbk:function cbk(res){
            if(res.stateCode=="200"){
              _this.textunt();
            }else{
              _this.$message.error(res.stateMsg);
            }
          }
        })     
      }
    },
    opentext(){
      if(this.tabe.team_id == null || this.tabe.team_id==''){
        console.log(555)
        // 选择小组
        var _this=this;
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentList,
          data:{"dictionary_type_id":"team"},
          cbk:function cbk(res){
            _this.times=res.data;
            // 选择店铺类别
            pub._InitAxios({
              _url:pub._url,
              ur:pub._DetailApi.studentList,
              data:{"dictionary_type_id":"shop_category"},
              cbk:function cbk(res){
                _this.options=res.data;
                // 选择实验
                pub._InitAxios({
                  _url:pub._url,
                  ur:pub._DetailApi.studentList,
                  data:{"dictionary_type_id":"test"},
                  cbk:function cbk(res){
                    _this.optio=res.data;
                  }
                })
              }
            })
          }
        })
      }else{
        this.textunt();
      }
    },
    textunt(){
      this.show=1;
      this.sav1=false;
      this.getinit();
    },
    pusha(index,obj){
      switch(obj){
        case 'shop':url='../html/storeopt.html';
        break;
        case 'goods':url='../html/details.html';
        break;
        case 'soft':url='../html/editor_list.html';
        break;
        case 'short_video':url='../html/shotvideo.html';
        break;
        case 'live':url='#p8';
        break;
        case 'logistic':url='../html/wuliu.html';
        break;
      }
	  if(url=="#p8"){
      $("#p8").show();
	  }else{
      $("#p8").hide();
    }
      this.openurl=url+'?student_id=' + this.studentid;
	  
      window.location.href=this.openurl
    },
    listest(){
      var that=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentListTest,
        data:{
          "pageSize":that.pagesize,
        "pageNum":that.pagenum,
        "student_id":that.studentid
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            console.log(res)
            that.tableData=res.data.list;
            that.total=res.data.totalCount;
            console.log(that.total)
          }
        }
      })
    },
    contList(t,s,m){
      if(m==1){
        window.location.href='../index/index.html?id='+t +'&'+'student_id='+s+'&'+'dw='+1;
      }else{
        window.location.href='../index/index1.html?id='+t +'&'+'student_id='+s+'&'+'dw='+1;
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleChange(val){
      this.PAgenum=val;
      this.getnovcount();
    },
  }
})