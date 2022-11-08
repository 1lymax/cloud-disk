import {rest} from "msw";
import {API_URL} from "../../config";

export const handlers = [
	rest.get(API_URL + 'api/files/stats', (req, res, ctx) => {
		return res(ctx.json({
			files: 9,
			users: 9,
			usedSpace: 9
		}), ctx.delay(150))
	}),

	rest.post(API_URL + 'api/auth/login', async (req, res, ctx) => {
		const {email, password} = await req.json()
		if (!email || !password)
			return res(
				ctx.status(401),
				ctx.json({
					message: 'email or password is empty'
				})
			)
		return res(ctx.json(
			{
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDg1MmU2ZDc3OTlkZmY4OWJkMzRjNCIsImlhdCI6MTY2NzkwOTA5NSwiZXhwIjoxNjY3OTE2Mjk1fQ.ZVzvfs1JvRXmFMstAoqOTXQdZkvHd7G-JvRP8h60ufU",
				user: {
					id: "634852e6d7799dff89bd34c4",
					email: "temp@gmail.com",
					diskSpace: 1024,
					usedSpace: 55,
					avatar: "c56d6c69-67d7-48e2-8213-b774d5af6494.jpg"
				}
			}), ctx.delay(150))
	}),

	rest.get(API_URL + 'api/auth/token', (req, res, ctx) => {

		return res(ctx.json(
			{
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDg1MmU2ZDc3OTlkZmY4OWJkMzRjNCIsImlhdCI6MTY2NzkwOTA5NSwiZXhwIjoxNjY3OTE2Mjk1fQ.ZVzvfs1JvRXmFMstAoqOTXQdZkvHd7G-JvRP8h60ufU",
				user: {
					id: "634852e6d7799dff89bd34c4",
					email: "temp@gmail.com",
					diskSpace: 1024,
					usedSpace: 55,
					avatar: "c56d6c69-67d7-48e2-8213-b774d5af6494.jpg"
				}
			}), ctx.delay(150))
	}),

	rest.get(API_URL + 'api/files', (req, res, ctx) => {
		return res(ctx.json({
			files:[
				{_id:"636a8308fbfd485955e173c3",
					name:"file.txt",
					type:"txt",
					size:54,
					path:"file.txt",
					user:"6345c4d37f5b72d7cde90dc4",
					parent:null,
					childs:[],
					date:"Tue Nov 08 2022 18:25:44 GMT+0200 (Восточная Европа, стандартное время)","__v":0},
				{_id:"636a83931703b3c87bb4e834",
					name:"123",
					type:"dir",
					size:0,
					path:"123",
					user:"6345c4d37f5b72d7cde90dc4",
					childs:[],
					date:"Tue Nov 08 2022 18:28:03 GMT+0200 (Восточная Европа, стандартное время)","__v":0}]

		}), ctx.delay(150))
	}),

	rest.post(API_URL + 'api/files', (req, res, ctx) => {
		return res(ctx.json({
			files:[
				{_id:"636a83931703b3c87bb4e834",
					name:"123",
					type:"dir",
					size:0,
					path:"123",
					user:"6345c4d37f5b72d7cde90dc4",
					childs:[],
					date:"Tue Nov 08 2022 18:28:03 GMT+0200 (Восточная Европа, стандартное время)","__v":0}]

		}), ctx.delay(150))
	})



]