let token = `a716301b3a41a408e3f720f303c08da3ca9649479a408474`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://ranger-marvel-app.herokuapp.com/api/marvels`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data:any) => {
        const response = await fetch(`https://ranger-marvel-app.herokuapp.com/api/marvels`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:{}) => {
        const response = await fetch(`https://ranger-marvel-app.herokuapp.com/api/marvels/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Update')
        }

        return await response.json()
    },
    delete: async(id:string) => {
        const response = await fetch(`https://ranger-marvel-app.herokuapp.com/api/marvels/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error('Failed to Delete new data')
        }

        return await response.json()
    }
}