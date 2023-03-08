import supertest from "supertest";
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper.js";


const request = supertest('https://gorest.co.in/public/v2/')
const token = '83913acf66c386030b85a03d70c68b887aae619b1938b3079f91374b3147d386'

describe('User Posts', () => {
    let userID;

    before( async () => {
       userID = await createRandomUser()
    });

    describe('Positive Tests', () => {
        it('/posts', async () => {
            const data = {
                user_id: userID,
                title: "smth new with this title",
                body: "whats up"
            }
                        
            const postsRes = await request
                .post('posts')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
    
                expect(postsRes.body.body).to.eql('whats up')
                expect(postsRes.body.user_id).to.eql(userID)
        });
    });

    describe('Negative Tests', () => {
        it.only('401 Authentication Failed', async () => {
            const data = {
                user_id: userID,
                title: "smth new with this title",
                body: "whats up"
            }
                        
            const postsRes = await request
                .post('posts')
                .send(data)

                expect(postsRes.statusCode).to.equal(401)
    
        });
    });
});