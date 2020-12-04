var app = new Vue({
    el: "#app",
    data: {
        show1: false,
        currentPage:1,
        currentPage3:1,
        pageSize: 5,
        totalCount:0,
        totalPage:0,
        replyInfoList: "",
        message_id: "",
        title: "",
        content: "",
        reply:"",
        create_time: "",
        textarea2: "",
        user_id:"",
        message_head_portrait: "",
        message_student_name: "",
        head_portrait: "",
        student_name: "",
        onLogin:true,
        downLogin:true,
        aim:'',
        user_id:'',
          magName:'',
          files:''
    },
    created() {
		 var stname=JSON.parse(sessionStorage.getItem("msg"));
         
		 if(stname!=null){
         this.magName=stname.student_id;
		 
        //拿到上一个有页面的message_id
        var message_id = getQueryVariable('message_id');
        var aim = getQueryVariable('aim');
        this.message_id = message_id;

        var student_id=stname.student_id;
    
        this.user_id=student_id;
        
        this.replyInfo();
        this.listReply();		 
		 }else{
			 window.location.href="../html/login.html";
		 }
    },
    methods: {
		use(obj){
          if(obj){
            window.location.href="../html/usecenter.html?student_id="+this.magName
          }else{
           
            sessionStorage.clear();
			 window.location.href="../index.html"
          }
        },
        // 查询学生信息
        judgeLog(){
            var _this = this;
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.studentInfo,//查询学生信息接口
                    data: {"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            _this.head_portrait=baseURL + res.data.head_portrait;
                            _this.student_name=res.data.student_name;
                        }
                    }
            });
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if(command=='a'){
                console.log(this.user_id)
                window.location.href = '../html/usecenter.html';
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },
        // 点击跳转登录注册页面
        lo(){
            window.location.href = '../html/login.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },

        //个人评论详情
        replyInfo() {
            var _this = this;
            console.log(_this.message_id)
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findReplyList,//查询评论详情接口
                data: { "message_id": _this.message_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                    // _this.currentPage3=res.
                        var item = res.data;
                        console.log(item);
                        _this.title = item.title;
                        _this.content = item.content;
                        _this.create_time = item.create_time;
                        _this.message_head_portrait = baseURL + item.head_portrait;
                        _this.message_student_name = item.student_name;
                        _this.files=item.files;
                        console.log(_this.files)
                    }
                }
            });
        },

        //查询评论详情分页列表
        listReply() {
            var _this = this;
            console.log(_this.message_id)

            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listReply,//查询评论详情分页列表接口
                data: { "pageSize":_this.pageSize,"pageNum":_this.currentPage,"message_id": _this.message_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 0 && res.msg == "success") {
                        _this.currentPage=res.data.currPage;
                        _this.pageSize=res.data.pageSize;
                        _this.totalCount=res.data.totalCount;
                        _this.totalPage=res.data.totalPage;
                        console.log(_this.totalPage);
                        _this.replyInfoList = res.data.list;
                    }
                }
            });
        },

        //用户回复
        userReply(obj){
            var _this = this;
            console.log(_this.message_id)
            console.log(_this.user_id)
            // var txtb = document.querySelector(".iqb");
            // console.log(txtb);
                showStatus.hide('.iqb');
                if(obj){
                    if (_this.textarea2 == '' || null) {
                        this.$message.error('未填写回复信息！');
                    } else {
                        pub._InitAxios({
                            _url: pub._url, //公共接口
                            ur: pub._DetailApi.userReply,//用户回复接口
                            data: { "message_id":_this.message_id,"user_id":_this.user_id,"content": _this.textarea2 },
                            cbk: function cbk(res) {
                                // console.log(res);
                                if (res.code == 200 && res.msg == "success") {
                                    _this.$message({
                                        message: '留言提交成功',
                                        type: 'success'
                                    });
                                    _this.textarea2 = '';
                                    window.location.reload();
                                    _this.listReply();
                                    return;
                                }
                                return this.$message.error('留言提交失败，请检查网络设置');
                            }
                        });
                    }
                }else{
                    _this.textarea2 = '';
                    _this.$message.error('取消发布');
                }
        },

        //点击询问控制回复框的显示隐藏
        show(){
            var _this=this;
            
            if(null==_this.user_id || _this.user_id == ""){
                
                this.$confirm('请先登录, 是否继续?', '提示', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = '../html/login.html';
                }).catch(() => {
                        
                });
            }else{
                console.log(1111111)
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.findUserMessageExist,//查询用户留言是否存在
                    data: { "message_id":_this.message_id,"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            if(document.querySelector(".iqb").style.display=="block"){
                                document.querySelector(".iqb").style.display='none';
                            }else{
                                document.querySelector(".iqb").style.display="block";
                            }
                        }else{
                             _this.$message.error(res.msg);
                        }
                        
                    }
                });
            }
           
            
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // this.pageSize=val;
            // this.listReply();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.listReply();
        }
    },
})