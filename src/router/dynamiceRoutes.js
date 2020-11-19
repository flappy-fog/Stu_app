const { hasOwnMetadata } = require("core-js/fn/reflect");

//  动态路由
const dynamicRoutes = [
    {
        path: '/',
        component: Home,
        children: [

        ]
    },
    {
        path: "*",
        component: () => import(/*webpackChunkName:'page404' */ '../pages/Page404 ')
    },
]

export default dynamicRoutes