// class 0 search github

// class 1 table date
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = [
            {
            login: 'jefmaeda',
            name: "Jef Maeda",
            public_repos: '100',
            followers: '100',
            }
        ]
    }
}

//class 2 view table
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.update()
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()
            console.log(row)
        })
    }

    removeAllTr(){
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr')
        .forEach( (tr) => {
            tr.remove()
        });
    }

    createRow(){
        const tr = document.createElement('tr')

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
}