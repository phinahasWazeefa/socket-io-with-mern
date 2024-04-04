service: {
    pet: 'Dog',
        type: ['Lab'],
            rates: [
                {
                    paymentAttribute: 'Weight',
                    min: 5,
                    max: 30,
                    price: {
                        5: 10,
                        10: 20,
                        15: 30
                    }

                },
                {
                    paymentAttribute: 'Age',
                    min: 1,
                    max: 5,
                    price: {
                        2: 50,
                        5: 100
                    }
                },
                {
                    paymentAttribute: 'Day',
                    min: 1,
                    max: 7,
                    price: {
                        2: 50,
                        5: 100,
                        7: 200
                    }
                },
                {
                    paymentAttribute: 'Gender',
                   
                    price: {
                        male:'50',
                        female:'250'
                    }
                }
            ]
}

Pet:{
    name:'Dog',
    Type:['Lab','Golden','Jerman'],
    Desc:"sdfdfdsf",
    attribute:[
        {
            name:'Name',
            required:true,
            possibleValues:[]
        },
        {
            name:'Breed',
            required:true,
            possibleValues:['lab','gold','jerman']
        },
    ],
    PaymentAttributes:[
        {
            name:'weight',
            unit:'integer',
            type:'range'/'single val',
            displayType:'dropdown'/'inputfield',
            doesMinMax:true/false,
            values:[1,3,7,11,15]
        },
        {
            name:'gender',
            unit:'string',
            type:'range'/'single val'
            values:['male','female'],
        }
    ]
}


// Is there booking limitation like, if already booked for this time so no one other can book slop for this time like