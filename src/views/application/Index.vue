<template>
    <div>
        <h2>合作申请</h2>
        <br>    
        <Row>
            <Col span="8" offset="16">
                <Row>
                    <Form inline>
                        <Form-item prop="search">选择类型：
                                <Select v-model="search.value" style="width:200px">
                                    <Option v-for="item in searchList" :value="item.value">{{ item.title }}</Option>
                                </Select>
                        </Form-item>
                        <Button type="primary" @click="list" size="small">确定</Button>
                    </Form>
                </Row>
            </Col>
        </Row><br>
        <Table  height="400" border :columns="columns" :data="data" :loading="loading"></Table>
        <br>
        <Modal
            v-model="infos.is_show"
            :title="infos.title"
            @on-ok="infos.is_show = false">
            <div>
                <p>id:{{infosList.id}}</p>
                <p>姓名:{{infosList.name}}</p>
                <p>性别:{{infosList.sex}}</p>
                <p>手机号:{{infosList.phone}}</p>
                <p>email:{{infosList.email}}</p>
                <p>简介:{{infosList.introduce}}</p>
                <p>公司:{{infosList.company}}</p>
                <p>职务:{{infosList.post}}</p>
            </div>

        </Modal>
        <!-- <Page :total="total" @on-change="page" show-total></Page> -->
        <Modal
            v-model="infos2.is_show"
            :title="infos2.title"
            @on-ok="is_ok">
            <Form :model="form" :label-width="80">
                <Radio-group v-model="form.examine">
                    审核：
                    <Radio label="1"><span>未审核</span></Radio>
                    <Radio label="2"><span>通过</span></Radio>
                    <Radio label="3"><span>驳回</span></Radio>
                </Radio-group>
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
                infos2:{
                    title: "",
                    is_show: false,
                },
                infosList: '',
                search:{
                    value : '',
                    examine: 'examine',
                },
                searchList : [
                     {
                        value : 'all',
                        title :'全部',
                    },
                    {
                        value : '1',
                        title :'未审核',
                    },
                    {
                        value : '2',
                        title :'通过',
                    },
                    {
                        value : '3',
                        title :'驳回',
                    },
                ],
                form: {
                    examine: '',
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
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
                                    height:"80px",
                                    padding:"10px"
                                }
                            })
                        },
                    },
                     {
                        title: '姓名',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '提交时间',
                        key: 'create_time',
                        align: "center"
                    },
                    {
                        title: '审核',
                        key: 'examine',
                        align: "center",
                        render :(h,param) => {
                            let examine;
                            if(param.row.examine == 1){
                                examine = "未审核";
                            }else if(param.row.examine == 2){
                                examine = "通过";
                            }else if(param.row.examine == 3){
                                examine = "驳回";
                            }else{
                                examine = "执行错误";
                            }
                            return h("div",[
                                h("span",{},examine),
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
                                            this.infos2.is_show = true;
                                            this.infos2.id = param.row.id;
                                            console.log(param.row);
                                            this.form = param.row;
                                            this.form.examine = param.row.examine + '';
                                            this.infos2.title = '审核';
                                        }
                                    }
                                },"修改")
                            ],examine)
                        },
                    },
                    {
                        title: '详细信息',
                        key: 'action',
                        align: 'center',
                        render :(h,param) => {
                            return h("div",[
                                h("Button",{
                                    props:{
                                        type:"info",
                                        size:"small"
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.infos.is_show = true;
                                            this.infos.id = param.row.id;
                                            this.infos.title = '详细信息';
                                            this.info();
                                        }
                                    }
                                },"查看"),
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render :(h,param) => {
                            return h("div",[
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
                param[this.search.examine] = this.search.value;
                // console.log(param);
                let res = await this.$api.application.list(param);
                // console.log(res);
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
            // // // 修改详情
            async info(){
                this.$Spin.show();
                let res = await this.$api.application.info({id:this.infos.id});
                if (res) {
                    console.log(res);
                    this.infosList = res;
                }
                this.$Spin.hide();
            },
            // // 修改
            async update (form) {
                let res = await this.$api.application.examine(form);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            is_ok(){
                this.update(this.form);
            },
            async delete (id) {
                let res = await this.$api.application.delete({id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
        }
    }           
</script>
