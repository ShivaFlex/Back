describe('Express API', () => {
    it('GET /inscription --> array blogs', () =>{
        return request(app)
        .get('/inscription')
        .expect(200)
        .then((response =>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        
                    })
                ])
            )
        }))
    })
})