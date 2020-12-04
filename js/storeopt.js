var index = new Vue({
  el:"#app",
  data:{
    imglist:[
      {image:'../img/index/banner (1).png'},
      {image:'../img/index/banner (2).png'},
      {image:'../img/index/banner (3).png'},
    ],
    shou_img:[
      {ime:'../img/ar_down.png'}
    ],
    indexshoe:[
      {img:'../img/show2.jpg',name:'muone'},
      {img:'../img/show1.jpg',name:'mutwo'}
    ],
    indexlist:[
      {img:'../img/index/red.png',name:'red',id:1},
      {img:'../img/index/blue.png',name:'blue',id:2},
      {img:'../img/index/orange.png',name:'orange',id:3},
    ],
    isshow:false,
    isshow2:false,
    isshow3:false,
    isshow4:false,
    ischange:false,
    activeName: 'first',
    background_img:'',//头部背景图片
    dialogImageUrl: [],//轮播内容图片
    didialogImageUrl:'',//logo图片
    dialogVisible: false,
    input_cou:'',//logo店铺名称
    input:'',//logo在售商品
    value_shou:true,//导航首页
    value_shang:false,//导航商品列表
    options: [],
    value: '',
    imageUrl:'',
    imgurllist:[],
    goods_id:'',
    goods_name:'',
    goods_list:[],
    template_id:'1',
    experiment_module_data:{},
    Logo:'',
    Navigation:{},
    Lunboimage:[],
    contfileList:[],
    index_s:'1',
    color:'1',
    activeColor:'#db2522',
    hideUpload: false,
    limitCount:6,
    imgurl:'',
    setid:'',
    studentid:'',
    lasna:'',
    slister:[],
    obite:''
  },
  created(){
    this.surl=pub._url;
    this.imgurl=this.surl+'api/fileUp';
    
    this.studentid=pub._LinkParm('student_id');
    this.lasna = sessionStorage.getItem("dept_id");
    if(this.lasna!=null){
      window.name="shou1";
      this.getinit();
    }else{
      window.location.href="../html/login.html"
    }
  },
  methods:{
    getinit(){
      var _this=this;

      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listGoods,
        data:{},
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.options=res.data;

            pub._InitAxios({
              _url:pub._url,
              ur:pub._DetailApi.findShop,
              data:{"student_id":_this.studentid,
              "dept_id":_this.lasna,
              'template_id':_this.template_id
              },
              cbk:function cbk(res){
                _this.contfileList=[];
                if(res.stateCode=="200"){
                    _this.setid=res.data.id;
                    _this.goods_list=res.data.goods_list;//宝贝内容配置
                    _this.input_cou=res.data.Logo.step_name;//店铺logo名称
                    _this.didialogImageUrl=res.data.Logo.dialogImage;//店铺logo图片
                    _this.background_img=res.data.background_img;//头部背景图片
                    _this.value_shang=res.data.Navigation.value_shang;//导航
                    _this.value_shang==1?_this.value_shang=true : _this.value_shang=false;
                    _this.Lunboimage=res.data.Lunboimage;
                    _this.color=res.data.color;
                    for(var i=0;i<_this.Lunboimage.length;i++){
                      var file={};
                      file.url=pub._url +  _this.Lunboimage[i];
                      _this.contfileList.push(file);
                      // 超过6张则隐藏图片
                    }

                    if(_this.Lunboimage.length>=_this.limitCount){
                      _this.hideUpload =true;
                    }

                    //修改颜色
                    if(_this.color==2){
                      _this.activeColor='#0365C6';
                    }else if(_this.color==3){
                      _this.activeColor='#ff8a00';
                    }
                }
              }
            })
          }
        }
      });
    },
    
    shotsee(bol){
      if(bol){
        window.location.href="../html/usecenter.html?student_id="+this.studentid ;
      }else{
        if(this.setid==''){
          this.$message({
            message: '店铺首页未配置',
            type: 'warning'
          });
        }else{
          var a = document.createElement('a');
              a.setAttribute('href', "../index/index.html?id="+this.setid);
              a.setAttribute('target', 'aaa');
              a.click();
          // window.open("../index/index.html?id="+this.setid,"aaa");
        }
      }
    },

    //实时监控选择的结果
    Times(val){
      this.goods_id=val.value;//商品id
      this.goods_name=val.label;//商品名字
      this.obite=val.obite;//商品价格
    },

    //编辑页面弹框
    editor(bol){
      bol ==1 ? this.isshow2 =true : this.isshow2=false;
      bol ==2 ? this.isshow =true : this.isshow=false;
      bol ==3 ? this.isshow3 = true : this.isshow3 =false;
      bol ==4 ? this.isshow4 = true : this.isshow4 =false;
    },

    //改变模板颜色
    change(bol,index) {
      console.log(index);
      this.index_s=index;
      if(this.index_s==1){
        color='红色'
      }else if(this.index_s==2){
        color='蓝色'
      }else{
        color='橙色'
      }
      this.$confirm(`是否确认模板颜色为${color}?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.index_s==1){
          this.activeColor='#db2522'
        }else if(this.index_s==2){
          this.activeColor='#0365C6'
        }else{
          this.activeColor='#ff8a00'
        }
        this.save();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
      
    },

    //确认模板
    changesol(str,ind){
      this.$alert(`已选择${str}`, '模块选择成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.template_id=ind+1;
            this.$message({
              message: '模板选择成功',
              type: 'success'
            });
            if(this.template_id==2){
              window.location.href="../html/storeopt1.html?student_id="+this.studentid;
            }
        }
      });
    },

    //切换tab
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    
    //宝贝内容配置后得图片
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if(this.goods_id==''){
        this.$message.error('请选择商品内容');
        return;
      }
      this.imgurllist.push(res.data.files[0]);

      if(this.imgurllist.length>6){
        this.$message.error('图片最多上传6张');
      }
      var goos_count={
        goods_id:this.goods_id,
        goods_name:this.goods_name,
        goods_img:res.data.files[0],
        goods_price:this.obite
      }
      this.goods_list.push(goos_count);
    },

    //logo 上传成功后得图片地址
    handleLogoSuccess(res, file){
      this.didialogImageUrl=res.data.files[0];
    },
    // 头部背景 上传成功后得图片地址
    handlebackSuccess(res,file){
      this.background_img=res.data.files[0];
    },

    //轮播图  图片成功回调
    handlelunSuccess(res, file){
      this.contfileList=file;//图片回显  照片墙
      this.Lunboimage.push(file.response.data.files[0]);//轮播图数组
    },

    //轮播图上传内容的改变
    onlunch(file,filelist){
      this.hideUpload = this.Lunboimage.length >= this.limitCount;//控制上传接口是否出现
    },
 
    //移除轮播图的图片
    handleRemove(file, fileList) {
      this.Lunboimage=[];
      this.contfileList=fileList;//图片回显  照片墙
      if(fileList.length!=0){
        for(let i=0; i<fileList.length;i++){
          var iu=fileList[i].url.replace(pub._url,"");
          this.Lunboimage.push(iu);
        }
      }else{
        for(let i=0; i<fileList.length;i++){
          var iu=fileList[i].response.data.files[0].replace(pub._url,"");
          this.Lunboimage.push(iu);
        }
      }
      this.onlunch()
    },
    //删除内容配置
    deel(ind){
      this.goods_list.splice(ind,1);
    },

    // 页头
    saveYe(){
      if(this.didialogImageUrl==""){
        this.$message({
          message: '店铺logo不能为空',
          type: 'warning'
        });
      }else if(this.input_cou==""){
        this.$message({
          message: '店铺名称不能为空',
          type: 'warning'
        });
        return;
      }else{
        this.save();
      }
    },

    // 轮播图
    savelength(obl){
      var imglength;
      obl? imglength=this.Lunboimage : imglength=this.goods_list;
      if(imglength.length<3){
        this.editor(0);
        this.$message.error('未保存成功，轮播图图片少于三张，请再次上传');
        return;
      }
      this.save();
    },
    //保存宝贝内容配置
    save(){
      if(this.template_id==''){
        this.$message.error('保存失败，未选择店铺模板，请选择！');
      }

      if(this.value_shang==false){
        this.value_shang=0;
      }else{
        this.value_shang=1
      }
      
      //汇总
      this.experiment_module_data={
        'goods_list':this.goods_list,
        'background_img':this.background_img,//头部背景图片
        'Logo':{
          'step_name':this.input_cou,
          'dialogImage':this.didialogImageUrl
        },
        'Navigation':{
          'value_shang':this.value_shang,
        },//导航
        'Lunboimage':this.Lunboimage,//轮播图
        'color':this.index_s,//选择颜色
        'template_id':this.template_id
      }
      this.allsave();
    },
    // 全部保存
    allsave(){
      
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.saveShop,
        data:{
          'student_id':_this.studentid,
          'dept_id':_this.lasna,
          'experiment_module_data':_this.experiment_module_data,
          'template_id':_this.template_id
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.$message({
              message: '保存成功',
              type: 'success'
            });
            _this.editor(0);
            _this.getinit();
          }else{
            this.$message.error(res.stateMsg);
          }
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 3MB!');
      }
      return isJPG && isLt2M;
    },
   
  },
})