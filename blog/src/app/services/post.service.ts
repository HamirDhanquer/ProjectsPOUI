import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private posts: Post[] = [
    {    
      id: 1,
      title: 'Primeiro post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      except: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'João Silva'
    },
    {
      id: 2,
      title: 'Aprenda Angular',
      content: 'Como aprender Angular de forma rapida e eficiente.',
      except: 'Aprenda Angular de forma rápida e eficiente. Este guia irá ajudá-lo a dominar o framework em pouco tempo.',
      author: 'Adriana Souza'
    }
  ];

  getPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }
  
}
