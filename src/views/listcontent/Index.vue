<template>
    <div>
        <h2>文章管理</h2>
        <Row>
            <Col span="2">
                <!-- <Button type="info" @click="add">添加文章</Button> -->
                <Button type="info">添加文章</Button>
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
        <Row>
            <Col span="24">
                <Table height="400" :columns="columns" :data="data"></Table>
            </Col>
        </Row>
        <Page :total="total" @on-change="page"></Page>

        <Modal
            v-model="modal.is_show"
            :title="modal.title"
            @on-ok="ok">
                <Form :model="form" :label-width="80">
                    <Form-item label="标题">
                        <Input v-model="form.title" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="作者">
                        <Input v-model="form.writer" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="所属栏目">
                        <Select v-model="form.column_id">
                            <Option v-for="item in column" :value="item.id">{{item.pid_name}} => {{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="排序">
                        <Input v-model="form.sort" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="权限">
                        <Radio-group v-model="form.authority">
                            <Radio label="0">all</Radio>
                            <Radio label="1">vip</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="审核">
                        <Radio-group v-model="form.examine">
                            <Radio label="0">未审核</Radio>
                            <Radio label="1">已审核</Radio>
                            <Radio label="2">驳回</Radio>
                        </Radio-group>
                    </Form-item>

                </Form>
        </Modal><br>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal:{
                    title:'',
                    is_show:false,
                },
                form:{
                    title: '',
                    writer: '',
                    column_id: '',
                    sort: '',
                    authority: '',
                    examine: '',
                },
                search:{
                    value : '',
                    type: 'title',
                },
                searchList : [
                    {
                        value : 'title',
                        title :'标题',
                    },
                    {
                        value : 'writer',
                        title :'作者',
                    },
                ],
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center"
                    },
                    {
                        title: '作者',
                        key: 'writer',
                        align: "center"
                    },
                    {
                        title: '所属栏目',
                        key: 'column_id',
                        align: "center",
                        render :(h,param) => {
                            let column_id = this.listColumn_id(param.row.column_id);
                            return h('div',{},column_id);
                        }, 
                    },
                    {
                        title: '排序(倒序)',
                        key: 'sort',
                        align: "center",
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: "center"
                    },
                    {
                        title: '查看权限',
                        key: 'authority',
                        align: "center",
                        render :(h,param) => {
                            let authoritysty;
                            if(param.row.authority == 1){
                                authoritysty = "vip";
                            }else{
                                authoritysty = "all";
                            }
                            return h('div',{},authoritysty);
                        }
                    },
                    {
                        title: '审核',
                        key: 'examine',
                        align: "center",
                        render :(h,param) => {
                            let examine;
                            if(param.row.examine == 0){
                                examine = "未审核";
                            }else if(param.row.examine == 1){
                                examine = "已审核";
                            }else  if(param.row.examine == 2){
                                examine = "驳回";
                            }else{
                                examine = "审核错误";
                            }
                            return h('div',{},examine);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: "center",
                        render :(h,param) => {
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:"warning",
                                        size:"small"
                                    },
                                    on:{
                                        click:()=>{
                                            // 修改栏目
                                            this.modal.is_show = true;
                                            this.form.id = param.row.id;
                                            this.modal.title = '修改';
                                            this.info();
                                        }
                                    }
                                },'修改'),
                                h('Button',{
                                    props:{
                                        type:"error",
                                        size:"small"
                                    },
                                    style:{
                                        margin:"0 5px",
                                    },
                                    on:{
                                        click:()=>{
                                            this.$Modal.confirm({
                                                title:"提示",
                                                content:"确定要删除此栏目吗",
                                                onOk:() =>{
                                                    this.delete(param.row.id);
                                                }
                                            })
                                        }
                                    }
                                },'删除'),
                            ])
                        }, 
                    },
                    {
                        title: '内容',
                        key: 'sobColumn',
                        align: "center",
                        render :(h,param) => {
                            return h('Button',{
                                props:{
                                    type:"success",
                                    size:"small"
                                },
                                // on:{
                                //     click:()=>{
                                //         // 内容跳转
                                //         this.content(param.row.id);
                                //     }
                                // }
                            },'查看');
                        }, 
                    },
                ],
                column: [],
                data: [],
                total: 1,
            }
        },
        mounted(){
            this.list();
        },
        methods:{
             async list(page = 1){
                this.loading = true;
                let search = this.search.value;
                let param = {
                    page:page,
                    id:this.$route.params.id,
                    search:this.search.type,
                    searchvalue:this.search.value,
                }
                // console.log(param);
                let res = await this.$api.listcontent.list(param);
                console.log(res);
                if(res){
                    this.data = res.data;
                    this.total = res.total;
                    this.column = res.column;
                    // console.log(res);
                }
                this.loading = false;
            },
            page(num){
                this.list(num);
            },
            listColumn_id(n){
                let column_id = this.column;
                for (var i in column_id){
                    if(column_id[i].id == n){
                        return column_id[i].name;
                    }
                }
            },
            async info () {
                let res = await this.$api.listcontent.info({id:this.form.id});
                if(res){
                    this.form = res;
                    this.form.authority = res.authority+'';
                    this.form.examine = res.examine+'';
                }
                console.log(res.authority);
            },
            async update(form){
                let res = await this.$api.listcontent.update(form);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            ok(){
                this.update(this.form);
            },
            async delete(id){
                let res = await this.$api.listcontent.delete({id:id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
            async changeExamine (id) {
                let res = await this.$api.listcontent.changeExamine({id});
                if(res){
                    this.list();
                    this.$Message.success('操作成功');
                }
            },
            // 子栏目跳转
            // content(n){
            //     let urlSub = n;
            //     this.$router.push({ path:'/list/'+urlSub  })
            // }
        }
    }
</script>
