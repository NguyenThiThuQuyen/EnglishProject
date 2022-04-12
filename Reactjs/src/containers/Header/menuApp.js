export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-student', link: '/system/user-student'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            }
        ]
    },

    { //quản lý chủ đề
        name: 'menu.admin.topic',
        menus: [
            {
                name: 'menu.admin.manage-topic', link: '/system/topic-redux'
            }
        ]
    },

    { //quản lý danh sách bài học
        name: 'menu.admin.list-lession',
        menus: [
            {
                name: 'menu.admin.manage-list-lession', link: '/system/manage-list-lession'
            }
        ]
    },

    { //quản lý bài học
        name: 'menu.admin.lession',
        menus: [
            {
                name: 'menu.admin.manage-lession', link: '/system/manage-lession'
            }
        ]
    }
];