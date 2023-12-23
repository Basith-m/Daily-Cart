import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems:any = []
  cartTotalPrice:Number = 0

  constructor(private api:ApiService){}
  ngOnInit(): void {
     if(sessionStorage.getItem("token")){
      this.getCart()
     }
     else{
      this.cartItems = []
     }
  }

  getCart(){
    this.api.getCartAPI().subscribe((res:any)=>{
      this.cartItems = res
      this.getCartTotalPrice()
    })
  }

  getCartTotalPrice(){
    if(this.cartItems.length>0){
      let total = 0
      this.cartItems.forEach((product:any) => {
        
        total+= product.grandTotal
        
      });
      this.cartTotalPrice = Math.ceil(total)
      
    }
    else{
      this.cartTotalPrice = 0
    }
  }

  incrementCart(id:any){
    this.api.cartIncrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }

  decrementCart(id:any){
    this.api.cartDecrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }
}
