var index = new Vue({
  el:"#app",
  data:{
    options: [],
    activeName: 'first',
    dialogImageUrl: '',
    dialogImageUrl1: '',
    dialogImageUrl2: '',
    dialogVisible: false,
    dialogVisible1: false,
    dialogVisible2: false,
    input_cou:'',//logo店铺名称
    imageUrl:'',
    activeColor:'#db2522',
    actColor:'',
    index_s:'1',
    radio: '1',
    textarea:'',
    checked:false,
    tabledata:[],
    dictionary_value:'',
    baseUrl:pub._url,
    background_img:'',//头部背景图片
    // 宝贝主图
    goods_picture:'',
    goods_picture_list:[],
    fileList:[],
    // 基本信息
    id:'',
    student_id:'', //学生学号
    dept_id:'', //店铺编号
    template_id:'', //店铺模板编号
    goods_name:'',
    goods_id:'', //商品编号
    shop_category_name:'',//宝贝名称
    goods_price:'', //商品价格
    goods_full1:'', //满
    goods_minus1:'', //减
    goods_full2:'', //满
    goods_minus2:'', //减
    goods_spec:'', //规格
    goods_val:'',
    goods_radio:'',//显示/不显示
    // 详情配置
    set_description:'',//包装说明
    set_qualification:[],//产品资质
    fileList1:[],
    set_detailsPic:'',//详情图
    fileList2:[],
    checkList:[],//评价等级
    check:'',//评价内容
    description_radio:'',
    qualification_radio:'',
    detailsPic_radio:'',
    evaluation_radio:'',
    checkList_radio:'',
    // 用户评价
    evaluation:[],
    student_id:'',//学生msg-id
    stepid:'',//
    logoimg:'',//logo图片
    step_name:'',//logo名字
    imurl:'',
    dw:'',
  },
  created(){
    this.id=pub._LinkParm('id');
    this.dw=pub._LinkParm('dw');
    this.stepid=pub._LinkParm('stepid');
    this.imurl=pub._url;
    this.student_id =JSON.parse(sessionStorage.getItem("msg")).student_id;
    this.findDetails();
    this.getinit();
  },
  methods:{
    // 商品预览页
    findDetails(){
      var _this = this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findGoodsDetails,//商品详情接口
        data:{
          "id":_this.id,
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            var data=res.data;
            // 换色
            _this.index_s=data.index_s,
            _this.activeColor=data.activeColor;
            _this.actColor=data.actColor;
             // 宝贝主图
             _this.goods_id=data.goods.goods_id;
             _this.goods_name=data.goods.goods_name;
             _this.goods_picture_list= data.goods_picture_list;
             // 基础信息
             _this.shop_category_name=data.goods.shop_category_name;
             _this.goods_price=data.goods.goods_price;
             _this.goods_full1=data.goods.goods_full1;
             _this.goods_minus1=data.goods.goods_minus1;
             _this.goods_full2=data.goods.goods_full2;
             _this.goods_minus2=data.goods.goods_minus2;
             _this.goods_spec=data.goods.goods_spec;
             _this.goods_val=data.goods.goods_val;
             _this.goods_radio=data.goods.goods_radio;
             // 详情配置
             _this.tabledata=data.set.tabledata;
             _this.set_description=data.set.set_description;
             _this.set_qualification= data.set.set_qualification;
             _this.set_detailsPic= pub._url+data.set.set_detailsPic;
             _this.description_radio=data.set.description_radio;
             _this.qualification_radio=data.set.qualification_radio;
             _this.detailsPic_radio=data.set.detailsPic_radio;
             //  用户评价
             _this.evaluation=data.evaluation;
             _this.evaluation_radio=data.set.evaluation_radio;
             _this.checkList_radio=data.set.checkList_radio;
             if(_this.index_s==1){
              $(".nav").removeClass("nav_s");
            }else if(_this.index_s==2){
              $(".nav").addClass("nav_s");
            }else{
              $(".nav").addClass("nav_o");
            }
          }
          if(_this.goods_radio=="1"){
            $('#nav_price').css('display','none');
          }else{
            $('#nav_price').css('display','block');
          }
          if(_this.description_radio=="1"){
            $('#bao').css('display','none');
          }else{
            $('#bao').css('display','block');
          }
          if(_this.qualification_radio=="1"){
            $('#zi').css('display','none');
          }else{
            $('#zi').css('display','block');
          }
          if(_this.detailsPic_radio=="1"){
            $('#miao').css('display','none');
          }else{
            $('#miao').css('display','block');
          }
          if(_this.evaluation_radio=="1"){
            $('#navc').css('display','none');
          }else{
            $('#navc').css('display','block');
          }
        }
      })
    },
    getinit(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findShopDetail,
        data:{ 
          "id":_this.stepid,
          "student_id":_this.student_id
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.logoimg=res.data.Logo.diaLogImage;//logo照片
            _this.step_name=res.data.Logo.step_name;//logo名字
            _this.background_img=res.data.background_img;//头部背景图片
          }
        }
      });
    },
    goindex(){
      window.location.href='../index/index1.html?id='+this.stepid;
    },
    shouYe(num,bol){
      var backurl;
      if(num==1 && bol){
        var a = document.createElement('a');
              a.setAttribute('href',"../html/details1.html?student_id="+this.student_id);
              a.setAttribute('target', 'xiang2');
              a.click();
        // window.open("../html/details1.html?student_id="+this.student_id,"xiang2");
      }else if(num==2 && !bol){
        var b = document.createElement('a');
              b.setAttribute('href', "../html/usecenter.html?student_id="+this.student_id+'#p1');
              b.setAttribute('target', 'xiang2');
              b.click();
        // window.open("../html/usecenter.html?student_id="+this.student_id+'#p1',"xiang2");
      }else{
        var c = document.createElement('a');
              c.setAttribute('href', "../index.html?student_id="+this.meid);
              c.setAttribute('target', 'xiang2');
              c.click();
        // window.open("../index.html?student_id="+this.meid,"xiang2");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 下拉选择框
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    // tabs
    handleClick(tab, event) {
    },
    gobuy(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.saveBonus,
        data:{
          "student_id":_this.student_id,
          "type_id":"goods",
          "bonusPointsType":"add",
          "id":_this.id,
          "goods_name":_this.goods_name
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.$message({
              message: `${_this.goods_name}购买成功`,
              type: 'success'
            });
          }
        }
      })
    },
  },
})