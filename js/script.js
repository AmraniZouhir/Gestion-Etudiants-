import Etudiant from "./etudiants.js";

// filtter

let filtterlistetudiant = {
    'column': 'id',
    'desc': false,
}


//Affichage for list etudiaont map for data ------read data ----
const DesplayEtudiont = async function () {
    return Etudiant.allEtudiant().then(function (Response) {

        // console.log(Response)
        Response.sort((a, b) => {
            // console.log(typeof a.note)  note taype is numbre 
            //SORT NUMBERA
            const isnumb = typeof a[filtterlistetudiant.column] === 'number'
            if (isnumb) {
                if (filtterlistetudiant.desc) {
                    return b[filtterlistetudiant.column] - a[filtterlistetudiant.column]
                }
                return a[filtterlistetudiant.column] - b[filtterlistetudiant.column]

            }

            //SORT STRING

            // console.log(b[filtterlistetudiant.column])

            if (filtterlistetudiant.desc) {
                return b[filtterlistetudiant.column].localeCompare(a[filtterlistetudiant.column]) //localeCompare just for chencaracter
            }
            return a[filtterlistetudiant.column].localeCompare(b[filtterlistetudiant.column])



        })


        return Response.map((data) => {
            // console.log(Etudiant.name)
            const { id, name, prenom, date, note } = data // DESTRUCTURING
            const etudiant = new Etudiant(name, prenom, date, note)

            return `
            <tr>
                <td>${id}</td>
                <td>${etudiant.nom}</td>
                <td>${etudiant.prenom}</td>
                <td>${etudiant.gitAge()} ans</td>
                <td><span class="badge rounded-pill ${etudiant.isAdmitted() ? 'text-bg-success' : 'text-bg-danger'}">${etudiant.not} / ${Etudiant.MaxNot}</span></td>
                <td><button class='btn btn-danger btn-sm delete' data-id ='${id}' >Supprimer</button></td>
               
            </tr>
            `
        })
    })
}

//write data in html   innerHTML
const renderEtudiants = function () {
    const body = document.querySelector('.list-etudiont')
    DesplayEtudiont().then(
        function (date) {
            // console.log(date)
            body.innerHTML = date.join(" ")   // innerHTML appelle tostring (,)
            init();
        }
    )
}




//When the button is clicked, it triggers the renderEtudiants() function, and when the form is submitted, it prevents the default 
//form submission behavior and calls the addetudiant() function to handle the form data. 
const init = function () {
    const refrechbutton = document.querySelector('#refrich');
    refrechbutton.addEventListener('click', () => {
        renderEtudiants();
    });

    const form = document.querySelector('#myForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the form from submitting
        addetudiant(); // Call your function to handle form submission here

    });


    const deletbutton = document.querySelectorAll('.delete');
    deletbutton.forEach((button) => {
        button.addEventListener('click', () => {
            window.deletetudiont(button.dataset.id);

        });



    });

    const sortElementButton = document.querySelectorAll('.Sort-element');
    sortElementButton.forEach((button) => {
        button.addEventListener('click', () => {
            // console.log('click')
            filtterlistetudiant.column =button.dataset.column
            renderSort(filtterlistetudiant.column)
            // console.log( filtterlistetudiant.column)

        });



    });



}

//function for add etudiont from Formuler and call to AjouterEtudiant for setdata in API Json
const addetudiant = function () {
    const [nom, prenom, age, not] = document.querySelectorAll("#name ,#prenom,#age,#note")

    const etudiant = new Etudiant(nom.value, prenom.value, age.value, not.value)
    etudiant.AjouterEtudiant()

}


window.deletetudiont = function (id) {
    Etudiant.DeleteEtudiant(id).then(() => alert('Etudiant supprime'))
    // console.log(id)
}


window.renderSort = (column) => {
    if (filtterlistetudiant.column === column) {
        const element = document.querySelector('.Sort-element[data-column="'+column+'"] samp')
        element.innerHTML = `<button onClick ='toggleSortDirection()'  class="btn" >${filtterlistetudiant.desc ? '&darr;' : '&uarr;'}</button>`



    }
}
renderSort('id')
renderSort('name')
renderSort('prenom')
renderSort('date')
renderSort('note')
window.toggleSortDirection = () => {
    filtterlistetudiant.desc = !filtterlistetudiant.desc
    renderSort(filtterlistetudiant.column)

    renderEtudiants()
}
renderEtudiants()

