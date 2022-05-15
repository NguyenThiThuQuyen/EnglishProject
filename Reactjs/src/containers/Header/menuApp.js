export const studentMenu = [
    {
        name: 'homeheader.topic', link: '/topic'
    },
    {
        name: 'homeheader.storystore', link: '/storystore'
    },
    {
        name: 'homeheader.dictionary', link: '/dictionary'
    }
];
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
        name: 'menu.admin.lesson-list',
        menus: [
            {
                name: 'menu.admin.manage-lesson-list', link: '/system/lesson-list-redux'
            }
        ]
    },

    { //quản lý bài học
        name: 'menu.admin.lesson',
        menus: [
            {
                name: 'menu.admin.manage-lesson', link: '/system/lesson-redux'
            }
        ]
    },

    // { //quản lý bài học
    //     name: 'menu.admin.vocab',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-vocab', link: '/system/vocab-redux/:id'
    //         }
    //     ]
    // },

    { //quản lý bài học
        name: 'menu.admin.lesson-item',
        menus: [
            {
                name: 'menu.admin.manage-lesson-item', link: '/system/lesson-item-redux'
            }
        ]
    }
];