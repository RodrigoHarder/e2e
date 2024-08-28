import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin() {
    const validUsername = 'alura';
    const validPassword = 'alura123';

    if (this.username === validUsername && this.password === validPassword) {
      this.router.navigate(['/principal']);
    } else {
      alert('Login ou senha incorretos!');
    }
  }
}
