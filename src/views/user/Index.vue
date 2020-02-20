<template>
    <div>
        <h2>用户列表页</h2>
        <Row>
            <Col span="2">
                <Button type="info" @click="add">添加</Button>
            </Col>
            <Col span="8" offset="14">
                <Row>
                    <Form inline>
                        <Form-item prop="search">
                            <Input v-model="search.value">
                                <Select v-model="search.type" slot="prepend" style="width: 80px">
                                    <Option v-for="(item,index) in searchList" :key="index" :value="item.value">{{item.title}}</Option>
                                </Select>
                                <Button @click="list" slot="append" icon="ios-search"></Button>
                            </Input>
                        </Form-item>
                    </Form>
                </Row>
            </Col>
        </Row><br>
        <Table  border :columns="columns1" :data="data1" :loading="loading"></Table>
        <br>
        <Page :total="total" @on-change="page" show-total></Page>

        <Modal
            v-model="infos.is_show"
            :title="infos.title"
            @on-ok="ok">
            <Form :model="form" :label-width="80">
                <Form-item label="用户">
                    <Input type="text" v-model="form.username" placeholder="请输入用户名称"></Input>
                </Form-item>
                <Form-item label="手机号">{{form.phone}}
                    <Input type="text" v-model="form.phone" placeholder="请输入手机号"></Input>
                </Form-item>
                <Form-item label="用户类型">
                    <Radio-group v-model="form.vip">
                        <Radio label="1">普通用户</Radio>
                        <Radio label="2">vip用户</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="用户">
                    <Input type="text" v-model="form.abstract" placeholder="请输入用户介绍，20字以内"></Input>
                </Form-item>
                <Form-item label="是否启用">
                    <Radio-group v-model="form.status">
                        <Radio label="1">启用</Radio>
                        <Radio label="2">禁用</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="上传头像">
                <Upload
                    ref="uploadFile"
                    action="http://mchapi.globalinfluence.cn/admin.php/admin/system/upload"
                    :on-success="uploadSuccess">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <img :src="form.head_url" style="height:100px">
                </Form-item>
            </Form> 
        </Modal>

        <Modal
            v-model="pass.is_show"
            :title="pass.title"
            @on-ok="okPass"
            >
            <Form :model="pass" :label-width="80">
                <Form-item label="修改密码">{{pass.password}}
                    <Input type="password" v-model="pass.password" placeholder="请输入新密码"></Input>
                </Form-item>
            </Form> 
        </Modal>

        <Modal
            v-model="see.is_show"
            :title="see.title"
            @on-ok="okSee"
            >
            <Row>
                <Col span="24">
                    <Card>
                        <ul>
                            <li v-for="item in seeinfos" style="list-style-type:none;">
                                <a :href="item.url" target="_blank">
                                    <Row>
                                        <Col span="21">
                                            <span>id: {{ item.id }} -- 标题: {{ item.title }}</span>
                                        </Col>
                                        <Col span="3">
                                            <span style="padding-left:20px">查看</span>
                                        </Col>
                                    </Row>
                                 </a>
                            </li>

                            
                        </ul>
                    </Card>
                </Col>
            </Row>

        </Modal>
    </div>
