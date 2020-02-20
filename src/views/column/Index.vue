<template>
    <div>
        <h2>栏目管理</h2>
        <Row>
            <Col span="2">
                <Button type="info" @click="add">添加顶级栏目</Button>
            </Col>
        </Row><br>
        <Row>
            <Col span="24">
                <Table height="400" :columns="columns" :data="data"></Table>
            </Col>
        </Row>

        <Modal
            v-model="modal.is_show"
            :title="modal.title"
            @on-ok="ok">
                <Form :model="form" :label-width="80">
                    <Form-item label="栏目名称">
                        <Input v-model="form.name" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="排序">
                        <Input v-model="form.sort" placeholder="请输入"></Input>
                    </Form-item>
                </Form>
        </Modal>
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
                    name: '',
                    sort: 0,
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '栏目名称',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '所属栏目',
                        key: 'pid',
                        align: "center",
                        render :(h,param) => {
                            return h('div',{
                            },'顶级栏目');
                        }, 
                    },
                    {
                        title: '排序(正序)',
                        key: 'sort',
                        align: "center",
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: "center"
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
                                            this.modal.title = '修改用户';
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
                        title: '类型',
                        key: 'type',
                        align: "center",
                        render :(h,param) => {
                            // console.log(param.row.type);
                            let type;
                            if(param.row.type == 1){
                                type = "列表";
                            }else{
                                type = "内容";
                            }
                            return h('div',[
                                h('span',{
                                },type),
                                h('Button',{
                                    props:{
                                        type:"text",
                                        size:"small"
                                    },
                                    style:{
                                        color:"#2db7f5"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$Modal.confirm({
                                                title:"提示",
                                                content:"确定修改栏目类型吗",
                                                onOk:() =>{
                                                    this.changes(param.row.id);
                                                }
                                            })
                                        }
                                    }
                                },'修改')
                            ]);
                        }
                    },
                    { 
                        title: '子栏目',
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
                                        // 子栏目跳转
                                        this.subColumn(param.row.id);
                                    }
                                }
                            },'子栏目');
                        }, 
                    },
                ],
                data: [],
                total: "",
            }
        },
        mounted(){
            this.list();
        },
        methods:{
             async list(){
                this.loading = true;
                let res = await this.$api.column.list();
                if(res){
                    this.data = res.data;
                    this.total = res.total;
                    console.log(res);
                }
                this.loading = false;
            },
            add(){
                this.modal.title = '添加顶级栏目';
                this.modal.is_show = true;
                this.clear();
            },
            async insert(form){
                // console.log(form);
                let res = await this.$api.column.insert(form);
                if(res){
                    this.list();
                    this.$Message.success('添加成功');
                }
            },
            async info () {
                let res = await this.$api.column.info({id:this.form.id});
                if(res){
                    this.form = res;
                    this.modal.title = '修改顶级栏目';
                    this.modal.is_show = true;
                }
            },
            async update(form){
                console.log(form);
                let res = await this.$api.column.update(form);
                console.log(res);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            ok(){
                if(this.form.id > 0){
                    this.update(this.form);
                }else{
                    this.insert({
                        name : this.form.name,
                        sort : this.form.sort,
                    });
                }
            },
            clear(){
                this.form = {
                    name: '',
                    sort: 0,
                };
            },
            async delete(id){
                let res = await this.$api.column.delete({id:id});
                if(res){
                    this.list();
                    this.$Message.success('删除成功');
                }
            }, 
            async changes(id) {
                let res = await this.$api.column.changeType({id});
                console.log(res);
                if(res){
                    this.list();
                    this.$Message.success('操作成功');
                }
            },
            // 子栏目跳转
            subColumn(n){
                let urlSub = n;
                this.$router.push({ path:'/subcolumn/'+urlSub  })
            }
        }
    }
</script>
