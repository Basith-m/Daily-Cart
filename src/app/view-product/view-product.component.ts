import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any = {}
  constructor(private toaster:ToasterService, private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res
      // api call - get details of particular prodect
      this.getProductDetails(id)
    })
  }

  getProductDetails(id:any){
    this.api.getProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} added to your wishlist`)
          this.api.getWishlistCount()
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
        }
      })
    }else{
      this.toaster.showError("Operation denied...please login!!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err);
          this.toaster.showError(err.error)
        }
      })
    }else{
      this.toaster.showWarning("Operation denied...please login!!!")
    }
  }
}
