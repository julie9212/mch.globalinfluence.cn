<template>
    <div>
        <h2>用户列表页</h2><br>
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
        <Table :columns="columns1" :data="data1"></Table><br>   

        <Page :total="total" show-elevator></Page>
    </div>
    


</template>
<script>
    export default {
         data () {
            return {
                columns1: [
                    {title: 'id',key: 'id'},
                    {title: '姓名',key: 'username'},
                    {title: '头像',key: 'head_url'},
                    {title: '注册时间',key: 'time'},
                    {title: 'vip',key: 'vip'},
                    {title: 'status',key: 'status'}
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
                let res = await this.$api.user.list();
                console.log(res);
                this.lists(res.data);
                // this.data1 = res.data;
                // this.total = res.total;
            },
            lists(s){
                console.log(s);
            },
            info(){
                
            }
        }
    }
</script>
