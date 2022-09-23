import { createContext } from "react";
//el Context nos permite proveer información a todos los compenentes hijos, por esto se debe colocar 
//el Context nos sirve para desplazar el state, dispatch o culaquier otra accion hacia el Reducer a lo largo de toda la aplicación


            //AuthContext está en mayuscula ya que es un compenente, createContext genera un compenente
export const AuthContext = createContext();
