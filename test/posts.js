import { expect } from "chai";
import request from "../config/common.js";
import { createRandomUser } from "../helper/user_helper.js";
import { faker } from '@faker-js/faker';

const token = process.env.USER_TOKEN

describe('User Posts', () => {
    let userID;

    before( async () => {
       userID = await createRandomUser()
    });

    describe('Positive Tests', () => {
        it.only('/posts', async () => {
            const data = {
                user_id: userID,
                title: faker.lorem.word(),
                body: faker.lorem.sentence()
            }
                        
            const postsRes = await request
                .post('posts')
                .set('Authorization', `Bearer ${token}`)
                .send(data)

                expect(postsRes.body.body).to.eql(data.body)
                expect(postsRes.body.user_id).to.eql(userID)
        });
    });

    describe('Negative Tests', () => {
        it('401 Authentication Failed', async () => {
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