</template>
<script>
    export default {
         data () {
            return {
                loading: false,
                pass:{
                    title: "修改密码",
                    is_show: false,
                    password: '',
                },
                infos:{
                    title: "",
                    is_show: false,
                },
                see:{
                    title: "",
                    is_show: false,
                },
                seeinfos:[],
                search:{
                    value : '',
                    type: 'username',
                },
                searchList : [
                    {
                        value : 'username',
                        title :'用户名',
                    },
                ],
                form: {
                    username: '',
                    password: 'root',
                    phone: '',
                    vip: '1',
                    abstract:'',
                    status: '1',
                    head_url: '',
                },
                columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        align: "center"
                    },
                    {
                        title: '手机',
                        key: 'phone',
                        align: "center"
                    },
                    {
                        title: '头像',
                        key: 'head_url',
                        align: "center",
                        render :(h,param) => {
                            return h('img',{
                                attrs:{
                                    src:param.row.head_url
                                },
                                style:{
                                    width:"80px",
                                    height:"80px",
                                    padding:"10px"
                                }
                            })
                        },
                    },
                    {
                        title: '注册时间',
                        key: 'time',
                        align: "center"
                    },
                    {
                        title: 'vip',
                        key: 'vip',
                        align: "center",
                        render :(h,param) => {
                            return h('div',{
                            },param.row.vip == 1 ? '普通' :'vip');
                        }, 
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: "center",
                        render :(h,param) => {
                            let btnType = "primary";
                            if(param.row.status == 2){
                                btnType = "default";
                            }
                            return h('div',{
                            },param.row.status == 1 ? '启用' :'禁用');
                        },
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render :(h,param) => {
                            return h("div",[
                                h("Button",{
                                    props:{
                                        type:"warning",
                                        size:"small"
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.infos.is_show = true;
                                            this.form.id = param.row.id;
                                            this.infos.title = '修改用户';
                                            this.detail();
                                        }
                                    }
                                },"修改"),
                                h("Button",{
                                    props:{
                                        type:"error",
                                        size:"small",
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.$Modal.confirm({
                                                title:"提示",
                                                content:"确定要删除此用户吗",
                                                onOk:() =>{
                                                    this.delete(param.row.id);
                                                }
                                            })
                                        }
                                    }
                                },"删除"),
                                h("Button",{
                                    props:{
                                        type:"warning",
                                        size:"small",
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.pass.is_show = true;
                                            this.pass.id = param.row.id;
                                        }
                                    }
                                },"密码"),
                            ])
                        }
                    },
                    {
                        title: '查看',
                        key: 'action',
                        align: 'center',
                        render :(h,param) => {
                            return h("div",[
                                h("Button",{
                                    props:{
                                        type:"text",
                                        size:"small"
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.see.is_show = true;
                                            this.see.id = param.row.id;
                                            this.see.type = 1;
                                            this.see.title = '查看用户收藏';
                                            this.seeinfo(param.row.id);
                                        }
                                    }
                                },"收藏"),
                                h("Button",{
                                    props:{
                                        type:"text",
                                        size:"small",
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.see.is_show = true;
                                            this.see.id = param.row.id;
                                            this.see.type = 2;
                                            this.see.title = '查看用户下载';
                                            this.seeinfo(param.row.id);
                                        }
                                    }
                                },"下载"),
                            ])
                        }
                    },
                ],
                data1: [],
                total: 10,
            }
        },
        mounted(){
            this.list();
        },
        methods:{
            async list(page = 1){
                this.loading = true;
                let param = {
                    page:page
                }
                param[this.search.type] = this.search.value;
                let res = await this.$api.user.list(param);
                if(res){
                    this.data1 = res.data;
                    this.total = res.total;
                }
               this.loading = false;
            },
            page(num){
                this.list(num);
            },
            // 修改详情
            async detail(){
                this.$Spin.show();
                let res = await this.$api.user.info({id:this.form.id});
                if (res) {
                    console.log(res);
                    this.form = res;
                    this.form.vip = res.vip+'';
                    this.form.status = res.status+ '';
                    this.form.status = res.status+ '';
                }
                this.$Spin.hide();
            },
            // 修改
            async update (form) {
                let res = await this.$api.user.update(form);
                if(res){
                    console.log(res);
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            add(){
                this.infos.title = "添加用户";
                this.infos.is_show = true;
            },
            async insert (form) {
                // console.log(form);
                let res = await this.$api.user.insert(form);
                if(res){
                    this.list();
                    this.clear();
                    this.$Message.success('添加成功');
                }
            },
            
            // 清空addInfo , 上传图片
            clear(){ 
                this.form = {
                    username: '',
                    phone:'',
                    vip: '1',
                    status: '1',
                    head_url: '',
                };
                this.pass.password = '';
                this.$refs.uploadFile.clearFiles();
            },
            ok(){
                if(this.form.id > 0){
                    // 修改
                    this.update(this.form);
                }else{
                    // 添加 form  传入username,vip,status,head_url,phone
                    this.insert({
                        username:this.form.username,
                        password:this.form.password,
                        phone:this.form.phone,
                        vip:this.form.vip,
                        status:this.form.status,
                        head_url:this.form.head_url,
                    })
                }
            },
            async passup (pass) {
                console.log(pass)
                let res = await this.$api.user.passup(pass);
                console.log(res);
                if(res){
                    this.list();
                    this.clear();
                    this.$Message.success('密码修改成功');
                }
            },
            okPass(){
                this.passup(this.pass);
            },
            uploadSuccess(res){
                if(res.ret == 200){
                    this.form.head_url = res.data;
                    // console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            async delete (id) {
                let res = await this.$api.user.delete({id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
            async collectInfo(id){
                let res = await this.$api.user.collectInfo({id});
                console.log(res.info);
                if(res){
                    this.seeinfos = res.info.collect;
                }
            },
            async downloadInfo(id){
                let res = await this.$api.user.downloadInfo({id});
                console.log(res);
                if(res){
                    this.seeinfos = res.info.download;
                }
            },
            seeinfo(id){
                if(this.see.type == 1){
                    this.collectInfo(id);
                }else if(this.see.type == 2){
                    this.downloadInfo(id);
                }else{
                    this.$Message.error('数据错误，请重新请求');
                }
            },
            okSee(){
                this.see.is_show = false;
            }
        }
    }
</script>
