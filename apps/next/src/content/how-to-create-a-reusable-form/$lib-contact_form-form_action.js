export const submit = async ({ request }) => {
	const formData = await request.formData()
	const name = formData.get('name')

	return {
		message: `Your message has been sent successfully ${name}!`,
	}
}
