import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../comment/Comment';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };

  private postUrl = environment.backUrl + "/post";

  constructor(private http: HttpClient) {
  }
  getPostById(idAsString): Observable<Post> {
    let id = Number(idAsString);
    return this.http.get<Post>(this.postUrl + '/' + id);
  }

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post, this.options);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postUrl + '/' + post.id, post, this.options);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(this.postUrl + '/' + id, this.options);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.postUrl + 's/count');
  }
  getPagedPosts(page: number = 1, size: number = 6): Observable<Post[]> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(size));
    return this.http.get<Post[]>(this.postUrl, { params });
  }

  addComment(id:number,comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.postUrl+"/"+id+"/addcomment", comment, this.options);
  }

  reply(id:number,idcomment:number,comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.postUrl+"/"+id+"/addcomment/"+idcomment+"/reply", comment, this.options);
  }
}
