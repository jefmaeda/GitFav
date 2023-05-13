// class 0 search github
import { GithubUser } from "./githubUser.js"

// class 1 table date
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem
            ('@github-favorites:')) || []

    }

    delete(user){
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }

    save(){
        localStorage.setItem('@github-favorites:',JSON.stringify(this.entries))
    }

    async add(username){
        try{

            const userExists = this.entries.find(entry => entry.login === username)

            if (userExists) {
                throw new Error('User already registered')
            }

            const user = await GithubUser.search(username)
            
            if (user.login === undefined) {
                throw new Error('User is not found')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        }catch(error){
            alert(error.message)
        }
    }
}

//class 2 view table
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const {value} = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = 
            `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt =
            `Image of ${user.name}`
            row.querySelector('a').href = 
            `https://github.com/${user.login}`
            row.querySelector('p').textContent = user.name
            row.querySelector('span').textContent = user.login
            row.querySelector('.repository').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers


            row.querySelector('.remove').onclick = () =>{
                const isOk = confirm('are you sure you want to delete this line')
                if (isOk) {
                    this.delete(user)
                }
            }


            //push create html
            this.tbody.append(row)
        })

        this.notUser()
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr')
        .forEach( (tr) => {
            tr.remove()
        });
    }

    createRow(){
        const tr = document.createElement('tr')
        tr.classList.add("user-row")

        tr.innerHTML =`
        <td class="user">
            <img src="https://github.com/jefmaeda.png" alt="">
            <a href="https://github.com/jefmaeda" target="_blank">
                <p>Jef Maeda</p>
                /<span>jefmaeda</span>
            </a>
        </td>
        <td class="repository">72</td>
        <td class="followers">72</td>
        <td>
            <button class="remove">Remove</button>
        </td>
        `

        return tr
    }

    notUser(){
        const table = document.querySelector("table")
        const emptyUser = document.querySelector(".not-user")
        const rows = table.querySelectorAll(".user-row")

        if (rows.length === 0) {
            emptyUser.classList.remove("hidden")
        } else {
            emptyUser.classList.add("hidden")
        }
    }
}