import supertest from "supertest";
import { expect } from "chai";

const request = supertest('https://gorest.co.in/public/v2/')

const token = '83913acf66c386030b85a03d70c68b887aae619b1938b3079f91374b3147d386'

describe('Users', () => {
    let userID;
    describe('POST', () => {
        it('/users', () => {
            const data = {
                email: `test-${Math.floor(Math.random() * 1000)}@test.team`,
                name: 'Stas Test',
                gender: 'male',
                status: 'active'
            };
    
            return request
                .post('users')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .then((res) => {
                   expect(res.body.email).to.eql(data.email);
                   userID = res.body.id;
                   console.log(userID);
                   console.log(res.body.email);
                });
        }); 
    });

    describe('GET', () => {
        it('/users', () => {
            return request.get(`users?access-token=${token}`).then((res) => {
                expect(res.body).to.not.be.empty
            });
        });
    
        it('/users/:id', () => {
            return request.get(`users/${userID}?access-token=${token}`).then((res) => {
                expect(res.body.id).to.be.eql(userID)
            });
        });

        it('/users with query params', () => {
            const url = `users?access-token=${token}&page=5&gender=female&status=active`
    
            return request.get(url).then((res) => {
                expect(res.body).to.not.be.empty;
                res.body.forEach(data => {
                    expect(data.gender).to.be.eql('female')
                    expect(data.status).to.be.eql('active')
                });
            });
        });
    });

    describe('PUT', () => {
        it('/users', () => {
            const data = {
                name: 'updatedFromAuto'
            }
            return request
            .put(`users/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .then((res) => {
                expect(res.body.name).to.eql(data.name)
                expect(res.body.id).to.eql(userID)
            })
        });
         
    });
    
    describe('DELETE', () => {
        it('/users', () => {
            return request
            .delete(`users/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.body).to.be.eql({})
            })
        }); 
    });
});