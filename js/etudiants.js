// json-server --watch db.json

import {Endpoint} from "./constants.js"
export default class Etudiant{
    static MaxNot =20
 
//Constructer    
    constructor(nom , prenom , age ,not ){
        this.nom =nom ;
        this.prenom =prenom ;
        this.age =age ;
        this.not =not ;
    }

//Age for Etudiant    
    gitAge = ()=> ( (new Date()).getFullYear()  - new Date (this.age).getFullYear())

//Affichage FOR not
    isAdmitted =()=>  this.not >= 10;


//Affichage for All Data from API Json
   static allEtudiant =async function (){
        const Response =await fetch(Endpoint)
        const etudiants =await Response.json()
        return etudiants
        // let etudiants =fetch(Endpoint)
        //              .then(Response =>Response.json())
        //              .then(etudiants=>console.log(etudiants))
    }

        
//Function For Ajouter Etudiaont
//"http://localhost:3000/etudiants" (Post)Ajouter
        AjouterEtudiant =async function (){
        const Response =await fetch(Endpoint,{
            method :"POST" ,
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify //Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
            (
                {
                    name : this.nom,
                    prenom : this.prenom,
                    date : this.age,
                    note :parseFloat(this.not) ,
                }
            )
        })
        console.log(Response)
        return Response
        
    }
    
//"http://localhost:3000/etudiants /{id}" (DELET)Suppreme

    static DeleteEtudiant =async function (id){
        const Response =await fetch(Endpoint+'/'+ id ,{
            method :"DELETE" ,
            0 : {"Content-Type":"application/json"},
           
        })
        console.log(Response)
        return Response
        
    }

} 