export interface Asegurado {
    numeroIdentificacion: number;     // Equivalente a int
    primerNombre: string;            
    segundoNombre?: string;           
    primerApellido: string;           
    segundoApellido: string;          
    telefono: string;                 // validar formato en Angular
    email: string;                    //validar formato en Angular
    fechaNacimiento: string;          // Usar string o Date para representar DateOnly
    valorEstimadoSeguro: number;      
    observaciones?: string;           
  }
  