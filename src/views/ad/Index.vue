<template>
    <div>
        <h2>广告</h2>
        <br>    
        <Row>
            <Col span="2">
                <Button type="info" @click="add">添加</Button>
            </Col>
            <Col span="8" offset="14">
                <Row>
                    <Form inline> 
                        <Form-item prop="search">选择类型：
                                <Select v-model="search.value" style="width:200px">
                                    <Option v-for="item in searchList" :value="item.value">{{ item.title }}</Option>
                                </Select>
                        </Form-item>
                        <Button type="primary" @click="list" size="small">选择</Button>
                    </Form>
                </Row>
            </Col>
        </Row><br>
        <Table  height="400" border :columns="columns" :data="data" :loading="loading"></Table>
        <br>
        <Page :total="total" @on-change="page" show-total></Page>
        <Modal
            v-model="infos.is_show"
            :title="infos.title"
            @on-ok="ok">
            <Form :model="form" :label-width="80">
                <Form-item label="标题">
                    <Input type="text" v-model="form.title" placeholder="请输入广告标题"></Input>
                </Form-item>
                <Form-item label="链接">
                    <Input type="text" v-model="form.url" placeholder="请输入链接地址"></Input>
                </Form-item>
                <Form-item label="排序">
                    <Input type="text" v-model="form.sort" placeholder="请输入排序"></Input>
                </Form-item>
                <Form-item label="类型">
                    <Select v-model="form.type" style="width:200px">
                        <Option value="1" label="大图1">
                            <span>大图1</span>
                        </Option>
                        <Option value="2" label="小图4">
                            <span>小图4</span>
                        </Option>
                        <Option value="3" label="平台4">
                            <span>平台4</span>
                        </Option>
                        <Option value="4" label="合作16">
                            <span>合作16</span>
                        </Option>
                        <Option value="5" label="合作16">
                            <span>banner</span>
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="上传图片">
                <Upload
                    ref="uploadFile"
                    action="http://mchapi.globalinfluence.cn/admin.php/admin/system/upload"
                    :on-success="uploadSuccess">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <img :src="form.img_url" style="height:100px">
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
                    type: 'type',
                },
                searchList : [
                     {
                        value : 'all',
                        title :'全部',
                    },
                    {
                        value : '1',
                        title :'大图1',
                    },
                    {
                        value : '2',
                        title :'小图4',
                    },
                    {
                        value : '3',
                        title :'平台4',
                    },
                    {
                        value : '4',
                        title :'合作16',
                    },
                    {
                        value : '5',
                        title :'banner',
                    },
                ],
                form: {
                    title: '',
                    url: '',
                    sort: 0,
                    type:'',
                    img_url: '',
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center"
                    },
                    {
                        title: '广告图',
                        key: 'img_url',
                        align: "center",
                        render :(h,param) => {
                            return h('img',{
                                attrs:{
                                    src:param.row.img_url
                                },
                                style:{
                                    height:"80px",
                                    padding:"10px"
                                }
                            })
                        },
                    },
                    {
                        title: '图片链接',
                        key: 'url',
                        align: "center"
                    },
                    {
                        title: '上传时间',
                        key: 'update_time',
                        align: "center"
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        align: "center"
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align: "center",
                        render :(h,param) => {
                            let type;
                            if(param.row.type == 1){
                                type = "大图1";
                            }else if(param.row.type == 2){
                                type = "小图4";
                            }else if(param.row.type == 3){
                                type = "平台连接4";
                            }else if(param.row.type == 4){
                                type = "合作16";
                            }else if(param.row.type == 5){
                                type = "banner";
                            }
                            return h("div",{},type)
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
                                            this.infos.title = '修改广告';
                                            this.info();
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
                                                content:"确定要删除吗",
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
                data: [],
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
                    page:page,
                }
                param[this.search.type] = this.search.value;
                // console.log(param);
                let res = await this.$api.ad.list(param);
                // console.log(this.$route.params.type);
                if(res){
                    this.data = res.data;
                    this.total = res.total;
                    // console.log(res);
                }
               this.loading = false;
            },
            page(num){
                this.list(num);
            },
            // // 修改详情
            async info(){
                this.$Spin.show();
                let res = await this.$api.ad.info({id:this.form.id});
                if (res) {
                    // console.log(res);
                    this.form = res;
                    this.form.type = res.type + '';
                }
                this.$Spin.hide();
            },
            // // 修改
            async update (form) {
                console.log(form);
                let res = await this.$api.ad.update(form);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            add(){
                this.infos.title = "添加广告";
                this.infos.is_show = true;
            },
            async insert (form) {
                let res = await this.$api.ad.insert(form);
                if(res){
                    this.list();
                    this.clear();
                    this.$Message.success('添加成功');
                }
            },
            
            // 清空addInfo , 上传图片
            clear(){
                this.form = {
                    title: '',
                    url: '',
                    img_url: '',
                    sort: 0,
                    type: '',
                };
                this.$refs.uploadFile.clearFiles();
            },
            ok(){
                if(this.form.id > 0){
                    // 修改
                    this.update(this.form);
                }else{
                    // 添加 form  
                    this.insert({
                        title:this.form.title,
                        url:this.form.url,
                        img_url:this.form.img_url,
                        sort:this.form.sort,
                        type:this.form.type,
                    })
                }
            },
            uploadSuccess(res){
                if(res.ret == 200){
                    this.form.img_url = res.data;
                    console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            async delete (id) {
                let res = await this.$api.ad.delete({id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
        }
    }           
</script>
