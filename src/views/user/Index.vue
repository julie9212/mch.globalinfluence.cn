<template>
    <div>
        <h2>用户列表页</h2>
        <Row>
            <Col span="2">
                <Button type="info">添加</Button>
            </Col>
            <Col span="8" offset="14">
                <Row>
                    <Col span="18">
                        <Input placeholder="请输入..." style="width: 100%"></Input>
                    </Col>
                    <Col span="6">
                        <Button type="primary">搜索</Button>
                    </Col>
                </Row>
            </Col>
        </Row><br>
        <!-- <Table :columns="columns1" :data="data1"></Table><br>    -->
        <Table border :columns="columns1" :data="data1" :loading="loading"></Table><br>
        <Page :total="total" show-elevator></Page>
    </div>
</template>
<script>
    export default {
         data () {
            return {
                loading: false,
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
                                            
                                        }
                                    }
                                },"修改"),
                                h("Button",{
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
                total: 10
            }
        },
        mounted(){
            this.list();
        },
        methods:{
            async list(){
                this.loading = true;
                let res = await this.$api.user.list();
                if(res){
                    this.data1 = res.data;
                }
               this.loading = false;
            },
            info(){
                
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
