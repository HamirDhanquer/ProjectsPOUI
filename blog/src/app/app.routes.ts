import { Routes } from '@angular/router';
import { PostList } from './pages/post-list/post-list';
import { PostDetail } from './pages/post-detail/post-detail';
import { About } from './pages/about/about';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [

    {path: 'admin', component: Admin},
    {path: 'posts', component: PostList},
    {path: 'post/:id', component: PostDetail},
    {path: 'about', component: About},
    {path: '**', redirectTo: ''}
];
