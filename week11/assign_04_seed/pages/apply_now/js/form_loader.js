$(document).ready(function () {
    console.log('form loader called');
    // $("#home-nav").load('../../components/child-l1.html');
    load_frag('components/apply_for_international.html');
});

function onclick_loadform(event) {
    event.preventDefault();
    const form_id = $(event.target).attr("id");
    console.log(form_id);
    const fname ='components/'+  form_id + '.html';
    //debugger;
    load_frag(fname)
}

function load_frag(filename){
    $("#form-container").load(filename, function (response, status) {
        if (status === 'error') {
            console.log("Failed to load menu.html");
        }
        else {
            console.log("Success!");
        }
    });
}

function luckyone(event){
    event.preventDefault();
    alert("You are lucky to reach this far....");
}