export interface Asegurado {
    NumeroIdentificacion: number;     // Equivalente a int
    PrimerNombre: string;            
    SegundoNombre?: string;           
    PrimerApellido: string;           
    SegundoApellido: string;          
    Telefono: string;                 // validar formato en Angular
    Email: string;                    //validar formato en Angular
    FechaNacimiento: string;          // Usar string o Date para representar DateOnly
    ValorEstimadoSeguro: number;      
    Observaciones?: string;           
  }
  