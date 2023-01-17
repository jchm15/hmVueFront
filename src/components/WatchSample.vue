<template>
    <div>
        <h1>Watch Sample</h1>
        <hr/>
        <div>
            <button @click="increaseNum">Increase</button>
            <button @click="decreaseNum">Decrease</button>
        </div>
        <h2>{{ intA }} {{ this.strMessage }}</h2>
    </div>
</template>

<script>
export default {
    name: "WatchSample",
    data() {
        return {
            intA: 0,
            strMessage: "",
        }
    },
    methods: {
        increaseNum() {
            this.intA++;
        },
        decreaseNum() {
            this.intA--;
        },
    },
    watch: {
        intA(newVal, oldVal,) {
            if(newVal === 0) {
                this.strMessage = "";
                return;
            }
            if(newVal > oldVal) {
                this.strMessage = "increase"
            } else {
                this.strMessage = "decrease"
            }
        },
    },
}
</script>

<style scoped>
button {
    padding: 5px;
    margin: 5px;
}
</style>