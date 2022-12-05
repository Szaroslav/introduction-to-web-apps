import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoPreviewComponent } from './photos/photo-preview/photo-preview.component';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
    {path: 'posts', component: PostsComponent},
    {path: 'photos', component: PhotosComponent, children: [{ path: 'preview/:id', component: PhotoPreviewComponent }]},
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
