import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchFor: string = ""

  searchProducts() {
    console.log(this.searchFor)
  }
}
