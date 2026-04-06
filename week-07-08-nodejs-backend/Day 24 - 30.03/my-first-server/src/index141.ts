interface User {
    id: number,
    name: string,
}

const fakeDbQuery = new Promise<User>((resolve, reject) => {
    resolve({id: 1, name: "Nguyễn An"})
})

fakeDbQuery.then(user => {
    console.log("láy dữ liệu thành c")
})