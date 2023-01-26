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
 * composition API 사용 시 main.js에서 라이브러리를 provide 함수로 (key: value) 형식으로 명시하여 제공
 * app.provide('$axios', axios);
 * 사용할 라이브러리는 컴포넌트 내에서 inject import 후 provide 함수로 명시한 key 값으로 의존성 inject
 * */
import {inject, ref, reactive, onMounted, watch} from "vue";
import {fnSample} from "@/utils/composition_test"

export default {
    name: "JsonServer2",
    setup() {
        /**
         * ref => 모든 데이터 형에 적용 가능, 변수명.value 로 접근
         * reactive => object, array 이외 사용 불가, 변수명.field 로 접근
         */
        const $axios = inject('$axios');
        let url = `http://localhost:3000`;
        let list = ref([]);
        let ref_data = ref('');
        let reactive_data = reactive({});
        let exportFn_data = ref(fnSample(100,2));

        /**
         *  Methods Start
         */
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
        /**
         *  Methods End
         */

        /**
         *  onMounted Hook
         */
        onMounted(() => {
            getList();
        });

        /**
         *  watch
         * */
        watch(() => list.value, (newValue, oldValue) => {
            console.log('list Changed ---- ', {newValue, oldValue})
        }, {deep: true, immediate: true})
        watch(() => ref_data.value, (newValue, oldValue) => {
            console.log('ref_data Changed ---- ', {newValue, oldValue})
        })

        return { url, list, getList, add, patch, remove, ref_data, reactive_data, exportFn_data };
    }
}
</script>

<style scoped>
button {
    margin: 20px;
}
</style>