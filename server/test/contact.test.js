const contactService = require("../services/ContactService");

describe("Contact Tests", () =>{
    test("Invalid Email Address", ()=>{
        var result = contactService.ContactAdmin('angelcueva47gmail', 'angel','cueva')

        expect(result).toBe(
           "{\"msg\":\"Invalid Email Address\"}"
        )
    });
    test("Invalid Name", () =>{
        var str = new Array(257).join('a');
        var result = contactService.ContactAdmin('angelcueva47@gmail.com', str)

        expect(result).toBe("{\"msg\":\"Name is too long\"}")
    })
    test("Invalid Message", () =>{
        var str = new Array(10001).join('a');
        var result = contactService.ContactAdmin('angelcueva47@gmail.com', 'angel cueva', str)

        expect(result).toBe("{\"msg\":\"Message is too long\"}")
    });
    test("Invalid Token", () =>{
        var result = contactService.ContactAdmin('angelcueva47@gmail.com', 'angel cueva', 'a great test',111)

        expect(result).toBe("{\"msg\":\"Message sent successfully\"}")
    })
    test("Message Sent Successfully", () =>{
        var result = contactService.ContactAdmin('angelcueva47@gmail.com', 'angel cueva', 'a great test')

        expect(result).toBe("{\"msg\":\"Message sent successfully\"}")
    })
    
})