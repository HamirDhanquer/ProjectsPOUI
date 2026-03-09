import { Component } from '@angular/core';
import { PoWidgetModule, PoInfoModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  imports: [
    PoWidgetModule,
    PoInfoModule
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {

  constructor(
    private router: Router,
    private postService: PostService

  ) { }

  posts: Post[] = [];

  ngOnInit() {
    // Aqui você pode carregar os posts de um serviço ou API
    this.posts = this.postService.getPosts();
  }

  verPost(id: number) {
    this.router.navigate(['/post', id]);
  }

}
