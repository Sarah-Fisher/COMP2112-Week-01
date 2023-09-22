// IIFE - Immediately Invoked Function Expression
// this can run automatically - "it is self-executing"

//const { data } = require("jquery");

// any vars live only inside the IIFE so not wasting global memory
(function()
{
    let LoadHeader = () => {
        /* Use jQuery to fetch the contents of header.html
           use the callback structure to render these contents once JS is done reading the file*/
           $.get("./views/shared/header.html", (htmlData) => {
                //console.log(htmlData);
                //add header to index through jQuery
                $("header").html(htmlData);
           

           // Once navbar is loaded, attach event handlers to each link
           $("li>a.nav-link").each(() => {
                $("li>a").on("click", (event) => {
                    //don't fire as a normal html link
                    event.preventDefault();

                    // set the document title to the id attribute of the selected link/a element               
                    console.log($(event.currentTarget).prop("id"));
                    document.title = $(event.currentTarget).prop("id");

                    //THIS IS NOT IN THE RIGHT PLACE - CAUSES LOAD TO HAPPEN MULTIPLE TIMES
                    LoadContent();
                })
           })
        });
    }

    let LoadFooter = () => {
        $.get("./views/shared/footer.html", (htmlData) => {
            $("footer").html(htmlData);
        })
    }

    let LoadContent = () => {
        let activePage = document.title;
        $.get(`./views/${activePage}.html`, (htmlData) => {
            $("main").html(htmlData);

        // manually add the current page to the top of the browser history stack
        history.pushState({}, "", `/${document.title}`);
        });
    }

    let GetContacts = (callback) => {
    // use jQuery's GET method to read the json file
    // The data param represents the response of the file read operation - it's telling to WAIT until the read of the file is done BEFORE printing out the file contents
        $.getJSON('./data/contacts.json', (contactData) => { 
        //once file read is all finished, log the contents
        //console.log(contactData);
        //console.log(contactData[0]); //Get the first contact only
        //console.log(contactData[2].Name);
        
        // we can't use return as it happens too fast and provides an undefined result for asynch
        //return contactData;
        //use this instead to make things WAIT
            callback(contactData);
        })
    }

    let Start = () => {
        let x = 1;
        console.log('First App Started');
        console.log(x);
       

        //Call Header
        LoadHeader();
        //Call Footer
        LoadFooter();

        //We need to rewrite this version to use a callback
       // let data = GetContacts();

       GetContacts((data) => {
        let list = document.getElementById('contactList');
            //console.log(data);
            //Create and attach a list item for each row in the data
            data.forEach(contact => {
                let listItem = document.createElement('li');
                var emailLinks = `<a href="mailto:${contact.Email}">${contact.Name}</a>`;
                listItem.innerHTML = emailLinks;
                list.appendChild(listItem);
                

                //***CHALLENGE*** add email beside each name, linked with a mailto
            })
       })
    }

    // attach to window onLoad event listener
    window.addEventListener('load', Start);
}
)();

// Update counter without using Closure structure
let updateCounterWithoutClosure = () => {
    let counter = 0;
    counter++;
    document.getElementById('clickCount').innerHTML = counter;
}

// update counter with closure structure to keep the current count before incrementing

let update = (() => {
    let counter = 0;

    return () => {
        counter++;
        document.getElementById("clickCount").innerHTML = counter;
    }
})();