var index = new Vue({
  el:"#app",
  data:{
    activeColor:'#db2522',//红色
    bluecol:'#0365C6',//蓝色
    orangeCol:'#ff8a00',//橙色
    aolor:'',
    whir:'#fff',
    objStyles:'4px solid #db2522',
    white:'#fff',
    logoimg:'',//logo
    step_name:'',
    background_img:'',//头部背景图片
    lunboimglist:[],//轮播图内容
    goods_list:[],//前三个商品内容
    tgoods_list:[],//后三个商品内容
    Navgitlist:[],//导航条状态
    template_id:'',//别人店铺id
    lasna:'',//学生本身的店铺id
    dw:'',
    show:1,
    sid:'',//学生本身的学号id
    artlicelist:[],//文章列表
    surelistname:'',//文章标题
    addtime:'',//文章时间
    surelist:'',//文章内容
    pageSize:9,//视频分页
    pageNum:1,//视频分页
    PageSize:6,//软文分页
    PageNum:1,//软文分页
    PAgesize:4,
    PAgenum:1,
    totalCount:'',
    show2:false,
    total:'',
    isacs:1,
    isac:4,
    videoList:[],
    visurl:'',//视频地址拼接
    taol:'',
    isniceIn:0,//点赞样式状态
    shoustr:0,//首页点赞数
    editstr:0,//软文点赞数
    vidstr:0,//视频点赞数
    vaiue_id:0,//具体文章的id编号
    getid:'',//其他人的总id编号
    cson:{},//点赞对象
    thom:'',//点赞状态  加  or 减
    type_id:'',//点赞所属的栏目板块
    typ_id:'',//本人的typ_id 店铺id
    phonk:'',//点赞的奇偶数
    editcol:'#ccc',//软文点赞颜色
    videocol:'#ccc',//视频点赞颜色
    allcolo:'',
    meid:'',
    imurl:'',
    shoplist:[],//商品列表
    param_remarks:'',//商品搜索
    dictionary_id:'',//商品分类
    commdetails_id:'',//首页跳转详情id
    onTrue:false,
    onFalse:false,
    onEles:false,
  },
  created(){
    this.dw=pub._LinkParm('dw');
    this.getid=pub._LinkParm('id');
    this.imurl=pub._url;
    if(this.dw){
      this.sid=pub._LinkParm('student_id')
    }else{
      this.sid=JSON.parse(sessionStorage.getItem("msg")).student_id;//学生本身的学号id
    }
    this.meid=JSON.parse(sessionStorage.getItem("msg")).student_id;
    this.lasna = sessionStorage.getItem("dept_id");//学生本身的店铺id
    if(this.dw){this.show=0;}
    this.getinit();
  },
  methods:{
    //首页内容
    getinit(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findShopDetail,
        data:{ 
          "id":_this.getid,
          "student_id":_this.meid
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.logoimg=res.data.Logo.dialogImage;
            _this.step_name=res.data.Logo.step_name;//店铺名称
            _this.background_img=res.data.background_img;//头部背景图片
            _this.lunboimglist=res.data.Lunboimage;//轮播图内容
            _this.template_id=res.data.template_id;//店铺id
            _this.Navgitlist=res.data.Navigation.navigationList;
            _this.allcolo=res.data.color;
            var arr=res.data.goods_list;
            var sk=res.data.goods_list;
            _this.tgoods_list=sk.splice(3,6);//后三个
            _this.goods_list= arr.splice(0,3);//前三个
            _this.typ_id=res.data.dept_id;
            var nav=res.data.Navigation.navigationList;
            if(_this.allcolo==2){
              _this.onFalse=true;
            }else if(_this.allcolo==1){
              _this.onTrue=true;
            }else if(_this.allcolo==3){
              _this.onEles=true;
            }
           if(nav){
              _this.Navgitlist=nav;
           }
           _this.shoustr=res.data.bonus_points;
           _this.phonk=res.data.fabulous_state;
           if(_this.phonk % 2 == 0){
            _this.aolor='#fff';
            _this.whir='#ccc';
           }else{
            _this.aolor=_this.activeColor;
            _this.whir="#fff"
            if(_this.allcolo==2){
             }else if(_this.allcolo==3){
              _this.aolor=_this.orangeCol;
             }
           }
		   
		    _this.getContent();
    _this.getVideo();
    _this.getshop();
          }
          if(_this.allcolo==2){
          _this.activeColor=_this.bluecol;
          _this.objStyles='4px solid #0365C6'
          }else if(_this.allcolo==3){
            _this.activeColor=_this.orangeCol;
            _this.objStyles='4px solid #ff8a00'
          }
        }
      });
    },
    //首页点击跳转详情
    detail(detail_id){
      this.commdetails_id=detail_id;
      if(detail_id!=""){
        window.location.href="../html/commdetails.html?id="+this.commdetails_id+'&'+'stepid='+this.getid+'&'+'dw='+1;
      }else{
        this.$message({
          message: '该商品没有配置详情',
          type: 'warning'
        });
      }
    }, 
    //软文内容
    getContent() {
      var _this=this;
      pub._InitAxios({
      _url:pub._url,
      ur:pub._DetailApi.listSoftArticle,
      data:{
        "pageSize":_this.pageSize,
        "pageNum":_this.pageNum,
    		"dept_id":_this.typ_id
      },
      cbk:function cbk(res){
        if(res.stateCode=="200"){
          _this.artlicelist=res.data.list;
          _this.total=res.data.totalCount;
        }
        }
      })
    },
    //视频内容
    getVideo(prop) {
      var _this=this;
      _this.visurl=pub._url;
      pub._InitAxios({
      _url:pub._url,
      ur:pub._DetailApi.videoList,
      data:{
        "pageSize":_this.PageSize,
        "pageNum":_this.PageNum,
    		"dept_id":_this.typ_id,
        "from_student_id":_this.meid
      },
      cbk:function cbk(res){
        if(res.stateCode=="200"){
            _this.videoList=res.data.list;
            _this.taol=res.data.totalCount;
            for(var key of _this.videoList){
              if(key.fabulous_state==0){
                key.fabulous_state=2;
              }
            }
    
          }
        }
      })
    },
    // 商品分类传参
    Navtlist(dic_id){
      this.dictionary_id=dic_id;
    },
    //商品列表内容
    getshop(){
      var _this=this;
      _this.visurl=pub._url;
      pub._InitAxios({
      _url:pub._url,
      ur:pub._DetailApi.shoplist,
      data:{
        "pageSize":_this.PAgesize,
        "pageNum":_this.PAgenum,
		    "dept_id":_this.typ_id,
        "param_remarks":_this.param_remarks,
        "shop_category_id":_this.dictionary_id,
        "template_id": "1",
      },
      cbk:function cbk(res){
        if(res.stateCode=="200"){
            _this.shoplist=res.data.list;
            _this.totalCount=res.data.totalCount;
            _this.param_remarks="";
          }
        }
      })
    },
    haurrentChange(val){
      this.PAgenum=val;
      this.getshop();
    },
    shop(id){
      this.$set(this,'isacs',id);
    },
    //返回个人中心或重置首页
    shouYe(num,bol){
      if(num==1 && bol){
        var a = document.createElement('a');
              a.setAttribute('href', "../html/storeopt.html?student_id="+this.meid);
              a.setAttribute('target', 'shou1');
              a.click();
        // window.open("../html/storeopt.html?student_id="+this.meid,"shou1");
      }else if(num==2 && !bol){
        var b = document.createElement('a');
              b.setAttribute('href', "../html/usecenter.html?student_id="+this.meid+'#p1');
              b.setAttribute('target', 'shou1');
              b.click();
        // window.open("../html/usecenter.html?student_id="+this.meid+'#p1',"shou1");
      }else{
        var c = document.createElement('a');
              c.setAttribute('href', "../index.html?student_id="+this.meid);
              c.setAttribute('target', 'shou1');
              c.click();
        // window.open("../index.html?student_id="+this.meid,"shou1");
      }
    },
  
    // 软文推广分页
    handleCurrent(val){
      this.pageNum=val;
      this.getContent();
    },
    //视频展示分页
    handleCurrentChange(val){
      this.PageNum=val;
      this.getVideo();
    },

    //查看软文内容
    look(id,sid){
      if(this.lasna==null || this.lasna=='' || this.lasna==undefined){
        this.$message.error('已退出登录，请返回首页重新登录！');
        return;
      }
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findSoftArticle,
        data:{
          'id':id,
          "student_id":_this.meid
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            showStatus.hide('.counter');
            _this.show2=true;
            showStatus.show('.surelist');
            _this.surelist=res.data.softArticle_content;//内容
            _this.surelistname=res.data.softArticle_name;//标题
            _this.addtime=res.data.add_time;
            _this.editstr=res.data.bonus_points;//点赞量
            _this.phonk=res.data.fabulous_state;//点赞状态
            _this.vaiue_id=id;
            $("#sure").html(res.data.softArticle_content);
            if(_this.phonk % 2 == 0){
              _this.editcol='#ccc';
            }else{
              _this.editcol=_this.activeColor;
              if(_this.allcolo==2){
                _this.editcol=_this.bluecol;
              }else if(_this.allcolo==3){
                _this.editcol=_this.orangeCol;
              }
            }
          }
        }
      })
    },

    goback(){
      showStatus.hide('.surelist');
      showStatus.show('.counter');
      this.show2=false;
    },

    //实现点赞功能
    niceIn(type,prop,video_name,state){
      var prop=parseInt(prop);
      if(state){
        this.phonk=state;
      }
      this.$set(this,'isniceIn',prop);
      
      var _this=this;
      //清除点赞动画
      setTimeout(function(){
        _this.$set(_this,'isniceIn',0)
      },1000);	
      //判断当前是否已点过赞
      _this.phonk % 2 == 0?_this.thom='add' : _this.thom='reduce';
      //判断点赞属于的类型
      if(type === 2){
        //软文点赞
        _this.type_id='soft';
        _this.softArticle_name=_this.surelistname;
        _this.cson= {
          "student_id":_this.meid,
          "type_id":_this.type_id,
          "id":_this.vaiue_id,
          "bonusPointsType":_this.thom,
          "dept_id":_this.typ_id,
          "softArticle_name":_this.softArticle_name,
        }
      }else if(type === 1){
        //首页点赞
        _this.type_id='shop';
        _this.cson= {
          "student_id":_this.meid,
          "type_id":_this.type_id,
          "id":_this.getid,
          "bonusPointsType":_this.thom,
          "dept_id":_this.typ_id,
          "dept_name":_this.step_name
        }
      }else{
        //视频点赞
        _this.type_id='short_video';
        _this.cson= {
          "student_id":_this.meid,
          "type_id":_this.type_id,
          "id":prop,
          "bonusPointsType":_this.thom,
          "video_name":video_name
        }
      }
      _this.thomp(prop);
    },
    thomp(prop){
      var _this=this;
     
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.saveBonus,
        data:_this.cson,
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            if(_this.type_id =='shop'){
              _this.getinit(_this.meid);
            }else if(_this.type_id =='soft'){
              _this.look(_this.vaiue_id,_this.meid);
            }else if(_this.type_id== 'short_video'){
              _this.getVideo(prop) 
            }
          }
        }
      })
    },
    
    //商品列表的详情跳转
    goemel(id){
      window.location.href="../html/commdetails.html?id="+id+'&'+'stepid='+this.getid+'&'+'dw='+1
    }
    
  },
})