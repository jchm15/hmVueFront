<template>
    <div>
        <h1>Composition API</h1>
        <button @click="add">Add Data</button>
        <button @click="patch">Modify Data</button>
        <button @click="remove" :disabled="list.length === 0">Remove Data</button>

        <p>{{ ref_data }}</p>
        <p>{{ reactive_data.value }}</p>

        <template v-if="list.length">
            <div v-for="(item, index) in list" :key="index">
                <span>Id : {{ item.id }}  |  Name : {{ item.name }}  {{ item.desc ? `  |  Desc : ${item.desc}` : '' }}</span>
            </div>
        </template>
        <template v-else>
            <div>No Data</div>
        </template>
    </div>
</template>

<script>
/**
 * ---inject---
 * composition API 사용 시 main.js에서 세팅
 * app.provide('$axios', axios);
 *
 * */
import {inject, ref, reactive, onMounted} from "vue";
export default {
    name: "JsonServer2",
    setup() {
        const $axios = inject('$axios');
        let url = `http://localhost:3000`;
        let list = ref([]);
        let ref_data = ref('');
        let reactive_data = reactive({});


        /**
         * ref => 모든 데이터 형에 적용 가능, 변수명.value 로 접근
         * reactive => object, array 이외 사용 불가, 변수명.field 로 접근
         * */



        const getList  = async () => {
            let rtn = await $axios.get(`${url}/sample`);

            if(rtn.status === 200) {
                list.value = rtn.data;
            }
        };

        const add = async () => {
            let data = {
                id: list.value.length+1,
                name: `sample${list.value.length+1}`
            }
            try {
                await $axios.post(`${url}/sample`, data);
                ref_data.value = "Execute Add"
                reactive_data.value = "Complete Add";
            } catch(e) {
                alert("add error")
            }

            await getList();
        };

        const patch = async () => {
            let data = {
                desc: "patch"
            }

            try {
                await $axios.patch(`${url}/sample/${list.value.length}`, data);
                ref_data.value = "Execute Patch"
                reactive_data.value = "Complete Patch";
            } catch (e){
                alert("patch error")
            }
            await getList();
        };

        const remove = async () => {
            if (list.value.length === 0) {
                alert("No Data")
            } else {
                try {
                    await $axios.delete(`${url}/sample/${list.value.length}`);
                    ref_data.value = "Execute Remove"
                    reactive_data.value = "Complete Remove";
                } catch(e) {
                    alert("remove error")
                }

                await getList();
            }
        };

        onMounted(() => {
            console.log("Composition API Sample")

            ref_data.value = "ref value";
            reactive_data.value = "reactive_data";

            console.log(ref_data, reactive_data)
            getList();
        });

        return { url, list, getList, add, patch, remove, ref_data, reactive_data };
    }

    // data() {
    //     return {
    //         url: `http://localhost:3000`,
    //         list: [],
    //     }
    // },
    // methods: {
    //     async getList() {
    //         let rtn = await this.$axios.get(`${this.url}/sample`);
    //
    //         if(rtn.status === 200) {
    //             this.list = rtn.data;
    //         }
    //     },
    //     async add() {
    //         let data = {
    //             id: this.list.length+1,
    //             name: `sample${this.list.length+1}`
    //         }
    //         await this.$axios.post(`${this.url}/sample`, data);
    //
    //         await this.getList();
    //     },
    //     async patch() {
    //         let data = {
    //             desc: "patch"
    //         }
    //
    //         await this.$axios.patch(`${this.url}/sample/${this.list.length}`, data);
    //
    //         await this.getList();
    //     },
    //     async remove() {
    //         if(this.list.length === 0) {
    //             alert("No Data")
    //         } else {
    //             await this.$axios.delete(`${this.url}/sample/${this.list.length}`);
    //
    //             await this.getList();
    //         }
    //     }
    // },
    // async mounted() {
    //     await this.getList();
    // }
}
</script>

<style scoped>
button {
    margin: 20px;
}
</style>