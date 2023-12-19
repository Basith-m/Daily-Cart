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
  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((res:any)=>{
      this.allProducts = res
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.toaster.success("Proceed to add item to wishlist")
    }else{
      this.toaster.warning("Operation denied...please login!!!")
    }
  }
  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      this.toaster.success("Proceed to add item to cart")
    }else{
      this.toaster.warning("Operation denied...please login!!!")
    }
  }
}
