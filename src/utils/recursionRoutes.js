// 根据服务器用户返回的menuList数据和allRoutes进行匹配，得到符合当前用户的有效路由配置

/**
 * 
 * @param {Array} allRoutes 用户的有效的完整路由配置
 * @param {Array} menuList  服务器返回的用户菜单名字
 */
import allRoutes from "../router/allRoutes"

const recursionRoutes = (allRoutes, menuList) => {

    //  声明一个新的数组，放入匹配成功的路由信息
    let userRoutes = []
    allRoutes.forEach(item => {  //  拿每一个路由信息跟后台传过来的指定用户权限菜单进行对比
        menuList.forEach(v => {
            if (item.meta.name === v.name) {
                if (v.children && v.children.length > 0) { //  Array.isArray(v.children)    判断有没有子路由
                    item.children = recursionRoutes(item.children, v.children);     //  相当于修改了allRoutes中的数据
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}

// export default recursionRoutes

let menuList = [
    {
        "name": "管理首页"
    },
    {
        "name": "学员管理",
        "children": [
            {
                "name": "学员项目管理"
            }
        ]
    },
    {
        "name": "我的中心"
    }
]

console.log(recursionRoutes(allRoutes, menuList));