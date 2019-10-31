<template>
    <div>
        <h2>内容管理</h2>
        <Row>
            <!-- <Col span="2">
                <Button type="info" @click="add">内容列表</Button>
            </Col> -->
        </Row><br>


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

                data: [],
                total: "",
            }
        },
        mounted(){
            this.list();
        },
        methods:{
             async list(){
                // this.loading = true;
                let res = await this.$api.content.list();
                console.log(res);
                // if(res){
                //     this.data = res.data;
                //     this.total = res.total;
                //     console.log(res);
                // }
                // this.loading = false;
            },
            
        }
    }
</script>
