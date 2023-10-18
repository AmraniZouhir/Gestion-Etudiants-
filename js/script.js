import Etudiant from "./etudiants.js";


//Affichage for list etudiaont map for data ------read data ----
const DesplayEtudiont  =async function(){
    return Etudiant.allEtudiant().then(function(Response){
        return  Response.map((data)=>{
            // console.log(Etudiant.name)
            const  {id,name ,prenom ,date ,note} =data // DESTRUCTURING
            const etudiant = new Etudiant(name,prenom,date,note)

            return`
            <tr>
                <td>${id}</td>
                <td>${etudiant.nom}</td>
                <td>${etudiant.prenom}</td>
                <td>${etudiant.gitAge()} ans</td>
                <td><span class="badge rounded-pill ${etudiant.isAdmitted()? 'text-bg-success':'text-bg-danger'}">${etudiant.not} / ${Etudiant.MaxNot}</span></td>
                <td><button class='btn btn-danger btn-sm'>Supprimer</button></td>
               
            </tr>
            `
        })
    })
}

//write data in html   innerHTML
const renderEtudiants =function(){
    const body = document.querySelector('.list-etudiont')
    DesplayEtudiont().then(
        function(date){
            console.log(date)
            body.innerHTML=date.join(" ")   // innerHTML appelle tostring (,)
        }
         )
}


 renderEtudiants()


//When the button is clicked, it triggers the renderEtudiants() function, and when the form is submitted, it prevents the default 
//form submission behavior and calls the addetudiant() function to handle the form data. 
const init = function () {
    const refrechbutton = document.querySelector('#refrich');
    refrechbutton.addEventListener('click', () => {
        renderEtudiants();
    });

    const form = document.querySelector('#myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting
        addetudiant(); // Call your function to handle form submission here
    });
}

//function for add etudiont from Formuler and call to AjouterEtudiant for setdata in API Json
const addetudiant = function() {
    const [nom ,prenom,age,not] =document.querySelectorAll("#name ,#prenom,#age,#note")

    const etudiant =new Etudiant(nom.value , prenom.value ,age.value ,not.value)
    etudiant.AjouterEtudiant()

}

document.addEventListener('DOMContentLoaded', () => {
    init();
});

