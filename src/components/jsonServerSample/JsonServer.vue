<template>
    <div>
        <button @click="add">Add Data</button>
        <button @click="patch">Modify Data</button>
        <button @click="remove">Remove Data</button>
    </div>
</template>

<script>
export default {
    name: "JsonServer",
    data() {
        return {
            list: null,
            data: null,
        }
    },
    methods: {
        async getList() {
            this.list = await this.$axios.get("http://localhost:3000/hm");
        },
        async add() {
            await this.getList();

            let data = {
                id: this.list.data.length+1
            }
            await this.$axios.post(`http://localhost:3000/hm`, data);
        },
        async patch() {
            await this.getList();

            let data = {
                desc: "patch"
            }
            await this.$axios.patch(`http://localhost:3000/hm/${this.list.data.length}`, data);
        },
        async remove() {
            await this.getList();
            if(this.list.data.length === 0) {
                alert("No Data")
            } else {
                await this.$axios.delete(`http://localhost:3000/hm/${this.list.data.length}`);
            }
        }
    },
    async created() {

    }
}
</script>

<style scoped>
button {
    margin: 20px;
}
</style>