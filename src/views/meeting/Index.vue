<template>
    <div>
        <h2>文章审核</h2>
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
        <!-- <Table height="400" border :columns="columns" :data="data"></Table> -->
        <Table height="400" border :columns="columns" :data="data" :loading="loading" ></Table>
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
                        title: '会议名称',
                        key: 'meeting',
                        align: "center"
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        align: "center"
                    },
                    {
                        title: 'E-mail',
                        key: 'email',
                        align: "center"
                    },
                    {
                        title: '公司',
                        key: 'company',
                        align: "center"
                    },
                    {
                        title: '职务',
                        key: 'post',
                        align: "center"
                    },
                    {
                        title: '提交时间',
                        key: 'create_time',
                        align: "center"
                    },
                    // {
                    //     title: '审核',
                    //     key: 'examine',
                    //     align: "center"
                    // },
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
                let res = await this.$api.meeting.list(param);
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
           
            // // 修改
            async update (form) {
                let res = await this.$api.meeting.examine(form);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            is_ok(){
                this.update(this.form);
            },
        }
    }           
</script>
