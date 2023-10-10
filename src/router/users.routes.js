import Layout from '@/views/users/Layout.vue';
import List from '@/views/users/List.vue';
import User from '@/views/users/User.vue';

export default {
    path: '/users',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'me', component: User }
    ]
};