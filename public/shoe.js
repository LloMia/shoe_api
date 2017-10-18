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
            var uniqueBrand = [];
            var brandMap = {};
            for (var i = 0; i < data.length; i++) {
                var assets = data[i]
                if (brandMap[assets.brand] === undefined) {
                    brandMap[assets.brand] = assets.brand;
                    uniqueBrand.push(assets.brand)
                }
            }

            var uniqueColor = [];
            var colorMap = {};
            for (var a = 0; a < data.length; a++) {
                var colorate = data[a]
                if (colorMap[colorate.color] === undefined) {
                    colorMap[colorate.color] = colorate.color;
                    uniqueColor.push(colorate.color)

                }
            }
            display.innerHTML = theTemplate({
                stock: data
            })

            dis.innerHTML = brandDrops({
                stock: uniqueBrand.sort()
            })

            dropDownDisplay.innerHTML = colorDrops({
                stock: uniqueColor.sort()
            })
        },
        error: function(error) {}
    })


    $('#showAll').on("click", function() {
        $.ajax({
            type: "GET",
            url: 'https://pacific-lowlands-57609.herokuapp.com/api/shoe',

            success: function(data) {

                var uniqueBrand = [];
                var brandMap = {};
                for (var i = 0; i < data.length; i++) {
                    var assets = data[i]
                    if (brandMap[assets.brand] === undefined) {
                        brandMap[assets.brand] = assets.brand;
                        uniqueBrand.push(assets.brand)
                    }
                }

                var uniqueColor = [];
                var colorMap = {};
                for (var a = 0; a < data.length; a++) {
                    var colorate = data[a]
                    if (colorMap[colorate.color] === undefined) {
                        colorMap[colorate.color] = colorate.color;
                        uniqueColor.push(colorate.color)

                    }
                }

                display.innerHTML = theTemplate({
                    stock: data
                })

                dis.innerHTML = brandDrops({
                    stock: uniqueBrand
                })

                dropDownDisplay.innerHTML = colorDrops({
                    stock: uniqueColor
                })
            },
            error: function(error) {}
        })

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
                window.location.reload()
                // display.innerHTML = theTemplate({
                //     stock: data.shoes
                // })
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

                window.location.reload()

            },
            error: function(error) {

            }
        })
    })




})
