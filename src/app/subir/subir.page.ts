import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, IonicModule ]
})
export class SubirPage implements OnInit {

  book = {
    title: '',
    author: '',
    synopsis: '',
  };
  selectedFile: File | null = null;

  constructor() { }

  ngOnInit() { }

  // Lógica para seleccionar un archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Lógica para subir el libro y la imagen
  async submitBook() {
    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen para la portada.');
      return;
    }

    const storage = getStorage();
    const db = getFirestore();
    const fileRef = ref(storage, `books/${this.selectedFile.name}`);

    try {
      // Subir imagen a Firebase Storage
      const snapshot = await uploadBytes(fileRef, this.selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Guardar datos en Firestore
      await addDoc(collection(db, 'books'), {
        title: this.book.title,
        author: this.book.author,
        synopsis: this.book.synopsis,
        image: downloadURL, // URL de la imagen
      });

      alert('Libro subido con éxito');
    } catch (error) {
      console.error('Error al subir el libro:', error);
      alert('Error al subir el libro. Inténtalo de nuevo.');
    }
  }
}
