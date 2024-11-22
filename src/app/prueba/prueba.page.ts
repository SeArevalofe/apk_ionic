import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule]
})
export class PruebaPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor() {}

  ngOnInit() {}

  async registerUser() {
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      console.log('Usuario registrado:', userCredential.user);
      alert('Usuario registrado con éxito');
    } catch (err) {
      const error = err as Error; // Cast explícito a Error
      console.error('Error al registrar usuario:', error);
      alert(`Error: ${error.message}`);
    }
  }
}
