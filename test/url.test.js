const { BASE_URL } = require("../utils/constants");

const expect = require("chai").expect;
const request = require("supertest")("https://url-e30t.onrender.com/api/")
require('../routes/url')


describe("GET /url/show", () => {
    let i = 1
    beforeEach(function () {
        console.log("#TEST CASE :", i++);
    });

    context('give url all from database', function () {
        it("should request to all url", async () => {
            const response = await request
                .get("/url/show")
            expect(typeof response.body).to.eql('object')
            expect(response.status).to.eql(200)
        })
    })

})



describe("POST /short", () => {
    let i = 1
    beforeEach(function () {
        console.log("#TEST CASE :", i++);
    })

    context('wrong url enter', function () {
        it("should request send to wrong url", async () => {
            const response = await request
                .post("url/short")
                .send({ originalUrl: "https://github.com/zehan12" });
            expect(response.status).to.eql(404)
        })
    })

    context('Enter a valid argument', function () {
        it("should create a short url", async () => {
            const response = await request
                .post("/url/short")
                .send({ originalUrl: "https://github.com/zehan12" });

            expect(response.status).to.eql(200);
            const attribute = response.body;
            expect(attribute).to.include.keys("originalUrl", "urlCode", "shortUrl", "click");
            expect(attribute.originalUrl).to.eql("https://github.com/zehan12");
            expect(attribute.shortUrl).to.eql(`${BASE_URL}${attribute.urlCode}`)
        });
    })

    context('With non-string argument', function () {
        it("should throw error", async () => {
            const response = await request
                .post("/url/short")
                .send({ originalUrl: {} })
            expect(response.status).to.eql(401)
            const attribute = response.body;
            expect(attribute.msg).to.eql('input URL must be of string')


        })
    })

    context('With empty string argument', function () {
        it("should throw  error", async () => {
            const response = await request
                .post("/url/short")
                .send({ originalUrl: "" })
            expect(response.status).to.eql(401)
            const attribute = response.body;
            expect(attribute.msg).to.eql('Enter the url it cannot be empty')
        })
    })

    context('With un-valid url', function () {
        it("should throw error if url is not valid", async () => {
            const response = await request
                .post("/url/short")
                .send({ originalUrl: "zehan12.com" })
            expect(response.status).to.eql(401)
            const attribute = response.body;
            expect(attribute.msg).to.eql('Enter a Valid URL')
        })
    })
});



// router.delete('/short/:code', urlController.deleteUrl );
describe("DELETE /url/short/:code", () => {
    let i = 1
    beforeEach(function () {
        console.log("#TEST CASE :", i++);

    });

    context('Delete url by code', function () {
        it("should request to delete", async () => {  
            const code = await (await request.post("/url/short").send({ originalUrl: "https://github.com/zehan12" })).body.urlCode
            const response = await request
                .delete(`/url/short/${code}`)
            expect(response.status).to.eql(200)
        })
    })

})