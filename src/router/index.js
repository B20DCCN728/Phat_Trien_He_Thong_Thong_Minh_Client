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
                component: () => import("../components/Dataset.vue"),
            },
            {
                path: "dataset/:datasetId",
                name: "Table",
                component: () => import("../components/Table.vue"),
                props: true,
            },
            {
                path: "dataset/:datasetId/add",
                name: "Add",
                component: () => import("../components/Add.vue"),
            },
            {
                path: "model",
                name: "Model",
                component: () => import("../components/Model.vue"),
            },
            {
                path: "model/:typeTrain",
                name: "Selectdat",
                component: () => import("../components/SelectData.vue"),
                // props: true,
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