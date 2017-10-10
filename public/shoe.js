$(function() {

    var display = document.getElementById("display");

    var dropDownDisplay = document.querySelector("#drpdwn");
    var dis = document.querySelector("#dis");

    var brandropDowns = document.getElementById("newBrandOption").innerHTML;
    var brandDrops = Handlebars.compile(brandropDowns);
    var colordropDowns = document.getElementById("newColorOption").innerHTML;
    var colorDrops = Handlebars.compile(colordropDowns);

    var table = document.getElementById("output").innerHTML;
    var theTemplate = Handlebars.compile(table);

    $.ajax({
        type: "GET",
        url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe',

        success: function(data) {

            display.innerHTML = theTemplate({
                stock: data
            })

            dis.innerHTML = brandDrops({
                stock: data
            })

            dropDownDisplay.innerHTML = colorDrops({
                stock: data
            })
        },
        error: function(error) {
        }
    })








    $('#show').on('click', function() {
        var brand = document.getElementById('brand').value;
        var color = document.getElementById('color').value;
        var size = document.getElementById('size').value;
        var stockAvai = document.getElementById('InStock').value;
        var price = document.getElementById('Price').value;

        var display = document.getElementById("display");

        var shoes = {
            brand: brand,
            color: color,
            size: size,
            in_stock: stockAvai,
            price: price
        }

        $.ajax({
            type: "POST",
            url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe',
            dataType: "json",
            data: shoes,
            success: function(data) {

                display.innerHTML = theTemplate({
                    stock: data.shoes
                })
            },
            error: function(error) {

            }
        })
    })

    $('#dis').on('click', function(e) {

        var brandOption = e.target.value;

        $.ajax({
            type: "GET",
            url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe/brand/' + brandOption,
            success: function(data) {
                console.log(data);
                display.innerHTML = theTemplate({
                    stock: data
                })
            },
            error: function(error) {

            }
        })
    })

    $('#drpdwn').on('click', function(e) {

        var colorOption = e.target.value;

        $.ajax({
            type: "GET",
            url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe/color/' + colorOption,
            success: function(data) {
                display.innerHTML = theTemplate({
                    stock: data
                })
            },
            error: function(error) {

            }
        })
    })


    $('#display').on('click', function(e) {
        var id = e.target.value;

        $.ajax({
            type: "POST",
            url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe/sold/' + id,
            dataType: "json",

            success: function(data) {
                display.innerHTML = theTemplate({
                    stock: data
                })
            },
            error: function(error) {

            }
        })
    })


})
