// Create an immediately invoked functional expression to wrap our code
(function($){

    //Define the constructor
    Notifier = function(options){
        this.options = $.extend({}, Notifier.defaults, options);
    }

    // Define defaults option
    Notifier.defaults = {
        timeout : 3000,
        position : "center",
        bgColor : "",
        textColor : "#000000",
        onHoverPause : true,
        onClickClose : true
    };

    Notifier.prototype.popup = function(msg, options) {
        return (new Message(msg, options));
    }

    //Global variable
    var Container = {};

    var Message = function(msg, options){
        this.options = $.extend({}, Notifier.defaults, options);

        this.template = $('<div class="notifier-box"><div class="notifier-msg"></div></div>');
        this.template.css('background-color', this.options.bgColor);
        this.template.css('color', this.options.textColor);
        this.template.find('.notifier-msg').html(msg);

        if( this.options.onClickClose == true ){
            this.template.on('click', function(Item){
                this.hide();
            }.bind(this));
        }

        //Generate the container
        if(!Container[this.options.position]) {
            Container[this.options.position] = $('<div class="notifier-container"></div>').addClass(this.options.position).appendTo('body');
        }

        init: this.display();
    }

    // Display function
    Message.prototype.display = function(){
        this.template.prependTo(Container[this.options.position]);

        this.template.fadeIn();

        this.timer = setTimeout(function(){
            this.hide();
        }.bind(this), this.options.timeout );

        if( this.options.onHoverPause == true ) {
            var starting_time = new Date();
            var remaining_time = this.options.timeout;

            this.template.on("mouseenter", function(){
                clearTimeout(this.timer);
                remaining_time -= new Date() - starting_time;

                console.log("Remain time on pause "+remaining_time);
            }.bind(this));

            this.template.on("mouseleave", function(){
                var starting_time = new Date();
                this.timer = setTimeout( function(){
                    this.hide();
                }.bind(this), remaining_time);

                console.log("Remain time on resume "+remaining_time);
            }.bind(this));
        }

    }

    // Close Function
    Message.prototype.hide = function(){
        $(this.template).fadeOut();
        setTimeout(function(){
            $(this.template).remove();
        }.bind(this), 500 );
    }

}(jQuery));
