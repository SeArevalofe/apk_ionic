import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Book {
  title: string;
  author: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class HomePage implements OnInit {

  books: Book[] = [];  // Ahora books es de tipo Book[]

  constructor() { }

  async ngOnInit() {
    const db = getFirestore();
    const booksCollection = collection(db, 'books');

    try {
      const querySnapshot = await getDocs(booksCollection);
      this.books = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Accedemos a las propiedades con la sintaxis correcta
        return {
          title: data['title'] || 'Título no disponible',
          author: data['author'] || 'Autor no disponible',
          image: data['image'] || 'assets/img/default.jpg'  // Imagen por defecto si no hay imagen
        };
      });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }
}
