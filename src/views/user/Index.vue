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
        <Table  height="400" border :columns="columns1" :data="data1" :loading="loading"></Table>
        <!-- <Page :total="page.total" @on-change="page()"  show-elevator show-total></Page> -->
        <Page :total="total" @on-change="page"></Page>

        <Modal
            v-model="infos.is_show"
            :title="infos.title"
            @on-ok="ok">
            <Form :model="form" :label-width="80">
                <Form-item label="用户">
                    <Input type="text" v-model="form.username" placeholder="请输入用户名称"></Input>
                </Form-item>
                <Form-item label="密码">
                    <Input type="password" v-model="form.password" placeholder="请输入用户密码"></Input>
                </Form-item>
                <Form-item label="用户类型">
                    <Radio-group v-model="form.vip">
                        <Radio label="1">普通用户</Radio>
                        <Radio label="2">vip用户</Radio>
                    </Radio-group>
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
                    action="http://api.globalinfluence.com/admin.php/admin/system/upload"
                    :on-success="uploadSuccess">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                </Form-item>
            </Form> 
        </Modal>
    </div>
</template>
<script>
    export default {
         data () {
            return {
                loading: false,
                infos:{
                    title: "",
                    is_show: false,
                },
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
                    password: '',
                    vip: '1',
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
                            return h('Button',{
                                props:{
                                    type:btnType,
                                    size:"small"
                                },
                                on:{
                                    click:() => {
                                        let status_text = '启用';
                                        let status = 1;
                                        if (param.row.status == 1) {
                                            status_text = '禁用';
                                            status = 2;
                                        }
                                        this.$Modal.confirm({
                                            title:'提示',
                                            content:"确定要"+status_text+'此账户吗',
                                            onOk: () => {
                                                this.changeStatus(param.row.id);
                                            }
                                        });
                                    }
                                }
                            },param.row.status == 1 ? '禁用' :'启用');
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
                                },"删除")
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
                console.log(param);
                if(res){
                    this.data1 = res.data;
                    this.total = res.total;
                    console.log(res);
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
                }
                this.$Spin.hide();
            },
            // 修改
            async update (form) {
                let res = await this.$api.user.update(form);
                if(res){
                    this.list();
                    this.clear();
                    this.$Message.success('添加成功');
                }
            },
            add(){
                this.infos.title = "添加用户";
                this.infos.is_show = true;
            },
            async insert (form) {
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
                    password: '',
                    vip: '1',
                    status: '1',
                    head_url: '',
                };
                this.$refs.uploadFile.clearFiles();
            },
            ok(){
                if(this.form.id > 0){
                    // 修改
                    this.update(this.form);
                }else{
                    // 添加 form  传入username,password,vip,status,head_url
                    this.insert({
                        username:this.form.username,
                        password:this.form.password,
                        vip:this.form.vip,
                        status:this.form.status,
                        head_url:this.form.head_url,
                    })
                }
            },
            uploadSuccess(res){
                if(res.ret == 200){
                    this.form.head_url = res.data;
                    console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            async changeStatus (id) {
                let res = await this.$api.user.changeStatus({id});
                if(res){
                    this.list();
                    this.$Message.success('操作成功');
                }
            },
            async delete (id) {
                let res = await this.$api.user.delete({id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
        }
    }
</script>
