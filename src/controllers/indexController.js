const mercadopago = require("mercadopago")

mercadopago.configure({
    access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
})

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },

    callback: (req, res) => {

        console.log(req.query);

        if(req.query.status.includes("success")){
            return res.render("success")
        }
        if(req.query.status.includes("pending")){
            return res.render("pending")
        }
        if(req.query.status.includes("failure")){
            return res.render("failure")
        }
        
    },

    notifications: (req, res) => {
        console.log(req.body);

        res.status(200).end("Ok")
    },

    comprar: (req, res) => {
        let item = {
            id: "1",
            picture_url:"",
            title: "",
            price: "",
            description: "",
            unit_price: "",
            quantity: 1
        }
        /* preference = un carrito */
        let preference = {

            /*external_reference: {"colombofederico17@gmail.com"},*/

            payment_method: {

                payer:{
                    name: "Ryan",
                    surname: "Dahl",
                    email: "test_user_63274575@testuser.com",
                    phone: {
                        area_code: "11",
                        number: "55556666"
                    },
                    adress: {
                        zip_code: 1234,
                        street_name:"Monroe",
                        street_number: "860"
                    }
                },

                exluded_payment_methods: [
                    { id : "visa" }
                ],

                exluded_payment_types: [
                    { id : "atm" }
                ],

                installments: 12
            },

            items: [
                {
                    id: 1234,
                    picture_url:"https://mercadopagodh.herokuapp.com/images/products/jordan.jpg",
                    title: "nombre del producto",
                    price: 999,
                    description: "Dispositivo móvil de Tienda e-commerce",
                    unit_price: 999,
                    quantity: 1
                }
            ],

            external_reference:"colombofederico17@gmail.com",

            back_urls: {
                success: "https://mercadopagodh.herokuapp.com/callback?status=success",

                pending: "https://mercadopagodh.herokuapp.com/callback?status=pending",

                failure: "https://mercadopagodh.herokuapp.com/callback?status=failure"
            },

            notification_url: "https://mercadopagodh.herokuapp.com/notifications",
        }

        console.log(preference.items[0]);

        mercadopago.preferences.create(preference).then(response => {
            console.log(response);

            global.init_point = response.body.init_point

            res.render("confirm")
        }).catch(error =>{
            console.log(error);
            res.send("error")
        })

       
    }

}