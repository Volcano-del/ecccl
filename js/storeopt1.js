var index = new Vue({
  el:"#app",
  data:{
    imglist:[
      {image:'../img/index/banner1.png'},
      {image:'../img/index/banner2.png'},
      {image:'../img/index/banner3.png'},
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
    radio:'',
    radio_ye:'',
    isshow:false,
    isshow2:false,
    isshow3:false,
    isshow4:false,
    vall:'',
    activeName: 'first',
    dialunImageUrl: [],//轮播内容图片
    didiaLogImageUrl:'',//logo图片
    dialogVisibles: false,
    input_cou:'',//logo店铺名称
    input:'',//logo在售商品
    value_shou:true,//导航首页
    value_shang:false,//导航商品列表
    options: [],
    option:[],
    imageUrl:'',
    imgurllist:[],
    goods_id:'',
    goods_name:'',
    goods_list:[],
    goods:[],// 宝贝推荐
    tem_goods:{
        'vall':null,
        'value':null,
        'biaoti':null,
        'description':null,
        'price_shou':null,
        'radio':null,
        'radio1':null,
        'goods_full1':null,
        'goods_full2':null,
        'goods_minus1':null,
        'goods_minus2':null,
        'goods_val':null,
        'goods_spec':null,
        'dizhuImageUrl':null,
    },//宝贝推荐
    background_img:'',//头部背景图片
    dibackImageUrl:'',//模块背景图片
    diMoImageUrl:'',//模块标题图片
    diTopImageUrl:'',//返回顶部图片
    template_id:'2',
    experiment_module_data:{},
    Logo:'',
    Navigation:{},
    Lunboimages_bo:[],
    contfileLists:[],
    index_s:'1',
    color:'1',
    activeColor:'#d21c1c', //红色
    hideUpload: false,
    limitCounts:6,
    lunimgurl:'', //logo图片
    imgurls:'', //背景图片
    backimgurl:'',//模块背景
    Moimgurl:'',//模块标题
    Topimgurl:'',//返回顶部
    setid:'',
    studentid:'',
    lasna:'',
    slister:[],
    obite:''
  },
  created(){
    this.surl=pub._url; //头部背景图
    this.imgurls=this.surl+'api/fileUp';//头部背景图
    
    this.studentid=pub._LinkParm('student_id');
    this.lasna = sessionStorage.getItem("dept_id");
    if(this.lasna!=null){
      
      window.name="shou2";
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
            _this.option=res.data;
            pub._InitAxios({
              _url:pub._url,
              ur:pub._DetailApi.findShop,
              data:{"student_id":_this.studentid,
              "dept_id":_this.lasna,
              'template_id':_this.template_id
              },
              cbk:function cbk(res){
                _this.contfileLists=[];
                if(res.stateCode=="200"){
                    _this.setid=res.data.id;
                    _this.goods_list=res.data.goods_list;//宝贝内容配置
                    _this.radio_ye=res.data.radio_ye;//页头尺寸
                    _this.background_img=res.data.background_img;//头部背景图片
                    _this.dibackImageUrl=res.data.dibackImageUrl;//模板背景图片
                    _this.diMoImageUrl=res.data.diMoImageUrl;//模板标题图片
                    _this.diTopImageUrl=res.data.diTopImageUrl;//返回顶部图片
                    _this.input_cou=res.data.Logo.step_name;//店铺logo名称
                    _this.didiaLogImageUrl=res.data.Logo.diaLogImage;//店铺logo图片
                    _this.value_shang=res.data.Navigation.value_shang;//导航
                    _this.value_shang==1?_this.value_shang=true : _this.value_shang=false;
                    _this.Lunboimages_bo=res.data.Lunboimages_bo;
                    _this.Contractlist=res.data.Contractlist;
                    _this.color=res.data.color;
                    // 基本信息
                    if(undefined!=res.data.goods){
                      _this.goods = res.data.goods;
                    }

                    for(var i=0;i<_this.Lunboimages_bo.length;i++){
                      var file={};
                      file.url=pub._url +  _this.Lunboimages_bo[i];
                      _this.contfileLists.push(file);
                      // 超过6张则隐藏图片
                    }

                    if(_this.Lunboimages_bo.length>=_this.limitCounts){
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
        window.location.href="../html/usecenter.html?student_id="+this.studentid;
      }else{
        if(this.setid==''){
          this.$message({
            message: '店铺首页未配置',
            type: 'warning'
          });
        }else{
          var a = document.createElement('a');
              a.setAttribute('href', "../index/index1.html?id="+this.setid + "&template_id=2");
              a.setAttribute('target', 'aaa');
              a.click();
          // window.open("../index/index1.html?id="+this.setid + "&template_id=2","aaa");
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
    editor(bol,vall){
      bol ==1 ? this.isshow2 =true : this.isshow2=false;
      bol ==2 ? this.isshow =true : this.isshow=false;
      bol ==3 ? this.isshow3 = true : this.isshow3 =false;
      bol ==4 ? this.isshow4 = true : this.isshow4 =false;
      this.vall=vall;
      var goods_o = this.goods;
      var _this =this;
      _this.tem_goods = {
        'vall':null,
        'value':null,
        'biaoti':null,
        'description':null,
        'price_shou':null,
        'radio':null,
        'radio1':null,
        'goods_full1':null,
        'goods_full2':null,
        'goods_minus1':null,
        'goods_minus2':null,
        'goods_val':null,
        'goods_spec':null,
        'dizhuImageUrl':'',
    };
      for(var i=0;i< goods_o.length;i++){
       if(goods_o[i].vall== this.vall){
           _this.tem_goods = goods_o[i];
           break;
       }
     }
    },

    //改变模板颜色
    change(bol,index) {
      this.index_s=index;
      if(this.index_s==1){
        color='红色'
      }else if(this.index_s==2){
        color='蓝色'
      }else{
        color='橙色'
      }
      this.$confirm(`是否确认模板颜色为${color}?`, '提示', {
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
            if(this.template_id==1){
              window.location.href="../html/storeopt.html?student_id="+this.studentid;
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

    //宝贝主图 上传成功后得图片地址
    handleLogoSuccess(res, file){
      this.tem_goods.dizhuImageUrl=res.data.files[0];
      console.log(this.tem_goods.dizhuImageUrl)
    },
    // 第二版logo 上传成功后得图片地址
    handlelogoSuccess(res, file){
      this.didiaLogImageUrl=res.data.files[0];
    },
    // 头部背景 上传成功后得图片地址
    handlebackSuccess(res,file){
      this.background_img=res.data.files[0];
    },
    // 模块背景 上传成功后得图片地址
    handlemoBackSuccess(res,file){
      this.dibackImageUrl=res.data.files[0];
    },
    // 模块标题
    handleMoSuccess(res,file){
      this.diMoImageUrl=res.data.files[0];
    },
    handleTopSuccess(res,file){
      this.diTopImageUrl=res.data.files[0];
    },
    //轮播图  图片成功回调
    handlelunSuccessBo(res, file){
      this.contfileLists=file;//图片回显  照片墙
      this.Lunboimages_bo.push(file.response.data.files[0]);//轮播图数组
    },

    //轮播图上传内容的改变
    onlunchBo(file,filelist){
      this.hideUpload = this.Lunboimages_bo.length >= this.limitCounts;//控制上传接口是否出现
    },

    //移除轮播图的图片
    handleRemoveBo(file, fileLists) {
      this.Lunboimages_bo=[];
      this.contfileLists=fileLists;//图片回显  照片墙
      if(fileLists.length!=0){
        for(let i=0; i<fileLists.length;i++){
          var iu=fileLists[i].url.replace(pub._url,"");
          this.Lunboimages_bo.push(iu);
        }
      }else{
        for(let i=0; i<fileLists.length;i++){
          var iu=fileLists[i].response.data.files[0].replace(pub._url,"");
          this.Lunboimages_bo.push(iu);
        }
      }
      this.onlunchBo()
    },
    //删除内容配置
    deel(ind){
      this.goods_list.splice(ind,1);
    },

    // 页头配置
    saveYe(){
      if(this.background_img=="" || this.didiaLogImageUrl==""){
        this.$message({
          message: '背景图片或logo图不能为空',
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
      obl? imglength=this.Lunboimages_bo : imglength=this.goods_list;
      if(imglength.length<=0){
        this.$message({
          message: '轮播图图片不能为空',
          type: 'warning'
        });
      }else if(imglength.length<3){
        this.editor(0);
        this.$message.error('未保存成功，轮播图图片少于三张，请再次上传');
        return;
      }else{
        this.save();
      }
    },

    // 宝贝信息
    saveBao(){
      this.tem_goods.vall = this.vall
      if(this.tem_goods.value==""||this.tem_goods.value==null){
        this.$message({
          message: '宝贝信息未配置',
          type: 'warning'
        });
        return;
      }else if(this.tem_goods.biaoti==""||this.tem_goods.biaoti==null){
        this.$message({
          message: '宝贝标题不能为空',
          type: 'warning'
        });
        return;
      }else if(this.tem_goods.description==""||this.tem_goods.description==null){
        this.$message({
          message: '包装说明为空',
          type: 'warning'
        });
        return;
      }else if(this.tem_goods.dizhuImageUrl==""||this.tem_goods.dizhuImageUrl==null){
        this.$message({
          message: '宝贝主图不能为空',
          type: 'warning'
        });
        return;
      }else if(this.tem_goods.price_shou==""||this.tem_goods.price_shou==null){
        this.$message({
          message: '宝贝售价不能为空',
          type: 'warning'
        });
        return;
      }else if(this.tem_goods.value!=""||this.tem_goods.value!=null){
        var goods_o  = this.goods;
        if(goods_o.length>0){
          var a = 0;
          for(var i=0;i<goods_o.length;i++){
        
            if(goods_o[i].vall==this.tem_goods.vall){
               a=1;
              goods_o[i] = this.tem_goods;
            }
          }
         
          if(a==0){
            this.goods.push(this.tem_goods);
          }
              
        }else{
          this.goods.push(this.tem_goods);
        }
        this.save();
      }
    },

    //保存宝贝内容配置
    save(num){
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
        'radio_ye':this.radio_ye,//页头尺寸
        'background_img':this.background_img,//头部背景图片
        'dibackImageUrl':this.dibackImageUrl,//模块背景图片
        'diMoImageUrl':this.diMoImageUrl,//模块标题图片
        'diTopImageUrl':this.diTopImageUrl,//返回顶部图片
        'goods_list':this.goods_list,
        'Logo':{
          'step_name':this.input_cou,
          'diaLogImage':this.didiaLogImageUrl
        },
        'Navigation':{
          'value_shang':this.value_shang,
        },//导航
        'Lunboimages_bo':this.Lunboimages_bo,//轮播图
        'color':this.index_s,//选择颜色
        'template_id':this.template_id,
        "goods":this.goods
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
              _this.editor(0);
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
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