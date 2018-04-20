// Create an immediately invoked functional expression to wrap our code
(function($){

    //Define the constructor
    this.Notifier = function(options){
        this.options = $.extend({}, Notifier.defaults, options);
    }

    // Define defaults option
    Notifier.defaults = {
        timeout : 3000,
        position : "center",
        bgColor : "",
        textColor : "black"
    };

    Notifier.prototype.popup = function(msg, options) {

    }

}(jQuery));
