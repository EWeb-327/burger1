$(function(){
    $(".change-devour").on("click", function(event){
        var id = $(this).data("id")
        var newDev = $(this).data("newdev")

        var newDevouredState = {
            devoured: newDev
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function(){
            console.log(`changed devoured to ${newDev}`);
            location.reload()
        });
    });

    $(".delete").on("click", function(event){
        event.preventDefault();
        var id = $(this).data("id")

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function(){
            console.log(`deleted burger with id ${id}`)
            location.reload()
        });
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();
        
        var newBurger = {
            burger_name: $("#bu").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        }
        console.log(newBurger)

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("created new burger");
            window.location.replace("http://localhost:3000/burgers")
        });

        
    });
});
