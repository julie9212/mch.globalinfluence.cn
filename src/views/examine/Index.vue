<template>
    <div>
        <h2>文章审核</h2>
        <br>     
        <Row>
            <Col span="16" offset="8">
                <Form inline>
                    <Form-item prop="search">
                        <Input v-model="search.value">
                            <Select v-model="search.type" slot="prepend" style="width: 80px">
                                <Option v-for="(item,index) in searchList.type" :key="index" :value="item.value">{{item.title}}</Option>
                            </Select>
                        </Input>
                    </Form-item>
                    <Form-item prop="search">选择类型：
                        <Select v-model="search.examine" style="width:200px">
                            <Option v-for="item in searchList.examine" :value="item.value">{{ item.title }}</Option>
                        </Select>
                    </Form-item>
                     <Form-item prop="search">
                        <Button type="primary" @click="list" size="small">确定</Button>
                    </Form-item>
                </Form>
            </Col>
        </Row><br>
        <Table  height="400" border :columns="columns" :data="data" :loading="loading"></Table>
        <br>
        <Page :total="total" @on-change="page" show-total></Page>
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
                <Form-item label="审核原因:">
                    <Input type="text" v-model="form.examine_reason" placeholder="请输入审核情况"></Input>
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
                infos2:{
                    title: "",
                    is_show: false,
                },
                infosList: '',
                form: {
                    examine: '',
                    examine_reason:'',
                },
                search:{
                    value : '',
                    type: 'title',
                    examine: '',
                },
                searchList : {
                    type: [
                        {
                            value : 'title',
                            title :'标题',
                        },
                        {
                            value : 'writer',
                            title :'作者',
                        },
                    ],
                    examine: [
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

                },
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
                        title: '提交时间',
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
                        title: '操作',
                        key: 'action',
                        align: "center",
                        render :(h,param) => {
                            return h('div',[
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
                                on:{
                                    click:()=>{
                                        // 内容跳转
                                        this.updataContent(param.row.id);
                                    }
                                }
                            },'查看');
                        }, 
                    },
                ],
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
                    search:this.search.type,
                    searchvalue:this.search.value,
                    examine:this.search.examine,
                }
                // console.log(param);
                let res = await this.$api.examine.list(param);
                console.log(res);
                if(res){
                    this.data = res.data;
                    this.total = res.total;
                    this.column = res.column;
                    this.column_id = res.column_id;
                    console.log(res);
                }
                this.loading = false;
            },
            page(num){
                this.list(num);
            },
            // // 修改
            async update (form) {
                let res = await this.$api.examine.examine(form);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            is_ok(){
                this.update(this.form);
            },
            async delete (id) {
                let res = await this.$api.examine.delete({id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            },
            listColumn_id(n){
                let column_id = this.column;
                for (var i in column_id){
                    if(column_id[i].id == n){
                        return column_id[i].name;
                    }
                }
            },
            updataContent(n){
                let column_id = this.column_id;
                let centent_id = n;
                this.$router.push({ path:'/content/'+ column_id + '/' + centent_id  })
            }
        }
    }           
</script>
