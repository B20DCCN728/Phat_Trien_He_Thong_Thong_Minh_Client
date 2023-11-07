import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";

const routes = [
    {
        path: "/home",
        name: "Layout",
        component: Layout,
        children: [
            {
                path: "dataset",
                name: "Dataset",
                component: () => import("../components/Dataset.vue")
            },
            {
                path: "overview",
                name: "Table",
                component: () => import("../components/Table.vue"),
            },
            {
                path: "add",
                name: "Add",
                component: () => import("../components/Add.vue"),
            },
        ],
    },
];


const router = createRouter({   
    history: createWebHistory(),
    routes,
});

router.replace({ path: '*', redirect: '/' });

export default router;