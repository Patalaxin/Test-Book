import supertest from "supertest";

const request = supertest('https://gorest.co.in/public/v2/')
const token = '83913acf66c386030b85a03d70c68b887aae619b1938b3079f91374b3147d386'

export const createRandomUser = async () =>{
    const data = {
        email: `test-${Math.floor(Math.random() * 1000)}@test.team`,
        name: 'Stas Test',
        gender: 'male',
        status: 'active'
    };

   const res = await request
        .post('users')
        .set('Authorization', `Bearer ${token}`)
        .send(data)

        return res.body.id;
}