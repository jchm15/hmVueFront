import { createWebHistory, createRouter } from "vue-router";

import Home from '@/components/HelloWorld.vue';
import List from '@/components/ListSample.vue';
import If from '@/components/IfSample.vue';
import Parent from '@/components/props/ParentComponent.vue';
import LifeCycle from "@/components/LifeCycle.vue";
import Computed from "@/components/ComputedSample.vue";
import Watch from "@/components/WatchSample.vue";
import Error from '@/components/ErrorSample.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/list",
        name: "list",
        component: List,
    },
    {
        path: "/if",
        name: "if",
        component: If,
    },
    {
        path: "/props",
        name: "props",
        component: Parent,
    },
    {
        path: "/lifeCycle",
        name: "lifeCycle",
        component: LifeCycle,
    },
    {
        path: "/computed",
        name: "computed",
        component: Computed,
    },
    {
        path: "/watch",
        name: "watch",
        component: Watch,
    },
    {
        path : "/:pathMatch(.*)",
        name : "not-found",
        component : Error,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;