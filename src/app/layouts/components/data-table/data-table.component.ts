import { Component, OnInit } from '@angular/core';
import { DataTableService } from '../../../services/data-table.service';
import { Post } from '../../../interfaces/post.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  skeleton: boolean = true;
  posts: Post[] = Array(10).fill({ name: "", another: "", another1: "", another2: "" }); // ! 1
  postHeaders: any[] = Array(4).fill({});
  error: null | string = null;
  isItOkayToShowError: boolean = true;

  constructor(private dataTableServs: DataTableService) { }
  ngOnInit() {
    // this.hideSkeleton();
    const postData = { title: "title", content: "this is the content of the post " }
    this.dataTableServs.postDate(postData).subscribe(res => console.log(res.body))
    this.dataTableServs.getData().subscribe(res => {
      this.posts = res;
      console.log(this.posts)
      // get the post headers
      res.forEach(post => this.postHeaders = Object.keys(post))
      console.log(this.postHeaders)
      this.skeleton = false;
    },
      error => {
        this.error = error.message
        console.log(error.message)
      }

    )

    // if there is an error in the error subject then display it ( if not handled the other way )
    // this.dataTableServs.error.subscribe(errorMsg => this.error = errorMsg)
  }

  hideSkeleton() {
    setTimeout(() => {
      this.skeleton = false
    }, 1500)
  }

  // Delete posts
  deletePosts() {
    this.dataTableServs.deleteData(2).subscribe(res => {

      console.log(res)
      // if only the request succeeded
      this.posts = []
    })


  }

}

/* 
!1 
- In the html file I am looping over the returned array from the backend and them create a number of rows = the number of objects in the array , inside each row
another loop is created over the object's properties to implement the cells, the problem is that before these data come from the backend there will be zero rows and cells
and this is why the skeleton will not show, to avoid that I have created a default array of ten objects each object with 4 properties to present the cells 
- Subscribing on the observable can be happened in the service or in the component, if the component does'nt care about the response then we can just subscribe in the service 
otherwise if it handles the res then we subscribe here.
- Subscribe method takes more than on argument, the first is the subscriber function, the second is error handling function,
- Empty string is a falsy value

*/
