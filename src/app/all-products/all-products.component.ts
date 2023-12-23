import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any = []
  constructor(private api:ApiService,private toast:ToastrService){
  }
  
  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((res:any)=>{
      this.allProducts = res
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toast.success(`${res.title} added to your wishlist`)
          this.api.getWishlistCount()
        },
        error:(err:any)=>{
          this.toast.warning(err.error)
        }
      })
    }else{
      this.toast.warning("Operation denied...please login!!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      this.toast.success("Proceed to add item to cart")
    }else{
      this.toast.warning("Operation denied...please login!!!")
    }
  }
}
