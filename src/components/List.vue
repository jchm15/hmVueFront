<template>
    <div class="hello">
        <h1>v-for Sample</h1>
        <hr/>
        <div>
            <button @click="refreshList">Refresh</button>
        </div>
        <h2> List Total Count : {{ this.listInfo.length }}</h2>
    </div>

    <div>
        <li v-for="(item,index) in listInfo" :key="index">
            <img :src="item" alt="이미지"/>
        </li>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            listInfo: {},
        }
    },
    methods: {
        getList() {
            // this.$axios.get(`https://jsonplaceholder.typicode.com/todos`).then(resp => {
            //     if(resp.status === 200) {
            //         this.listInfo = resp.data;
            //     }
            // });

            let randomNum = Math.floor(Math.random() * 4 + 1);
            this.$store.dispatch("refreshList", randomNum).then(resp => {
                if(resp.data.status === 'success') {
                    this.listInfo = resp.data.message;
                }
            });
        },
        async refreshList() {
            await this.getList();
        }
    },
    async mounted() {
        await this.getList();
    },
}
</script>

<style scoped>

</style>