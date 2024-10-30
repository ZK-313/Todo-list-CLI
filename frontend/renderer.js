document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and running");  // Check if this message appears
    const checkButtons = document.querySelectorAll(".checkbutton");

    checkButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("completed");
        });
    });
});

function buttonClicked(){
    const mybut = document.getElementById("but");
    mybut.classList.toggle("completed");
}