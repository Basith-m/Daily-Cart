import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private api:ApiService, private toaster:ToasterService){}

  allProducts:any = []

  ngOnInit(): void {
    this.getWishlist()
  }

  // get all wishlist product
  getWishlist(){
    this.api.getWishlistAPI().subscribe((res:any)=>{
      this.allProducts = res
      this.api.getWishlistCount()
    })
  }

  // remove wishlist item
  removeItem(id:any){
    this.api.delteWishlistItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getWishlist()
      },
      error:(err:any)=>{
        console.log(err); 
      }      
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
          this.removeItem(product._id)
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
