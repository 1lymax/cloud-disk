import {getErrorMessage} from "./getErrorMessage";

describe('getErrorMessage', () => {
	test('data.message', () => {
		expect(getErrorMessage({
			data: {
				message: 'some Error'
			}

		})).toBe('some Error')
	})

	test('message', () => {
		expect(getErrorMessage({message: 'second Error'})).toBe('second Error')
	})

	test('object error with status code', () => {
		expect(getErrorMessage({
				status: 404,
				error: 'error with status code'
		})).toBe('error with status code')
	})

	test('object error with status code and object in message', () => {
		expect(getErrorMessage({
			status: 404,
			error: {
				user: 'not found'
			}
		})).toEqual({user: "not found"})
	})
})