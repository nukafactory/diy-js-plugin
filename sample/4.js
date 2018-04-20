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
        return (new Message(msg,options));
    }

    //Define Global
    var Container = {};

    Message = function(msg,options){
        this.options = $.extend({}, Notifier.defaults, options);

        if(!Container[this.options.position]) {
            Container[this.options.position] = $('<div class="notifier-container"></div>').addClass(this.options.position).appendTo('body');
        }

        this.template = $('<div class="notifier-box"><div class="notifier-msg"></div></div>');
        this.template.css('background-color', this.options.bgColor);
        this.template.css('color', this.options.textColor);
        this.template.find('.notifier-msg').html(msg);

        init: this.display();
    }

    Message.prototype.display = function(msg,options) {
        this.template.prependTo(Container[this.options.position]);
    }

}(jQuery));
